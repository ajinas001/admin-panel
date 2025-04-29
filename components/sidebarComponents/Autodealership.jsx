import { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getAutoDealerships, createAutoDealership, updateAutoDealership, deleteAutoDealership } from "@/app/util/autodealership-api";


function Modal({ children }) {
  return (
    <div className="fixed inset-0  bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">{children}</div>
    </div>
  );
}

export default function AutoDealership() {
  const [dealerships, setDealerships] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [dealershipForm, setDealershipForm] = useState({ title: "", description: "", image: null });
  const [currentDealership, setCurrentDealership] = useState(null);

  // Fetch Dealerships
  useEffect(() => {
    const fetchDealerships = async () => {
      setIsLoading(true);
      try {
        const data = await getAutoDealerships();
        setDealerships(data);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealerships();
  }, []);

  // Handle Create Dealership
  const handleCreateDealership = async (formData) => {
    try {
      await createAutoDealership(formData);
      setShowCreateModal(false);
      const data = await getAutoDealerships();
      setDealerships(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle Edit Dealership
  const handleEditDealership = async (formData, id) => {
    try {
      await updateAutoDealership(id, formData);
      setShowEditModal(false);
      const data = await getAutoDealerships();
      setDealerships(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle Delete Dealership
  const handleDeleteDealership = async (id) => {
    try {
      await deleteAutoDealership(id);
      setShowDeleteModal(false);
      const data = await getAutoDealerships();
      setDealerships(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Pagination Logic
  const paginate = (dealerships) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return dealerships.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(dealerships.length / itemsPerPage);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-coral-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Auto Dealership</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
        >
          <span>+</span> Add Auto Dealership
        </button>
      </div>

      {/* Error message */}
      {fetchError && (
        <div className="text-center py-4 text-red-600">
          {fetchError}
          <button
            onClick={() => window.location.reload()}
            className="text-blue-500 hover:text-blue-700 ml-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading or Table */}
      {isLoading ? (
        <div className="text-center py-4">Loading dealerships...</div>
      ) : (
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
              {dealerships.length > 0 ? (
                paginate(dealerships).map((dealership, index) => (
                  <tr key={dealership._id || index} className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={dealership.image || "https://via.placeholder.com/40"}
                        alt="Dealership"
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {dealership.name || "No Title"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {dealership.description || "No Description"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setCurrentDealership(dealership);
                            setDealershipForm({
                              title: dealership.name,
                              description: dealership.description,
                              image: dealership.image,
                            });
                            setShowEditModal(true);
                          }}
                          className="bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setCurrentDealership(dealership);
                            setShowDeleteModal(true);
                          }}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    No auto dealerships found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination footer */}
      <div className="bg-gray-100 px-6 py-3 flex justify-between items-center mt-auto">
        <div className="text-sm text-gray-600">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, dealerships.length)}-
          {Math.min(currentPage * itemsPerPage, dealerships.length)} of {dealerships.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="bg-white p-2 rounded-md border hover:bg-gray-50 disabled:opacity-50"
          >
            &lt;
          </button>
          <button
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="bg-white p-2 rounded-md border hover:bg-gray-50 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>

      
      {showCreateModal && (
        <Modal>
          <h2 className="text-xl mb-4">Create Auto Dealership</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateDealership(dealershipForm);
            }}
          >
            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full my-2"
              value={dealershipForm.title}
              onChange={(e) => setDealershipForm({ ...dealershipForm, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="border p-2 w-full my-2"
              value={dealershipForm.description}
              onChange={(e) => setDealershipForm({ ...dealershipForm, description: e.target.value })}
            ></textarea>
            <input
              type="file"
              className="border p-2 w-full my-2"
              onChange={(e) => setDealershipForm({ ...dealershipForm, image: e.target.files[0] })}
            />
            <div className="flex gap-2 mt-4">
              <button type="submit" className="bg-cyan-600 text-white p-2 rounded-md">
                Create
              </button>
              <button
                type="button"
                className="bg-red-600 text-white p-2 rounded-md"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal>
          <h2 className="text-xl mb-4">Edit Auto Dealership</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditDealership(dealershipForm, currentDealership._id);
            }}
          >
            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full my-2"
              value={dealershipForm.title}
              onChange={(e) => setDealershipForm({ ...dealershipForm, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="border p-2 w-full my-2"
              value={dealershipForm.description}
              onChange={(e) => setDealershipForm({ ...dealershipForm, description: e.target.value })}
            ></textarea>
            <input
              type="file"
              className="border p-2 w-full my-2"
              onChange={(e) => setDealershipForm({ ...dealershipForm, image: e.target.files[0] })}
            />
            <div className="flex gap-2 mt-4">
              <button type="submit" className="bg-cyan-600 text-white p-2 rounded-md">
                Update
              </button>
              <button
                type="button"
                className="bg-red-600 text-white p-2 rounded-md"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal>
          <h2 className="text-xl mb-4 text-center">Are you sure you want to delete?</h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleDeleteDealership(currentDealership._id)}
              className="bg-red-600 text-white p-2 rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-400 text-white p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
