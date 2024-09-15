import axiosClient from '@axios/axios-client';
import axiosFormData from '@axios/axios-form-data';
import { useMutation } from '@tanstack/react-query';
import { APIResponse, ErrorResponse, User, IUpdateUserPayload, IUpdateUserImagePayload } from '@types';

export const useUpdateUser = (userId: string) => {
  return useMutation<APIResponse<User>, ErrorResponse, IUpdateUserPayload>({
    mutationFn: async payload => {
      const response: APIResponse<User> = await axiosClient.patch(`/user/${userId}`, payload);
      return response;
    }
  });
};

export const useUpdateUserImage = (userId: string) => {
  return useMutation<APIResponse<User>, ErrorResponse, IUpdateUserImagePayload>({
    mutationFn: async payload => {
      const { image, type, isPublic, description } = payload;
      const formData = new FormData();
      formData.append('image', image);
      formData.append('type', type);
      formData.append('isPublic', String(isPublic));
      if (isPublic && description) formData.append('description', description);
      const response: APIResponse<User> = await axiosFormData.post(`/user/image/${userId}`, payload);
      return response;
    }
  });
};
