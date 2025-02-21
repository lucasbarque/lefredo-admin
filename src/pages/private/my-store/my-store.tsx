import { Header } from '@components/data-display/header';
import { Button } from '@components/inputs/button';
import { Input } from '@components/inputs/input';
import { InputEditor } from '@components/inputs/input-editor';
import { UploadSingleImage } from '@components/inputs/upload-single-image/upload-single-image';

import { useMyStore } from './use-my-store';

export function MyStore() {
  const { control, errors, imageData, setImageData } = useMyStore();

  return (
    <div className='h-[calc(100vh-80px)] w-full overflow-y-scroll p-6'>
      <div className='w-full'>
        <Header title='Informações da Loja' />

        <form className='max-w-[640px] space-y-2 pt-6'>
          <Input
            id='name'
            name='name'
            label='Nome do item'
            control={control}
            error={errors.name?.message}
            placeholder='Exemplo: X Salada'
          />

          <InputEditor
            id='welcome_message'
            name='welcome_message'
            label='Mensagem de boas-vindas'
            control={control}
            placeholder='Exemplo: Olá, nosso cardápio foi elaborado com muito carinho pra você.'
            error={errors.welcome_message?.message}
            isOptional
            maxLength={500}
          />

          <UploadSingleImage
            label='Adicione uma imagem'
            currentImage={imageData}
            onSubmit={setImageData}
            cropConfig={{ width: 300, height: 300 }}
          />

          <div className='mt-4'>
            <Button type='submit'>Salvar alterações</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
