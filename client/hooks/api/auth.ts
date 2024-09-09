import axiosClient from '@/axios/axios-client';
import { useMutation } from '@tanstack/react-query';
import {
  APIResponse,
  ErrorResponse,
  ITokensResponse,
  ILoginPayload,
  IRefreshTokenPayload,
  IRegisterResponse,
  IRegisterPayload
} from '@/types';

export const useLogin = () => {
  return useMutation<APIResponse<ITokensResponse>, ErrorResponse, ILoginPayload>({
    mutationFn: async payload => {
      const response: APIResponse<ITokensResponse> = await axiosClient.post('/auth/signin', payload);
      return response;
    }
  });
};

export const useRegister = () => {
  return useMutation<APIResponse<IRegisterResponse>, ErrorResponse, IRegisterPayload>({
    mutationFn: async payload => {
      const response: APIResponse<IRegisterResponse> = await axiosClient.post('/auth/signup', payload);
      return response;
    }
  });
};

export const useRefreshToken = () => {
  return useMutation<APIResponse<ITokensResponse>, ErrorResponse, IRefreshTokenPayload>({
    mutationFn: async payload => {
      const response: APIResponse<ITokensResponse> = await axiosClient.post('/auth/refresh', payload);
      return response;
    }
  });
};