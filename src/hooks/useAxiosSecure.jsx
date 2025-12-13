import axios from "axios";
import { useEffect } from "react";

import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
 

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  // console.log(user);
  
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
    //interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        //   if got error
        console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logoutUser().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logoutUser, navigate]);
  return axiosSecure;
};
export default useAxiosSecure;
