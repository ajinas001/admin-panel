import axiosInstance from "./Axiosinstance";



export const getAutoDealerships = async () => {
    const response = await axiosInstance.get("/admin/AutoDealerShip/allAutoDealerShip");
    return response.data.data[0].everyThing || [];
  };
  
  export const createAutoDealership = async (dealershipData) => {
    const response = await axiosInstance.post("/admin/AutoDealerShip/addAutoDealerShip", dealershipData);
    return response.data;
  };
  
  export const updateAutoDealership = async (id, updatedData) => {
    const response = await axiosInstance.put(`/admin/AutoDealerShip/addAutoDealerShip/${id}`, updatedData);
    return response.data;
  };
  
  export const deleteAutoDealership = async (id) => {
    const response = await axiosInstance.delete(`/admin/AutoDealerShip/deleteAutoDealerShip/${id}`);
    return response.data;
  };
  