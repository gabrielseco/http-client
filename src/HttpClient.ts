import axios, { AxiosResponse } from 'axios';

type StringObject = { [key: string]: string };

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
    params
  }: {
    pathname: string;
    params?: Record<string, unknown>;
  }): Promise<AxiosResponse<ApiResponse>> {
    return axios.get(`${this.baseUrl}${pathname}`, {
      params,
      headers: this.headers
    });
  }

  post<Payload, ApiResponse>({
    pathname,
    payload
  }: {
    pathname: string;
    payload: Payload;
  }): Promise<AxiosResponse<ApiResponse>> {
    return axios.post(`${this.baseUrl}${pathname}`, payload, {
      headers: this.headers
    });
  }

  put<Payload, ApiResponse>({
    pathname,
    payload
  }: {
    pathname: string;
    payload: Payload;
  }): Promise<AxiosResponse<ApiResponse>> {
    return axios.put(`${this.baseUrl}${pathname}`, payload, {
      headers: this.headers
    });
  }

  patch<Payload, ApiResponse>({
    pathname,
    payload
  }: {
    payload: Payload;
    pathname: string;
  }): Promise<AxiosResponse<ApiResponse>> {
    return axios.patch(`${this.baseUrl}${pathname}`, payload, {
      headers: this.headers
    });
  }

  delete<ApiResponse>({
    pathname
  }: {
    pathname: string;
  }): Promise<AxiosResponse<ApiResponse>> {
    return axios.delete(`${this.baseUrl}${pathname}`, {
      headers: this.headers
    });
  }
}
