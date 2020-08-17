import axios, { AxiosResponse, AxiosError } from 'axios';

export const HttpClientInterceptor = (): Promise<AxiosResponse> =>
  new Promise((resolve, reject) => {
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        resolve(response);
        return response;
      },
      (error: AxiosError) => {
        reject(error);
        throw error;
      }
    );
  });
