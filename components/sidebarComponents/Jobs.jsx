import { useState, useEffect } from "react";
import { getJobs, createJob, updateJob, deleteJob } from "@/app/util/jobs-api";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    type: "",
    status: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const data = await getJobs();
        console.log("jobs==",data);
        
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setFormData({ title: "", description: "", salary: "", location: "", type: "", status: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateJob(editId, formData);
      } else {
        await createJob(formData);
      }
      const updatedJobs = await getJobs();
      setJobs(updatedJobs);
      handleModalClose();
    } catch (err) {
      alert("Error saving job: " + err.message);
    }
  };

  const handleEdit = (job) => {
    setIsEditMode(true);
    setEditId(job._id);
    setFormData(job);
    setIsModalOpen(true);
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      try {
        await deleteJob(jobId);
        setJobs((prev) => prev.filter((job) => job._id !== jobId));
      } catch (err) {
        alert("Failed to delete job: " + err.message);
      }
    }
  };

  const paginate = (jobs) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return jobs.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl text-black font-bold">Jobs</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-600 text-white px-4 py-2 rounded-md"
          >
            + Add new Job
          </button>
          <button className="bg-white text-red-500 p-2 rounded-md hover:bg-gray-100">
            <RiDeleteBin5Line className="h-5 w-5" />
          </button>
        </div>
      </div>

      {error && <p className="text-red-600 p-4">{error}</p>}

      {isLoading ? (
        <div className="text-center py-4">Loading Jobs...</div>
      ) : (
        <div className="bg-white p-4 rounded-md overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-700">
                <th className="px-4 py-2 text-left w-12"><input type="checkbox" /></th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Salary</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Type of job</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-right">Operations</th>
              </tr>
            </thead>
            <tbody>
              {paginate(jobs).map((job) => (
                <tr key={job._id} className="bg-gray-50 hover:bg-gray-100">
                  <td className="px-4 py-3"><input type="checkbox" /></td>
                  <td className="px-4 py-3 text-gray-700">{job.title}</td>
                  <td className="px-4 py-3 text-gray-600">{job.description}</td>
                  <td className="px-4 py-3 text-gray-600">{job.salary}</td>
                  <td className="px-4 py-3 text-gray-600">{job.location}</td>
                  <td className="px-4 py-3 text-gray-600">{job.type}</td>
                  <td className="px-4 py-3 text-gray-600">{job.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(job)} className="bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200">Edit</button>
                      <button onClick={() => handleDeleteJob(job._id)} className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-gray-100 px-6 py-3 flex justify-between items-center mt-auto">
        <div className="text-sm text-gray-600">Showing {itemsPerPage} per page</div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="bg-white p-2 rounded-md border hover:bg-gray-50 disabled:opacity-50">&lt;</button>
          <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="bg-white p-2 rounded-md border hover:bg-gray-50 disabled:opacity-50">&gt;</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative">
            <button onClick={handleModalClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {isEditMode ? "Edit Job" : "Add New Job"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <input name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Title*" required />
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Description*" rows="3" required />
              <input name="salary" value={formData.salary} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Salary*" required />
              <input name="location" value={formData.location} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Location*" required />
              <input name="type" value={formData.type} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Type of Job*" required />
              <input name="status" value={formData.status} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Status*" required />
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
