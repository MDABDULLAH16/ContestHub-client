import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
export const useAxiosSecure = () => {
  // You can add interceptors or any custom logic here
  return axiosSecure;
};
