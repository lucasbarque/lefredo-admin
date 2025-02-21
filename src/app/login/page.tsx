'use client';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';

import { useLogin } from './use-login';

export default function PageLogin() {
  const { handleSubmit, onSubmit, control, errors, isSubmitting } = useLogin();

  return (
    <div className='relative z-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-[url(/assets/images/bg-admin.jpg)] bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:z-[-1] after:bg-black/40'>
      <div className='z-50 h-fit w-full max-w-md rounded-md bg-white p-8'>
        <h1 className='text-title-default text-3xl font-bold'>
          Portal do Parceiro
        </h1>
        <p className='text-text-default text-lg'>
          Gerencie seu cardápio de forma fácil e rápida.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 pt-6'
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
