import axiosInstance from "./Axiosinstance";



export const getAllHelpCenterKnowledgeBase = async () => {
    const response = await axiosInstance.get("/admin/HelpCenter/allHelpCenterKnowledgeBase");
    return response.data.data || [];
  };
  
  export const createHelpCenterItem = async (newItem) => {
    const response = await axiosInstance.post("/admin/HelpCenter/addHelpCenterKnowledgeBase", newItem);
    return response.data;
  };
  
  export const updateHelpCenterItem = async (id, updatedItem) => {
    const response = await axiosInstance.put(`/admin/HelpCenter/updateHelpCenterKnowledgeBase/${id}`, updatedItem);
    return response.data;
  };
  
  export const deleteHelpCenterItem = async (id) => {
    const response = await axiosInstance.delete(`/admin/HelpCenter/deleteHelpCenterKnowledgeBase/${id}`);
    return response.data;
  };
  