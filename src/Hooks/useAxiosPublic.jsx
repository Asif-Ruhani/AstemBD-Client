import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://astembd-server.onrender.com',
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;