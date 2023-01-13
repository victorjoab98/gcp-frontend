import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://34.134.205.144:4000/api',
})
