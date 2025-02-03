import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface CategoryCreateForm {
  category: string;
}

export function useFirstCategoryCreate() {
  const inputSchema = yup.object({
    category: yup.string().required('E-mail é obrigatório.'),
  });

  const {
    control,
    formState: { errors },
  } = useForm<CategoryCreateForm>({
    resolver: yupResolver(inputSchema),
    defaultValues: {
      category: '',
    },
  });
  return {
    control,
    errors,
  };
}
