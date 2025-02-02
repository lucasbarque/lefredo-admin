import { Button } from '@components/inputs/button';
import { Input } from '@components/inputs/input';

import { useLogin } from './use-login';

export function Login() {
  const { handleSubmit, onSubmit, control, errors, isSubmitting } = useLogin();

  return (
    <div className='w-screen flex items-center justify-center z-0 h-screen bg-[url(/assets/images/bg-admin.jpg)] bg-no-repeat bg-center bg-cover relative after:absolute after:inset-0 after:bg-black/40 after:z-[-1] overflow-hidden'>
      <div className='bg-white z-50 w-full max-w-md p-8 rounded-md h-fit'>
        <h1 className='text-3xl font-bold text-title-default'>
          Portal do Parceiro
        </h1>
        <p className='text-text-default text-lg'>
          Gerencie seu cardápio de forma fácil e rápida.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='pt-6 flex flex-col gap-4'
        >
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
            isPassword
          />
          <Button type='submit' size='lg' disabled={isSubmitting}>
            Fazer login
          </Button>
        </form>
      </div>
    </div>
  );
}
