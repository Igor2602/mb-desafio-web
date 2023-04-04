import { useSnackbar } from 'vue3-snackbar';
import axios from 'axios';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const snackbar = useSnackbar();
    console.log(error, 'statusCode error');
    if (error.response.status === 403 || error.response.status === 401) {
      snackbar.add({
        type: 'error',
        text: 'Ocorreu um erro',
      });
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
