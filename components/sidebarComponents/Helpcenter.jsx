'use client'
import { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { deleteHelpCenterItem, getAllHelpCenterKnowledgeBase, createHelpCenterItem, updateHelpCenterItem } from '@/app/util/helpcenter-api';

export default function HelpCenterTable() {
  const [helpItems, setHelpItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', image: null });

  const itemsPerPage = 12;

  useEffect(() => {
    fetchHelpCenterData();
  }, []);

  const fetchHelpCenterData = async () => {
    try {
      setLoading(true);
      const data = await getAllHelpCenterKnowledgeBase();
      console.log(data);
      
      setHelpItems(data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching help center data:", err);
      setError("Failed to load help center data");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHelpCenterItem(id);
      fetchHelpCenterData();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      for (const id of selectedItems) {
        await deleteHelpCenterItem(id);
      }
      setSelectedItems([]);
      fetchHelpCenterData();
    } catch (error) {
      console.error("Failed to bulk delete items:", error);
    }
  };

  const handleAddNew = () => {
    setEditingItemId(null);
    setFormData({ name: '', description: '', image: null });
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItemId(item._id);
    setFormData({ name: item.name, description: item.description, image: null });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      if (formData.image) form.append('image', formData.image);

      if (editingItemId) {
        await updateHelpCenterItem(editingItemId, form);
      } else {
        await createHelpCenterItem(form);
      }
      fetchHelpCenterData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const currentPageItems = getCurrentPageItems();
      setSelectedItems(currentPageItems.map(item => item._id));
    } else {
      setSelectedItems([]);
    }
  };

  const getCurrentPageItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return helpItems.slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil(helpItems.length / itemsPerPage);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (error) return (
    <div className="text-center text-red-500 py-8">
      {error}
      <button onClick={fetchHelpCenterData} className="block mx-auto mt-4 bg-blue-500 text-white px-4 py-2 rounded">Retry</button>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-coral-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Help Center Category</h1>
        <div className="flex gap-2">
          <button onClick={handleAddNew} className="bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center gap-1">
            <Plus size={18} /> Add new
          </button>
          {selectedItems.length > 0 && (
            <button onClick={handleBulkDelete} className="bg-white text-red-500 p-2 rounded-md hover:bg-gray-100">
              <RiDeleteBin5Line className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-md overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
            <tr className="text-gray-700">
              <th className="px-4 py-2 text-left w-12">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-right">Operations</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageItems().map(item => (
              <tr key={item._id} className="bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selectedItems.includes(item._id)} onChange={() => handleSelectItem(item._id)} />
                </td>
                <td className="px-4 py-3">
                  <img src={item.image || '/placeholder-couple.jpg'} alt="thumb" className="w-12 h-12 rounded object-cover" />
                </td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3 text-gray-600">{item.description}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(item)} className="bg-green-100 text-green-600 px-3 py-1 rounded hover:bg-green-200">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-gray-100 px-6 py-3 mt-auto">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, helpItems.length)} of {helpItems.length}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="bg-white p-2 rounded-md border hover:bg-gray-50">
            <ChevronLeft />
          </button>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="bg-white p-2 rounded-md border hover:bg-gray-50">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{editingItemId ? 'Edit Article' : 'New Article'}</h2>

            {/* Upload */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 004-4m-4-7l-4-4m0 0L7 8m5-5v12" />
                </svg>
              </div>
              <input type="file" name="image" onChange={handleChange} className="mt-2" />
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Title*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  rows={3}
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700">
                {editingItemId ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
