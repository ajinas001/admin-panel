
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getArticles, updateArticle, deleteArticle, createArticle } from "@/app/util/article-api";



export default function Article() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

 
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticles();
  }, []);

  const handleAddArticle = () => {
    setFormData({
      title: "",
      description: "",
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      description: article.description,
      image: article.image,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (selectedArticle) {
      try {
        await updateArticle(selectedArticle._id, formData);
        setArticles((prevArticles) =>
          prevArticles.map((article) =>
            article._id === selectedArticle._id ? { ...article, ...formData } : article
          )
        );
        setIsModalOpen(false);
      } catch (err) {
        setError("Failed to update the article");
      }
    } else {
    
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        if (formData.image) formDataToSend.append("image", formData.image);

        await createArticle(formDataToSend);
        const newArticle = { ...formData, _id: Date.now().toString() }; // temporary ID for new article
        setArticles((prevArticles) => [...prevArticles, newArticle]);
        setIsModalOpen(false);
      } catch (err) {
        setError("Failed to create the article");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== id)
      );
    } catch (err) {
      setError("Failed to delete the article");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="bg-coral-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Article</h1>
        <div className="flex gap-2">
          <button
            onClick={handleAddArticle}
            className="bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
          >
            <span>+</span> Add new article
          </button>
          <button className="bg-white text-red-500 p-2 rounded-md hover:bg-gray-100">
            <RiDeleteBin5Line className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && <p className="text-red-600 p-4">{error}</p>}

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-4">Loading articles...</div>
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
              {articles.length > 0 ? (
                articles.map((article) => (
                  <tr key={article._id} className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={article.image || "/placeholder-couple.jpg"}
                        alt="Article thumbnail"
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-700">{article.title}</td>
                    <td className="px-4 py-3 text-gray-600">{article.description}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(article)}
                          className="bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(article._id)}
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
                  <td colSpan="5" className="text-center p-4">
                    No articles available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for editing or adding article */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Article</h2>

            {/* Upload Image */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 004 4h10a4 4 0 004-4m-4-7l-4-4m0 0L7 8m5-5v12"
                  />
                </svg>
              </div>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="mt-2"
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter article title"
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
                  placeholder="Enter article description"
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-md mt-4"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
