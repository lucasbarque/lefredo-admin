import axios from 'axios';

import { HTTP_STATUS_CODE } from '@enums/http-status-code';

import { LOCAL_STORAGE_KEYS } from '../constants/storage/keys';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const getToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.token);

  if (token) {
    return token;
  } else {
    return null;
  }
};

api.interceptors.request.use((config) => {
  const token = getToken();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  config.headers = {
    Authorization: token
      ? `Bearer ${token.replace('"', '').replace('"', '')}`
      : '',
    'Content-Type': 'application/json',
  };
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === HTTP_STATUS_CODE.unauthorized &&
      localStorage.getItem(LOCAL_STORAGE_KEYS.token)
    ) {
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
