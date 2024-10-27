import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ecomap-api-1xa2.onrender.com',
  // withCredentials: true,
});

export default axiosInstance;
