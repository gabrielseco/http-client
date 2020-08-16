import axios from 'axios';

export const HttpClientInterceptor = () =>
  new Promise((resolve, reject) => {
    axios.interceptors.response.use(
      (response) => {
        resolve(response);
        return response;
      },
      (error) => {
        reject(error);
        throw error;
      }
    );
  });
