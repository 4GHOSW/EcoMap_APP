import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://port-0-ecomap-api-m2see5gie6fd3062.sel4.cloudtype.app',
  // withCredentials: true,
});

export default axiosInstance;
