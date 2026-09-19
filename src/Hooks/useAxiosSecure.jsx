import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'https://astembd-server.onrender.com',
  // baseURL: 'http://localhost:5000',
  withCredentials: true, // Sends HttpOnly session cookie
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // Anti-CSRF custom header
  },
});

const useAxiosSecure = () => {
  const { userLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        // If session expired (401) or unauthorized access (403)
        if (status === 401) {
          try {
            if (userLogout) {
              await userLogout();
            }
          } catch (logoutErr) {
            console.error('Auto-logout error:', logoutErr);
          }
          navigate('/login');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [userLogout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;