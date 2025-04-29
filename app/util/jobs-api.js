import axiosInstance from "./Axiosinstance";

const token = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTc3YWMwMTJiNjgxZmU1YzEzMGEyYyIsImlhdCI6MTcyMTIwODU2MSwiZXhwIjoxNzUyNzQ0NTYxfQ.gSMJuC3hqtVf3qNQoK84h_HLGd7efj99YMlhEbzc8FM"

export const getJobs = async () => {
  try {
    const response = await axiosInstance.get('/admin/allJobsForAdmin', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch jobs");
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await axiosInstance.post('/admin/createJob', jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create job");
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const response = await axiosInstance.put(`/admin/updateJobs/${id}`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update job");
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/deleteJobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete job");
  }
};
