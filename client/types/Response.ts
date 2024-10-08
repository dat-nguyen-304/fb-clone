import { AxiosError } from 'axios';

export interface APIResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorResponse extends AxiosError<APIResponse<string>> {}

export interface ITokensResponse {
  refreshToken: string;
  accessToken: string;
}

export interface IRegisterResponse {
  id: string;
  username: string;
  fullName: string;
  gender: 'MALE' | 'FEMALE';
  createdDate: any;
  updatedDate: any;
}
