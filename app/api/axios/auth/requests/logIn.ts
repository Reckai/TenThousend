import type { AxiosRequestConfig } from 'axios';

import { authApi } from '../instanse';

export interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export const logIn = async (credentials: LoginCredentials, config?: AxiosRequestConfig) => {
try {
  const response = await authApi.post<LoginResponse>('/login', credentials, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
  });
  return response.data;

} catch (error) {
  throw new Error('Failed to log in', { cause: error });
}};
