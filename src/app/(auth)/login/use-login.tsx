import { loginSchema } from '@/validations/login-schema';
import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function useLogin() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async ({
    email,
    password,
  }) => {
    if (!isLoaded) return null;

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/welcome');
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast.error('E-mail ou senha inválidos. Tente novamente!', {
          position: 'top-center',
        });
      }
      toast.error(
        'Ocorreu um erro interno! Por favor, entre em contato com o administrador do sistema',
        {
          position: 'top-center',
        }
      );
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
