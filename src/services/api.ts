import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const apiDB = axios.create({
  baseURL: 'http://localhost:3000/api',
});
