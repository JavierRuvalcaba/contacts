import axios from 'axios';
import https from 'https';

const BASE_URL = process.env.REACT_APP_API_URL;

const mainAxios = axios.create({
  baseURL: BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const axiosMock = axios.create({
  baseURL: 'https://s3.amazonaws.com/',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default mainAxios;