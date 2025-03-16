'use client';

import { useEffect } from 'react';

import { deleteDishAPI, getDishesBySectionIdAPI } from '@/actions/dish.action';
import { toggleSectionAPI } from '@/actions/section.action';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { DishItem } from './dish-item';

interface DishesListProps {
  sectionId: string;
  isCategoryActive: boolean;
  onCategoryDeactivated: () => void;
}

export function DishesList({
  sectionId,
  isCategoryActive,
  onCategoryDeactivated,
}: DishesListProps) {
  const queryClient = useQueryClient();

  const {
    data: dishes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['dishes', sectionId],
    queryFn: () => getDishesBySectionIdAPI(sectionId),
  });

  const deleteMutation = useMutation({
    mutationFn: (dishId: string) => deleteDishAPI(dishId),
    onSuccess: () => {
      toast.success('Item deletado com sucesso', { position: 'top-right' });
      queryClient.invalidateQueries({ queryKey: ['dishes', sectionId] });
    },
    onError: () => {
      toast.error('Falha ao deletar item', { position: 'top-right' });
    },
  });

  function handleDeleteDish(dishId: string) {
    deleteMutation.mutate(dishId);
  }

  // Verifica se há pelo menos um prato ativo após a query atualizar
  useEffect(() => {
    if (!isLoading && dishes && isCategoryActive) {
      const activeCount = dishes.filter((dish: any) => dish.isActive).length;
      if (activeCount === 0) {
        // Se nenhum prato ativo, desativa a categoria
        toggleSectionAPI(sectionId)
          .then(() => {
            toast.warning('Categoria desativada por não possuir itens ativos', {
              position: 'top-right',
            });
            queryClient.invalidateQueries({ queryKey: ['sections'] });
            onCategoryDeactivated();
          })
          .catch(() => {
            toast.error('Falha ao atualizar categoria', {
              position: 'top-right',
            });
          });
      }
    }
  }, [
    dishes,
    isLoading,
    isCategoryActive,
    sectionId,
    onCategoryDeactivated,
    queryClient,
  ]);

  if (isLoading) {
    return (
      <div className='text-text-default flex items-center justify-center py-8 font-semibold'>
        Carregando itens...
      </div>
    );
  }

  if (isError || !dishes || dishes.length === 0) {
    return (
      <div className='text-text-default flex items-center justify-center py-8 font-semibold'>
        Nenhum item encontrado!
      </div>
    );
  }

  return (
    <div className='group-data-[is-category-visible=false]:hidden'>
      <div className='border-line mt-6 flex items-center border-b px-6 pb-3'>
        <div className='text-title-secondary w-[70%] font-semibold'>Item</div>
        <div className='text-title-secondary w-[15%] text-center font-semibold'>
          Preço
        </div>
        <div className='text-title-secondary w-[15%] text-center font-semibold'>
          Status de venda
        </div>
      </div>
      <div className='divide-line flex flex-col divide-y-1'>
        {dishes.map((dish) => (
          <DishItem
            key={dish.id}
            id={dish.id}
            title={dish.title}
            price={dish.price}
            isActive={dish.isActive}
            sectionId={sectionId}
            handleDeleteDish={handleDeleteDish}
            isDeleting={
              deleteMutation.isPending && deleteMutation.variables === dish.id
            }
            coverPhoto={dish?.dishMedias[0]?.url}
          />
        ))}
      </div>
    </div>
  );
}
