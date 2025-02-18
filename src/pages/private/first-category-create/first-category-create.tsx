import { IconDeviceMobileSearch, IconPlus } from '@tabler/icons-react';

import { CategoryItem } from '@components/data-display/category-item';
import { Header } from '@components/data-display/header';
import { Button } from '@components/inputs/button';
import { Input } from '@components/inputs/input';

import { useFirstCategoryCreate } from './use-first-category-create';

export function FirstCategoryCreate() {
  const { control, errors } = useFirstCategoryCreate();

  return (
    <div className='h-[calc(100vh-80px)] w-full overflow-y-scroll p-6'>
      <div className='w-full'>
        <Header
          title='Cardápio'
          description=' Este é o seu cardápio. Aqui você define quais os itens seus clientes
        poderão visualizar no app.'
        />
        <div className='flex w-full gap-16'>
          <div>
            <div className='text-title-default pt-6 text-2xl font-bold'>
              Vamos criar as
              <br />
              categorias de produtos
            </div>
            <p className='text-text-default max-w-[464px] pt-3 text-lg'>
              Elas ajudam na organização dos produtos em grupos, tornando mais
              fácil para seus clientes encontrarem o que procuram na sua loja.
            </p>
            <div className='mt-5 flex flex-col gap-2'>
              <CategoryItem />
              <CategoryItem />
              <CategoryItem />
              <CategoryItem />

              <Button family='tertiary'>
                <Button.Icon>
                  <IconPlus size={16} />
                </Button.Icon>
                Criar outra categoria
              </Button>
            </div>

            <form className='mt-5 flex w-full max-w-[464px] flex-col items-end'>
              <Input
                id='category'
                name='category'
                control={control}
                error={errors.category?.message}
                placeholder='Digite o nome da categoria'
              />
              <div className='flex gap-2.5 pt-4'>
                <Button family='secondary' size='sm'>
                  Cancelar
                </Button>
                <Button size='sm'>Salvar</Button>
              </div>
            </form>
          </div>
          <div className='flex flex-col gap-4 pt-6'>
            <img
              className='drop-shadow-mobile h-[625px] w-[282px]'
              src='/assets/images/preview-2.png'
              alt=''
            />
            <div className='border-line flex w-[280px] items-center gap-2 rounded-md border bg-gray-400 px-6 py-3 text-[10px] font-bold'>
              <IconDeviceMobileSearch size={24} className='shrink-0' />É mais ou
              menos assim que essas informações ficam no app do Le Fredo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
