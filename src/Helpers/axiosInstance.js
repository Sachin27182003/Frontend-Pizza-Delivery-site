import axios from "axios";

const axiosInstance = axios.create();  //create a new instance of axios

axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL; //set the base URL

axiosInstance.defaults.withCredentials = true; //Allow cookies to be sent with requests

export default axiosInstance;