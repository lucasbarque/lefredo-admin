import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const inputSchema = z.object({
  email: z
    .string()
    .nonempty('E-mail é obrigatório.')
    .email('E-mail com formato inválido.'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .nonempty('Senha é obrigatória.'),
});

type LoginFormSchema = z.infer<typeof inputSchema>;

export function useLogin() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async ({
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
