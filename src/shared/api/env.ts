const isDev = process.env.NODE_ENV === 'development';
export const API_BASE_URL = isDev
  ? '/api'
  : (process.env.REACT_APP_API_BASE_URL ?? 'https://belparyaj.com');
export const IMAGE_BASE_URL =
  process.env.REACT_APP_IMAGE_BASE_URL ?? 'https://bsw-dk1.pragmaticplay.net';
