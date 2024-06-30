import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://project-gallery-youtube-production.up.railway.app//api/',
});
