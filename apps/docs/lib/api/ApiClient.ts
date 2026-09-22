import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { ApiError } from '@/lib/api/ApiError';

export class ApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_API_URL is not configured');
    }

    this.client = axios.create({
      baseURL: `${baseUrl}/api`,
      withCredentials: true,
      timeout: 10_000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async request<T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> =
        await this.client.request<T>({
          url: endpoint,
          ...config,
        });

      return response.data;
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message ??
          'Something went wrong';

        if (status) {
          throw new ApiError(status, message);
        }
      }

      throw new Error('Unable to connect to the server');
    }
  }

  public get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'GET',
    });
  }

  public post<T>(
    endpoint: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      data: body,
    });
  }

  public put<T>(
    endpoint: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      data: body,
    });
  }

  public patch<T>(
    endpoint: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      data: body,
    });
  }

  public delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();