'use client';

import {
  IconCandyOff,
  IconFlame,
  IconLeaf,
  IconMeatOff,
  IconMilkOff,
  IconPlant2,
  IconSeeding,
  IconSnowflake,
} from '@tabler/icons-react';

import { ClassificationItem } from '@/components/data-display/classification-item/classification-item';
import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { StepperBar } from '@/components/inputs/stepper-bar';

export default function PageAddItemClassification() {
  return (
    <>
      <div className='flex items-end justify-between px-6 pt-6'>
        <Header
          backButton={{ onClick: () => {}, title: 'Voltar' }}
          title='Adicionar item'
        />
        <StepperBar currentStepperIndex={3} />
      </div>

      <div className='p-6'>
        <div className='text-title-default text-2xl font-extrabold'>
          Classificação
        </div>
        <p className='text-text-default'>
          Indique se seu item é adequado a restrições alimentares diversas para
          atrair a atenção de clientes com esse perfil.
        </p>
      </div>

      <div className='grid grid-cols-3 gap-3 px-6'>
        <ClassificationItem
          title='Vegetariano'
          description='Sem carne de nenhum tipo'
          icon={<IconMeatOff />}
        />
        <ClassificationItem
          title='Zero lactose'
          description='Não contém lactose, ou seja, leite e seus derivados'
          icon={<IconMilkOff />}
        />
        <ClassificationItem
          title='Vegano'
          description='Sem produtos de origem animal, como carne, ovo ou leite'
          icon={<IconSeeding />}
        />
        <ClassificationItem
          title='Servido Gelado'
          description='Da geladeira direto para o consumidor'
          icon={<IconSnowflake />}
        />
        <ClassificationItem
          title='Servido Quente'
          description='Produto que acabou de sair do forno'
          icon={<IconFlame />}
          isActive
        />
        <ClassificationItem
          title='Orgânico'
          description='Cultivado sem agrotóxicos, segundo a lei 10.831'
          icon={<IconLeaf />}
        />
        <ClassificationItem
          title='Sem açúcar'
          description='Não contém nenhum tipo de açúcar (cristal, orgânico, mascavo, etc.)'
          icon={<IconCandyOff />}
          isActive
        />
        <ClassificationItem
          title='Natural'
          description='Preparado na hora com frutas frescas'
          icon={<IconPlant2 />}
        />
      </div>

      <div className='border-border-default mt-auto flex justify-end gap-4 border-t px-8 py-4'>
        <Button size='md' family='secondary'>
          Cancelar
        </Button>
        <Button size='md' onClick={() => {}}>
          Continuar
        </Button>
      </div>
    </>
  );
}
