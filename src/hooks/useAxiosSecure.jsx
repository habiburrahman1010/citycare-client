import { useEffect } from 'react';
import axios from 'axios';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({ baseURL: 'http://localhost:3000' });

const useAxiosSecure = () => {
  const { user } = UseAuth();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      response => response,
      error => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
