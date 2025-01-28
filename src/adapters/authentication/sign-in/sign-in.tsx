import { isAxiosError } from 'axios';

import { HTTP_STATUS_CODE } from '@enums/http-status-code';

import { useToast } from '@hooks/use-toast';

import { api } from '@services/api';

import { ErrorAPIResponse } from '../../../errors/ErrorBoundary';
import { SignInRequestAPI, SignInResponseAPI } from './sign-in.types';

export const SignInAPI = async ({ data }: SignInRequestAPI) => {
  const { toast } = useToast();

  try {
    const response = await api.post<SignInResponseAPI>(`/auth/login`, data);

    return {
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError<ErrorAPIResponse>(error)) {
      if (error.response?.data?.statusCode === HTTP_STATUS_CODE.unauthorized) {
        toast({
          message: 'E-mail ou senha inválidos.',
          type: 'error',
        });
      }
    } else {
      toast({
        message: 'Ocorreu um erro, tente novamente mais tarde.',
        type: 'error',
      });
    }
  }
  return {
    data: null,
  };
};
