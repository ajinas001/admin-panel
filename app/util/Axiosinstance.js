import axios from "axios";


const BASE_URL = "https://mamun-reza-freeshops-backend.vercel.app/api/v1";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance