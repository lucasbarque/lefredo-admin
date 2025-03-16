'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';

import { deleteDishAPI, getDishesBySectionIdAPI } from '@/actions/dish.action';
import { toggleSectionAPI } from '@/actions/section.action';
import { revalidateSectionsWithItems } from '@/app/actions';
import { toast } from 'sonner';

import { DishItem } from './dish-item';

interface DishesListProps {
  sectionId: string;
  isCategoryActive: boolean;
}

export function DishesList({ sectionId, isCategoryActive }: DishesListProps) {
  const [dishes, setDishes] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [deletingDishId, setDeletingDishId] = useState<string | null>(null);

  const getDish = useCallback(() => {
    startTransition(async () => {
      const response = await getDishesBySectionIdAPI(sectionId);
      setDishes(response);
    });
  }, [sectionId, startTransition]);

  async function handleDeleteDish(id: string) {
    setDeletingDishId(id);
    const isLastDish = dishes.length === 1;
    const responseStatus = await deleteDishAPI(id);

    if (responseStatus === 200) {
      if (isLastDish && isCategoryActive) {
        await toggleSectionAPI(sectionId);
        await revalidateSectionsWithItems();
      }
      getDish();
      toast.success('Item deletado com sucesso', { position: 'top-right' });
    } else {
      toast.error('Falha ao deletar item', { position: 'top-right' });
    }
    setDeletingDishId(null);
  }

  useEffect(() => {
    getDish();
  }, [getDish]);

  if (isPending) {
    return (
      <div className='text-text-default flex items-center justify-center py-8 font-semibold'>
        Carregando items...
      </div>
    );
  }

  if (dishes.length === 0) {
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
            isDeleting={deletingDishId === dish.id}
          />
        ))}
      </div>
    </div>
  );
}
