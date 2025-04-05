'use client';

import { formatCurrency } from '@/lib/utils';
import {
  IconCameraUp,
  IconEdit,
  IconGripVertical,
  IconQuestionMark,
  IconTrash,
} from '@tabler/icons-react';
import Image from 'next/image';

import { EmptyImage } from '@/components/data-display/empty-image';
import Tooltip from '@/components/data-display/tooltip/tooltip';

import { ItemFlavorProps } from './add-item-flavors.types';

export function ItemFlavor({
  id,
  label,
  title,
  price,
  description,
  dish,
  dishFlavorsMedias,
  setEditItem,
  handleOpenModalImage,
  handleDeleteItem,
}: ItemFlavorProps) {
  const cleanDescription = (html?: string) => {
    if (!html) return '(sem descrição cadastrada)';
    return html.replace(/<[^>]*>/g, '');
  };

  const descriptionText = cleanDescription(
    description || dish.data.description
  );
  const priceValue = price || dish.data.price;

  return (
    <div className='mb-2 flex w-full cursor-grab items-center gap-2'>
      <IconGripVertical size={24} className='text-text-default' />
      <div className='border-line flex h-full w-full items-center justify-between gap-3 rounded-md border bg-white p-3'>
        {dishFlavorsMedias.length === 0 && <EmptyImage />}

        {dishFlavorsMedias.length > 0 && (
          <Image
            src={process.env.NEXT_PUBLIC_BUCKET_URL + dishFlavorsMedias[0].url}
            alt=''
            className='h-[5.625rem] w-[5.625rem] rounded-md object-cover'
            height={120}
            width={120}
            quality={80}
          />
        )}

        <div className='flex flex-1 flex-col gap-2'>
          <span className='text-title-default line-clamp-1 text-lg font-semibold'>
            {title}
          </span>
          <p className='text-text-default line-clamp-1 flex items-center gap-1 text-sm'>
            {descriptionText}
            <Tooltip>
              <Tooltip.Trigger asChild>
                <button
                  className='border-brand-default flex h-4 w-4 items-center justify-center rounded-full border'
                  type='button'
                >
                  <IconQuestionMark size={14} className='text-brand-default' />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content sideOffset={5}>
                <p>
                  A descrição do sabor do item será exibida conforme as
                  seguintes condições:
                </p>
                <p>
                  1. Se você cadastrar uma descrição na aba{' '}
                  <strong>&quot;detalhes&quot;</strong> e não inserir uma
                  descrição específica para o sabor, será exibida a descrição da
                  aba <strong>&quot;detalhes&quot;</strong>.
                </p>
                <p>
                  2. Se você cadastrar uma descrição somente na aba{' '}
                  <strong>&quot;sabores&quot;</strong>, essa descrição será
                  exibida para o cliente.
                </p>
                <p>
                  3. Se você cadastrar descrições em ambas as abas, será exibida
                  a descrição da aba <strong>&quot;sabores&quot;</strong>.
                </p>
                <p>
                  4. Se nenhuma descrição for cadastrada, nenhuma informação
                  será exibida.
                </p>
                <p>
                  <strong>OBS:</strong> Esse recurso permite definir uma
                  descrição detalhada e personalizada para cada sabor.
                </p>
                <Tooltip.Arrow className='fill-title-default' />
              </Tooltip.Content>
            </Tooltip>
          </p>
          <div className='text-title-default flex items-center gap-1 text-sm font-semibold'>
            {formatCurrency(priceValue / 100, 'to-real')}
            <Tooltip>
              <Tooltip.Trigger asChild>
                <button
                  className='border-brand-default flex h-4 w-4 items-center justify-center rounded-full border'
                  type='button'
                >
                  <IconQuestionMark size={14} className='text-brand-default' />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content sideOffset={5}>
                <p>
                  O valor do sabor do item será exibida conforme as seguintes
                  condições:
                </p>
                <p>
                  1. Se você cadastrar um valor na aba{' '}
                  <strong>&quot;detalhes&quot;</strong> e não inserir um valor
                  específico para o sabor, será exibida o valor da aba{' '}
                  <strong>&quot;detalhes&quot;</strong>.
                </p>
                <p>
                  2. Se você cadastrar valor em ambas as abas, será exibido o
                  valor da aba <strong>&quot;sabores&quot;</strong>.
                </p>
                <Tooltip.Arrow className='fill-title-default' />
              </Tooltip.Content>
            </Tooltip>
          </div>
        </div>
        <div className='flex items-center gap-1 text-center'>
          <div className='bg-brand-default rounded-full px-2 py-1 text-center text-xs text-white'>
            {label}
          </div>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <button
                className='border-brand-default flex h-4 w-4 items-center justify-center rounded-full border'
                type='button'
              >
                <IconQuestionMark size={14} className='text-brand-default' />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={5}>
              <p>
                Este texto será exibido no botão que o usuário irá clicar na
                tela de visualização de detalhes do prato.
              </p>
              <Tooltip.Arrow className='fill-title-default' />
            </Tooltip.Content>
          </Tooltip>
        </div>
        <div className='flex items-center gap-2.5'>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <IconCameraUp
                size={24}
                className='text-title-secondary cursor-pointer'
                onClick={() => handleOpenModalImage(id)}
              />
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={5}>
              Atualizar imagens
              <Tooltip.Arrow className='fill-title-default' />
            </Tooltip.Content>
          </Tooltip>

          <Tooltip>
            <Tooltip.Trigger asChild>
              <IconEdit
                size={24}
                className='text-title-secondary cursor-pointer'
                onClick={() => setEditItem(id)}
              />
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={5}>
              Editar sabor
              <Tooltip.Arrow className='fill-title-default' />
            </Tooltip.Content>
          </Tooltip>

          <Tooltip>
            <Tooltip.Trigger asChild>
              <IconTrash
                size={24}
                className='text-title-secondary cursor-pointer'
                onClick={() => handleDeleteItem(id)}
              />
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={5}>
              Deletar sabor
              <Tooltip.Arrow className='fill-title-default' />
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
