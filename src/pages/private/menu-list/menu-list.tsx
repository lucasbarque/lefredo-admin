import { IconPlus } from '@tabler/icons-react';

import { CategoryList } from '@components/data-display/category-list';
import { Header } from '@components/data-display/header';
import { Button } from '@components/inputs/button';

const categoriesList = [
  {
    id: '1',
    title: 'Salgados',
    isActive: true,
    items: [
      {
        id: '123',
        title: 'Coxinha de carne',
        price: 1000,
        isActive: true,
        medias: [],
      },
      {
        id: '123343',
        title: 'Coxinha de frango',
        price: 1400,
        isActive: true,
        medias: [
          {
            id: 'sdf123',
            title: 'image-test',
            filename:
              'https://www.cdn-parachute.com.br/IMG-20250113-WA0209.jpg',
          },
        ],
      },
    ],
  },
  {
    id: '121',
    title: 'Doces',
    isActive: true,
    items: [],
  },
];

export function MenuList() {
  return (
    <div className='h-[calc(100vh-80px)] w-full overflow-y-scroll p-6'>
      <Header
        title='Cardápio'
        description='Este é o seu cardápio. Aqui você define quais os itens seus clientes
        poderão visualizar no app.'
      />

      <div className='flex items-center justify-end pt-14'>
        <Button>
          <Button.Icon>
            <IconPlus size={24} />
          </Button.Icon>
          Adicionar categoria
        </Button>
      </div>
      <div>
        <h2 className='text-title-default text-2xl font-medium'>Editar</h2>
        <p className='text-text-default pt-1.5 text-lg'>
          Ative ou pause a exibição dos itens do seu cardápio, altere os preços
        </p>
      </div>
      <div className='flex flex-col gap-6 pt-6'>
        {categoriesList.map((category) => (
          <CategoryList key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
