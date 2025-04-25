import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { InputRadio } from '@/components/inputs/input-radio';

import { RadioSelectCreateFlavorProps } from './add-item-flavors.types';

export function RadioSelectCreateFlavor({
  setCreateVariation,
  createVariation,
  dishFlavors,
}: RadioSelectCreateFlavorProps) {
  const { control } = useForm();

  function handleChangeRadio() {
    if (createVariation && dishFlavors.length > 0) {
      return toast.error(
        'Para desativar a exibição de sabores adicionais, por favor, exclua todos antes.'
      );
    }
    setCreateVariation(!createVariation);
  }

  return (
    <div className='border-brand-border border-line rounded-md border bg-gray-400 p-6'>
      <span className='text-lg font-semibold'>Selecione abaixo</span>
      <div className='mt-2'>
        <InputRadio
          control={control}
          name='select'
          onChangeCapture={handleChangeRadio}
          options={[
            {
              title: 'Não, meu item não possui variação de sabores',
              value: 'false',
            },
            {
              title: 'Sim, meu item tem variação de sabores',
              value: 'true',
            },
          ]}
          selected={String(createVariation)}
        />
      </div>
    </div>
  );
}
