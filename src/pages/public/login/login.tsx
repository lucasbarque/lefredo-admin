import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '@components/inputs/input';
import { LoginForm } from './login.types';
import { useAuth } from '@hooks/useAuth';

const inputSchema = yup.object({
  email: yup
    .string()
    .email('E-mail com formato inválido.')
    .required('E-mail é obrigatório.'),
  password: yup.string().required('Senha é obrigatória.'),
});

export function Login() {
  const { signIn } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(inputSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async({email, password}) => {
    await signIn(email, password)
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name='email'
          error={errors.email?.message}
          placeholder='Digite seu e-mail'
          label='E-mail'
        />

        <Input
          control={control}
          name='password'
          error={errors.password?.message}
          placeholder='Digite sua senha'
          label='Senha'
          type='password'
        />

        <button type='submit' className="cursor-pointer">Logar</button>
      </form>
    </div>
  );
}
