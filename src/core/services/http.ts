import axios from 'axios';

import config from '@/config';

import storage from './storage';

const pureHttp = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

pureHttp.interceptors.request.use(axiosConfig => {
  const lang = storage.local.get(config.language.key) || config.language.initial;
  axiosConfig.headers['Accept-Language'] = lang;
  return axiosConfig;
});

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(axiosConfig => {
  const accessToken = storage.local.get(config.api.accessTokenKey) || '';
  const lang = storage.local.get(config.language.key) || config.language.initial;

  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  axiosConfig.headers['Accept-Language'] = lang;

  return axiosConfig;
});

export default { pureRequest: pureHttp, request: http };
