// import { HTTP_STATUS_CODE } from '@enums/http-status-code';
// import { useToast } from '@hooks/use-toast';
import { api } from '@services/api';

import { SignInRequestAPI, SignInResponseAPI } from './sign-in.types';

export const SignInApi = async ({ data }: SignInRequestAPI) => {
  // const { toast } = useToast();

  try {
    const response = await api.post<SignInResponseAPI>(`/client/login`, data);

    return {
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    // if (error?.response.status === HTTP_STATUS_CODE.unauthorized) {
    //   toast({
    //     message: 'E-mail ou senha inválidos.',
    //     type: 'error',
    //   });
    // } else {
    //   toast({
    //     message: 'Ocorreu um erro, tente novamente mais tarde.',
    //     type: 'error',
    //   });
    // }

    return {
      data: null,
    };
  }
};
