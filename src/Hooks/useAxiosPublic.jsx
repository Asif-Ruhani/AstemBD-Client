import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://astembd-server.onrender.com',
  // baseURL: 'http://localhost:5000'
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;