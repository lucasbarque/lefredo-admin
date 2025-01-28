import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '@components/inputs/input';

interface InputForm {
  email: string;
  password: string;
}

const inputSchema = yup.object({
  email: yup
    .string()
    .email('E-mail com formato inválido.')
    .required('E-mail é obrigatório.'),
  password: yup.string().required('Senha é obrigatória.'),
});

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    resolver: yupResolver(inputSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<InputForm> = async () => {
    // if (affiliated) {
    //   const { data } = await CheckEmailApi({
    //     data: {
    //       affiliatedId: affiliated.id,
    //       email: email,
    //     },
    //   });

    //   const { data: dataUser } = await SigninApi({
    //     data: { email, affiliatedId: affiliated.id },
    //     disbleFeedback: true,
    //   });

    //   if (
    //     data?.status === HTTP_STATUS_CODE.ok &&
    //     dataUser?.affiliatedClientPlan.plan.type !== 'FREE'
    //   ) {
    //     navigate(`/login?email=${email}`);
    //   } else {
    //     const isFreeUserSignedIn = await RegisterApi({
    //       data: {
    //         email,
    //         affiliatedId: affiliated.id,
    //         isTermsSigned: true,
    //       },
    //     });
    //     if (isFreeUserSignedIn) buildTracker();
    //     const { data } = await SigninApi({
    //       data: { email, affiliatedId: affiliated.id },
    //     });

    //     setIsAuthenticated(true);

    //     localStorage.setItem(
    //       LOCAL_STORAGE_KEYS.token,
    //       JSON.stringify(data?.token.token)
    //     );
    //   }
    // }
  };

  return (
    <div>
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

        <button type='submit'>Logar</button>
      </form>
    </div>
  );
}
