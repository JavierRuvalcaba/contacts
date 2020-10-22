import axios from 'axios';
import https from 'https';

const BASE_URL = process.env.REACT_APP_API_URL;

const mainAxios = axios.create({
  baseURL: BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default mainAxios;