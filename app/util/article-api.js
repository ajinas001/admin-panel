import axiosInstance from "./Axiosinstance";



export const getArticles = async () => {
    const response = await axiosInstance.get("/admin/Article/getArticle");
    return response.data.data.docs;
  };
  
  export const createArticle = async (formData) => {
    const response = await axiosInstance.post("/admin/Article/createArticle", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };
  
  export const updateArticle = async (id, formData) => {
    const response = await axiosInstance.put(`/admin/Article/updateArticle/${id}`, formData);
    return response.data;
  };
  
  export const deleteArticle = async (id) => {
    const response = await axiosInstance.delete(`/admin/Article/deleteArticle/${id}`);
    return response.data;
  };
  