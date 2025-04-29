import axios from "axios";


export const login = async (email, password) => {
    try {
      const response = await axios.post('https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  export async function resetPassword({ email, newPassword, confirmPassword }) {
    try {
      const res = await fetch('https://mamun-reza-freeshops-backend.vercel.app/api/v1/user/forgetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.message || 'Failed to reset password');
  
      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error');
    }
  }
  
  