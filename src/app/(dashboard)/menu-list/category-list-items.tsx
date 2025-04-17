'use client';

import { useState } from 'react';

import { deleteSectionAPI, toggleSectionAPI } from '@/actions/section.action';
import {
  IconChevronUp,
  IconDotsVertical,
  IconEdit,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/inputs/button';
import { ToggleSwitch } from '@/components/inputs/toggle-switch';
import { DropdownMenu } from '@/components/navigation/dropdown-menu';

import { DishesList } from './dishes-list';

interface CategoryListProps {
  id: string;
  title: string;
  isActive: boolean;
  slug: string;
}

export function CategoryListItems({ id, title, isActive }: CategoryListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isCategoryActive, setIsCategoryActive] = useState(isActive);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const toggleMutation = useMutation({
    mutationFn: () => toggleSectionAPI(id),
    onSuccess: () => {
      toast.success(
        `Categoria foi ${isCategoryActive ? 'desativada' : 'ativada'} com sucesso`,
        { position: 'top-right' }
      );
      setIsCategoryActive((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ['sections'] });
    },
    onError: () => {
      toast.error(
        `Falha ao ${isCategoryActive ? 'desativar' : 'ativar'} categoria. Tente novamente mais tarde`,
        { position: 'top-right' }
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteSectionAPI(id),
    onSuccess: (statusCode) => {
      if (statusCode === 200) {
        toast.success('Categoria deletada com sucesso', {
          position: 'top-right',
        });
        queryClient.invalidateQueries({ queryKey: ['sections'] });
      }
      if (statusCode === 417) {
        toast.warning('Para deletar a categoria, exclua primeiro os itens', {
          position: 'top-right',
        });
      }
    },
    onError: () => {
      toast.error('Falha ao deletar categoria. Tente novamente mais tarde', {
        position: 'top-right',
      });
    },
  });

  const handleToggleSection = () => {
    toggleMutation.mutate();
  };

  const handleDeleteCategory = () => {
    deleteMutation.mutate();
  };

  const handleCategoryDeactivated = () => {
    setIsCategoryActive(false);
  };

  return (
    <div
      data-is-category-visible={isCategoryVisible}
      id={id}
      className={clsx(
        'border-line group rounded-md border pt-6 data-[is-category-visible=false]:pb-6',
        {
          'animation-pulse':
            toggleMutation.isPending || deleteMutation.isPending,
        }
      )}
    >
      <div className='flex items-center justify-between px-6'>
        <div className='text-title-default text-[22px] font-bold'>{title}</div>
        <div className='flex items-center gap-6'>
          <Link href={`/add-item-details/${id}`}>
            <Button family='secondary' size='sm'>
              <Button.Icon>
                <IconPlus size={16} />
              </Button.Icon>
              Adicionar item
            </Button>
          </Link>
          <div className='w-18'>
            <ToggleSwitch
              disabled={toggleMutation.isPending || deleteMutation.isPending}
              label={isCategoryActive ? 'Ativada' : 'Desativada'}
              onCheckedChange={handleToggleSection}
              checked={isCategoryActive}
              id={`is-category-active-${id}`}
              name={`is-category-active-${id}`}
            />
          </div>
          <div className='flex items-center gap-2'>
            <IconChevronUp
              size={22}
              onClick={() => setIsCategoryVisible(!isCategoryVisible)}
              className='cursor-pointer text-gray-600 transition-all duration-300 group-data-[is-category-visible=true]:rotate-180'
            />
            <DropdownMenu>
              <DropdownMenu.Item>
                <DropdownMenu.Trigger>
                  <IconDotsVertical
                    size={22}
                    className='z-[-1] cursor-pointer text-gray-600'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  dropdownItems={[
                    {
                      icon: <IconEdit size={20} className='text-gray-700' />,
                      linkProps: {
                        onClick: () => router.push('/update-category/' + id),
                      },
                      title: 'Editar categoria',
                    },
                  ]}
                  lastDropdownItems={[
                    {
                      icon: <IconTrash size={20} className='text-gray-700' />,
                      linkProps: { onClick: handleDeleteCategory },
                      title: 'Excluir categoria',
                    },
                  ]}
                />
              </DropdownMenu.Item>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {isCategoryVisible && (
        <DishesList
          sectionId={id}
          isCategoryActive={isCategoryActive}
          onCategoryDeactivated={handleCategoryDeactivated}
        />
      )}
    </div>
  );
}
