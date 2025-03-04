import Link from 'next/link';

import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { StepperBar } from '@/components/inputs/stepper-bar';

import { PageAddItemPhotosParams } from './add-item-photos.types';
import { FormUploadImages } from './form-upload-images';

export default async function PageAddItemPhotos({
  params,
}: PageAddItemPhotosParams) {
  const { dishId } = await params;

  return (
    <>
      <div className='flex items-end justify-between px-6 pt-6'>
        <Header
          title='Adicionar item'
          backButton={{
            title: '',
            children: <Link href={`/edit-item-details/${dishId}`}>Voltar</Link>,
          }}
        />
        <StepperBar currentStepperIndex={1} />
      </div>

      <FormUploadImages />

      <div className='border-border-default mt-auto flex justify-end gap-4 border-t px-8 py-4'>
        <Link href='/menu-list'>
          <Button size='md' family='secondary'>
            Cancelar
          </Button>
        </Link>
        <Link href={`/add-item-additionals/${dishId}`}>
          <Button size='md'>Continuar</Button>
        </Link>
      </div>
    </>
  );
}
