'use client';

import { useState } from 'react';

import { createSectionAPI } from '@/actions/section.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';

const inputSchema = z.object({
  category: z.string().min(3, 'Digite pelo menos 3 caracteres.'),
});

export function FormCreateCategory() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      category: '',
    },
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof inputSchema>) {
    const response = await createSectionAPI({
      title: data.category,
      description: null,
    });
    if (response.status === 201) {
      toast.success('Categoria criada com sucesso', {
        position: 'top-right',
      });
    }
    reset();
    setIsFormOpen(false);
  }

  return (
    <>
      {!isFormOpen && (
        <Button family='tertiary' fullSize onClick={() => setIsFormOpen(true)}>
          <Button.Icon>
            <IconPlus size={16} />
          </Button.Icon>
          Criar outra categoria
        </Button>
      )}

      {isFormOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-5 flex w-full max-w-[464px] flex-col items-end'
        >
          <Input
            id='category'
            name='category'
            control={control}
            error={errors.category?.message}
            placeholder='Digite o nome da categoria'
          />
          <div className='flex gap-2.5 pt-4'>
            <Button type='button' family='secondary' size='sm'>
              Cancelar
            </Button>
            <Button size='sm' type='submit'>
              Salvar
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
