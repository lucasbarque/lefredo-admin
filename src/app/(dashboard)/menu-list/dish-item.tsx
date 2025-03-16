'use client';

import { useState } from 'react';

import { changePriceAPI, toggleDishAPI } from '@/actions/dish.action';
import { formatCurrency } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { EmptyImage } from '@/components/data-display/empty-image';
import { LoadingSpinner } from '@/components/data-display/loading-spinner/loading-spinner';
import { InputCashout } from '@/components/inputs/input-cashout';
import { ToggleSwitch } from '@/components/inputs/toggle-switch';
import { DropdownMenu } from '@/components/navigation/dropdown-menu';

const inputSchema = z.object({
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .transform((value) => value.replace('.', '').replace(',', '.')),
});
type FormPriceSchema = z.infer<typeof inputSchema>;

interface ItemListProps {
  id: string;
  title: string;
  price: number;
  isActive: boolean;
  coverPhoto?: string;
  sectionId: string;
  handleDeleteDish: (id: string) => void;
  isDeleting: boolean;
}

export function DishItem({
  id,
  title,
  price,
  isActive,
  coverPhoto,
  sectionId,
  handleDeleteDish,
  isDeleting,
}: ItemListProps) {
  const queryClient = useQueryClient();
  const { control, watch } = useForm<FormPriceSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      price:
        new Intl.NumberFormat('pt-BR', {
          style: 'decimal',
          currency: 'BRL',
          minimumFractionDigits: 2,
        }).format(price / 100) ?? '0,00',
    },
  });
  const [isActiveItem, setActiveItem] = useState(isActive);

  const toggleDishMutation = useMutation({
    mutationFn: () => toggleDishAPI(id),
    onSuccess: () => {
      toast.success(
        `O item foi ${isActiveItem ? 'desativado' : 'ativado'} com sucesso`,
        { position: 'top-right' }
      );
      setActiveItem((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ['dishes', sectionId] });
    },
    onError: () => {
      toast.error(
        `Falha ao ${isActiveItem ? 'desativar' : 'ativar'} item. Tente novamente mais tarde`,
        { position: 'top-right' }
      );
    },
  });

  const changePriceMutation = useMutation({
    mutationFn: (newPrice: number) => changePriceAPI(id, { price: newPrice }),
    onSuccess: () => {
      toast.success('Preço atualizado com sucesso', { position: 'top-right' });
      queryClient.invalidateQueries({ queryKey: ['dishes', sectionId] });
    },
    onError: () => {
      toast.error('Falha ao atualizar preço', { position: 'top-right' });
    },
  });

  function handleToggleDish() {
    toggleDishMutation.mutate();
  }

  async function handleSavePrice() {
    let priceToUpdate: string = watch('price');
    priceToUpdate = formatCurrency(priceToUpdate, 'to-decimal');
    if (price === Number(priceToUpdate)) return;
    changePriceMutation.mutate(Number(priceToUpdate));
  }

  return isDeleting ? (
    <div className='flex h-[89px] animate-pulse items-center justify-center gap-4 px-6'>
      <span className='text-brand-default font-semibold'>
        Excluindo item...
      </span>
      <LoadingSpinner family='secondary' />
    </div>
  ) : (
    <div className='flex items-center px-6 py-3'>
      <div className='flex w-[70%] items-center gap-4'>
        {coverPhoto ? (
          <Image
            className='h-16 w-16 rounded-2xl object-cover'
            width={100}
            height={100}
            src={process.env.NEXT_PUBLIC_BUCKET_URL + coverPhoto}
            alt=''
            quality={80}
          />
        ) : (
          <EmptyImage size='sm' />
        )}
        <div className='text-title-secondary text-sm font-semibold'>
          {title}
        </div>
      </div>
      <form className='w-[15%]'>
        <InputCashout
          id={id}
          control={control}
          name='price'
          placeholder='0,00'
          withSideLabel
          sideLabelText='R$'
          limitCash={10000}
          onBlur={handleSavePrice}
        />
      </form>
      <div className='w-[15%]'>
        <div className='flex w-full items-center justify-center'>
          <div className='flex-1'>
            <ToggleSwitch
              label={isActiveItem ? 'Ativado' : 'Desativado'}
              onCheckedChange={handleToggleDish}
              checked={isActiveItem}
              id={`is-active-dish-${id}`}
              name={`is-active-dish-${id}`}
              disabled={toggleDishMutation.isPending}
            />
          </div>
          <DropdownMenu>
            <DropdownMenu.Item>
              <DropdownMenu.Trigger>
                <IconDotsVertical
                  size={22}
                  className='cursor-pointer text-gray-600'
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                dropdownItems={[
                  {
                    icon: <IconEdit size={20} className='text-gray-700' />,
                    linkProps: { href: `edit-item-details/${id}` },
                    title: 'Editar item',
                  },
                ]}
                lastDropdownItems={[
                  {
                    icon: <IconTrash size={20} className='text-gray-700' />,
                    linkProps: { onClick: () => handleDeleteDish(id) },
                    title: 'Excluir item',
                  },
                ]}
              />
            </DropdownMenu.Item>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
