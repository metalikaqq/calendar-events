import axios from 'axios';

const BASE_URL = 'https://13.51.159.168/'

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default $api;
