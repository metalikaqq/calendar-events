import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default $api;