import axios, { ResponseType, AxiosResponse } from 'axios';

type StringObject = { [key: string]: string };

type Options = {
  responseType?: ResponseType;
};

export class HttpClient {
  private baseUrl: string;
  private headers: StringObject;

  constructor({
    baseUrl,
    headers = {}
  }: {
    baseUrl: string;
    headers?: StringObject;
  }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  get<ApiResponse>({
    pathname,
    params,
    options
  }: {
    pathname: string;
    params?: Record<string, unknown>;
    options?: Options;
  }): Promise<AxiosResponse<ApiResponse>> {
    return axios.get(`${this.baseUrl}${pathname}`, {
      params,
      responseType: options?.responseType || 'json',
      headers: this.headers
    });
  }

  post<Payload, ApiResponse>({
    pathname,
    payload,
    options
  }: {
    pathname: string;
    payload: Payload;
    options?: Options;
  }): Promise<AxiosResponse<ApiResponse>> {
    return axios.post(`${this.baseUrl}${pathname}`, payload, {
      responseType: options?.responseType || 'json',
      headers: this.headers
    });
  }

  put<Payload, ApiResponse>({
    pathname,
    payload,
    options
  }: {
    pathname: string;
    payload: Payload;
    options?: Options;
  }): Promise<AxiosResponse<ApiResponse>> {
    return axios.put(`${this.baseUrl}${pathname}`, payload, {
      responseType: options?.responseType || 'json',
      headers: this.headers
    });
  }

  patch<Payload, ApiResponse>({
    pathname,
    payload,
    options
  }: {
    payload: Payload;
    pathname: string;
    options?: Options;
  }): Promise<AxiosResponse<ApiResponse>> {
    return axios.patch(`${this.baseUrl}${pathname}`, payload, {
      responseType: options?.responseType || 'json',
      headers: this.headers
    });
  }

  delete<ApiResponse>({
    pathname,
    options
  }: {
    pathname: string;
    options?: Options;
  }): Promise<AxiosResponse<ApiResponse>> {
    return axios.delete(`${this.baseUrl}${pathname}`, {
      responseType: options?.responseType || 'json',
      headers: this.headers
    });
  }
}
