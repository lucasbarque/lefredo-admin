import { IconDeviceMobileSearch, IconPlus } from '@tabler/icons-react';

import { CategoryItem } from '@components/data-display/category-item';
import { Header } from '@components/data-display/header';
import { Button } from '@components/inputs/button';
import { Input } from '@components/inputs/input';

import { useFirstCategoryCreate } from './use-first-category-create';

export function FirstCategoryCreate() {
  const { control, errors } = useFirstCategoryCreate();

  return (
    <div className='w-full'>
      <Header
        title='Cardápio'
        description=' Este é o seu cardápio. Aqui você define quais os itens seus clientes
        poderão visualizar no app.'
      />
      <div className='w-full flex gap-16'>
        <div>
          <div className='pt-6 text-2xl font-bold text-title-default'>
            Vamos criar as
            <br />
            categorias de produtos
          </div>
          <p className='pt-3 text-text-default text-lg max-w-[464px]'>
            Elas ajudam na organização dos produtos em grupos, tornando mais
            fácil para seus clientes encontrarem o que procuram na sua loja.
          </p>
          <div className='flex flex-col gap-2 mt-5'>
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <Button leftIcon={<IconPlus size={16} />} family='tertiary'>
              Criar outra categoria
            </Button>
          </div>

          <form className='max-w-[464px] w-full flex flex-col items-end mt-5'>
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
            className='w-[282px] h-[625px] drop-shadow-mobile'
            src='/assets/images/preview-2.png'
            alt=''
          />
          <div className='w-[280px] bg-gray-400 border border-line rounded-md py-3 px-6 text-[10px] font-bold flex items-center gap-2'>
            <IconDeviceMobileSearch size={24} className='shrink-0' />É mais ou
            menos assim que essas informações ficam no app do Le Fredo
          </div>
        </div>
      </div>
    </div>
  );
}
