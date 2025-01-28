import { useToast } from '@hooks/use-toast';

import { api } from '@services/api';

import { MeResponseAPI } from './me.types';

export const MeAPI = async () => {
  const { toast } = useToast();

  try {
    const response = await api.get<MeResponseAPI>('/auth/me');

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
