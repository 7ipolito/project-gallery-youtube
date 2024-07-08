import axios from 'axios';

export const api = axios.create({
<<<<<<< HEAD
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`,
=======
  baseURL: 'http://localhost:3000/api/',
>>>>>>> main
});
