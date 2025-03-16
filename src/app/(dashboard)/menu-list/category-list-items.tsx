'use client';

import { useEffect, useState } from 'react';

import { deleteSectionAPI, toggleSectionAPI } from '@/actions/section.action';
import { revalidateSectionsWithItems } from '@/app/actions';
import {
  IconChevronUp,
  IconDotsVertical,
  IconEdit,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
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
  const [isCategoryActive, setIsCategoryActive] = useState(isActive);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);

  const router = useRouter();

  async function handleToggleSection(id: string) {
    setIsLoadingCategory(true);
    const responseStatus = await toggleSectionAPI(id);
    if (responseStatus === 200) {
      toast.success(
        `Categoria foi ${isCategoryActive ? 'desativada' : 'ativada'} com sucesso`,
        { position: 'top-right' }
      );
      setIsCategoryActive(!isCategoryActive);
    } else if (responseStatus === 428) {
      toast.error(
        'Para ativar a categoria é necessário ter pelo menos 01 item ativo',
        { position: 'top-right' }
      );
      setIsCategoryActive(false);
    } else {
      toast.error(
        `Falha ao ${isCategoryActive ? 'desativar' : 'ativar'} categoria. Tente novamente mais tarde`,
        { position: 'top-right' }
      );
    }
    setIsLoadingCategory(false);
  }

  async function handleDeleteCategory(id: string) {
    setIsLoadingCategory(true);
    const responseStatus = await deleteSectionAPI(id);
    if (responseStatus === 200) {
      await revalidateSectionsWithItems();
      toast.success('Categoria deletada com sucesso', {
        position: 'top-right',
      });
    } else if (responseStatus === 417) {
      toast.error(
        'Falha ao deletar a categoria, pois é necessário deletar os itens primeiro',
        { position: 'top-right' }
      );
    } else {
      toast.error('Falha ao deletar categoria. Tente novamente mais tarde', {
        position: 'top-right',
      });
    }
    setIsLoadingCategory(false);
  }

  useEffect(() => {
    setIsCategoryActive(isActive);
  }, [isActive]);

  return (
    <div
      data-is-category-visible={isCategoryVisible}
      id={id}
      className={clsx(
        'border-line group rounded-md border pt-6 data-[is-category-visible=false]:pb-6',
        {
          'animation-pulse': isLoadingCategory,
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
              disabled={isLoadingCategory}
              label={isCategoryActive ? 'Ativada' : 'Desativada'}
              onCheckedChange={() => handleToggleSection(id)}
              defaultChecked={isCategoryActive}
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
                      linkProps: {
                        onClick: () => handleDeleteCategory(id),
                      },
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
        <DishesList sectionId={id} isCategoryActive={isCategoryActive} />
      )}
    </div>
  );
}
