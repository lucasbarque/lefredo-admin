import { Input } from '@components/inputs/input';

import { useLogin } from './use-login';

export function Login() {
  const { handleSubmit, onSubmit, control, errors } = useLogin();

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
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

        <button type='submit' className='cursor-pointer'>
          Logar
        </button>
      </form>
    </div>
  );
}
