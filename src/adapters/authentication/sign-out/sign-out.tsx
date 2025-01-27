import { useToast } from '@hooks/use-toast';

import { api } from '@services/api';

import { SignOutResponseAPI } from './sign-out.types';

export const SignOutAPI = async () => {
  const { toast } = useToast();

  try {
    const response = await api.get<SignOutResponseAPI>('/auth/logout');

    return {
      data: response.data,
    };
  } catch (error) {
    console.error(error);

    toast({
      message: 'Ocorreu um erro, tente novamente mais tarde.',
      type: 'error',
    });

    return {
      data: null,
    };
  }
};
