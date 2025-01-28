import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAuth } from '@hooks/useAuth';

import { LoginForm } from './login.types';

export function useLogin() {
  const { signIn } = useAuth();
  const inputSchema = yup.object({
    email: yup
      .string()
      .email('E-mail com formato inválido.')
      .required('E-mail é obrigatório.'),
    password: yup.string().required('Senha é obrigatória.'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(inputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }) => {
    await signIn(email, password);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
}
