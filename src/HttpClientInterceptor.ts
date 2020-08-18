import axios, { AxiosResponse, AxiosError } from 'axios';

export const HttpClientInterceptor = (): Promise<AxiosResponse> =>
  new Promise((_, reject) => {
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        reject(error);
        throw error;
      }
    );
  });
