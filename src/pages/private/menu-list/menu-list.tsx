import { IconPlus } from '@tabler/icons-react';

import { CategoryList } from '@components/data-display/category-list';
import { Header } from '@components/data-display/header';
import { Button } from '@components/inputs/button';

export function MenuList() {
  return (
    <div>
      <Header
        title='Cardápio'
        description='Este é o seu cardápio. Aqui você define quais os itens seus clientes
        poderão visualizar no app.'
      />
      <div className='pt-14 flex items-center justify-end'>
        <Button leftIcon={<IconPlus size={24} />}>Adicionar categoria</Button>
      </div>
      <div>
        <h2 className='text-2xl text-title-default font-medium'>Editar</h2>
        <p className='pt-1.5 text-text-default text-lg'>
          Ative ou pause a exibição dos itens do seu cardápio, altere os preços
        </p>
      </div>
      <div className='pt-6'>
        <CategoryList />
      </div>
    </div>
  );
}
