import axios, { ResponseType, AxiosResponse, CancelTokenSource } from 'axios';

type StringObject = { [key: string]: string };

type Options = {
  responseType?: ResponseType;
  cancelToken?: CancelTokenSource;
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

  getOptions(options?: Options) {
    return {
      responseType: options?.responseType || 'json',
      cancelToken: options?.cancelToken?.token || undefined
    };
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
      headers: this.headers,
      ...this.getOptions(options)
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
      headers: this.headers,
      ...this.getOptions(options)
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
      headers: this.headers,
      ...this.getOptions(options)
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
      headers: this.headers,
      ...this.getOptions(options)
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
      headers: this.headers,
      ...this.getOptions(options)
    });
  }
}
