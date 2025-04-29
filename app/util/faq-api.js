import axiosInstance from "./Axiosinstance";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ2NTA2MjhlMmIzMzMyZjc5NWZkZiIsImlhdCI6MTY5NzQ3MzExMSwiZXhwIjoxNjk3NzMyMzExfQ.GLWjUQcepsbGIbuLq59q_rO48nJ2W0U2wKav23zZ7cU";


export const getFaqs = async () => {
    const response = await axiosInstance.get("/faq/all");
    return response.data.data || [];
  };
  
  export const createFaq = async (faqData) => {
    const response = await axiosInstance.post("/faq/add", faqData);
    return response.data;
  };
  
  export const updateFaq = async (id, faqData) => {
    const response = await axiosInstance.put(`/faq/update/${id}`, faqData);
    return response.data;
  };
  
  export const deleteFaq = async (id) => {
    const response = await axiosInstance.delete(`/faq/delete/${id}`,{
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  };
  