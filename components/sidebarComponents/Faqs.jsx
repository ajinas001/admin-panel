import { useState, useEffect } from "react";
import { getFaqs, createFaq, updateFaq, deleteFaq } from "@/app/util/faq-api";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch FAQs
  useEffect(() => {
    const fetchFaqs = async () => {
      setIsLoading(true);
      try {
        const data = await getFaqs();
        setFaqs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setFormData({ question: "", answer: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateFaq(editId, formData);
      } else {
        await createFaq(formData);
      }
  
     
      const updatedFaqs = await getFaqs();
      setFaqs(updatedFaqs);
  
      handleModalClose();
    } catch (err) {
      alert("Error saving FAQ: " + err.message);
    }
  };
  

  const handleEdit = (faq) => {
    setIsEditMode(true);
    setEditId(faq._id);
    setFormData({ question: faq.question, answer: faq.answer });
    setIsModalOpen(true);
  };

  const handleDeleteFaq = async (faqId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this FAQ?");
    if (confirmDelete) {
      try {
        await deleteFaq(faqId);
        setFaqs((prev) => prev.filter((faq) => faq._id !== faqId));
      } catch (err) {
        alert("Failed to delete FAQ: " + err.message);
      }
    }
  };

  const paginate = (faqs) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return faqs.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(faqs.length / itemsPerPage);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-coral-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl text-black font-bold">FAQ's</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
          >
            <span>+</span> Add new FAQ
          </button>
          <button className="bg-white text-red-500 p-2 rounded-md hover:bg-gray-100">
            <RiDeleteBin5Line className="h-5 w-5" />
          </button>
        </div>
      </div>

      {error && <p className="text-red-600 p-4">{error}</p>}

      {isLoading ? (
        <div className="text-center py-4">Loading FAQs...</div>
      ) : (
        <div className="bg-white p-4 rounded-md overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-700">
                <th className="px-4 py-2 text-left w-12"><input type="checkbox" /></th>
                <th className="px-4 py-2 text-left">Question</th>
                <th className="px-4 py-2 text-left">Answer</th>
                <th className="px-4 py-2 text-right">Operations</th>
              </tr>
            </thead>
            <tbody>
              {paginate(faqs).map((faq) => (
                <tr key={faq._id} className="bg-gray-50 hover:bg-gray-100">
                  <td className="px-4 py-3"><input type="checkbox" /></td>
                  <td className="px-4 py-3 text-gray-700">{faq.question}</td>
                  <td className="px-4 py-3 text-gray-600">{faq.answer}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(faq)} className="bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200">Edit</button>
                      <button onClick={() => handleDeleteFaq(faq._id)} className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="bg-gray-100 px-6 py-3 flex justify-between items-center mt-auto">
        <div className="text-sm text-gray-600">Showing {itemsPerPage} per page</div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="bg-white p-2 rounded-md border hover:bg-gray-50 disabled:opacity-50">&lt;</button>
          <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="bg-white p-2 rounded-md border hover:bg-gray-50 disabled:opacity-50">&gt;</button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative">
            <button onClick={handleModalClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {isEditMode ? "Edit FAQ" : "Add New FAQ"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Question*</label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Answer*</label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-md mt-4">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
