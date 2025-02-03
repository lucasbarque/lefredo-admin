import { IconPlus } from '@tabler/icons-react';

import { Button } from '@components/inputs/button';
import { ToggleSwitch } from '@components/inputs/toggle-switch';

export function CategoryList() {
  return (
    <div className='border border-line p-6 rounded-md'>
      <div className='flex items-center justify-between'>
        <div className='font-bold text-[22px] text-title-default'>Salgados</div>
        <div className='flex items-center gap-6'>
          <Button
            leftIcon={<IconPlus size={16} />}
            family='secondary'
            size='sm'
          >
            Adicionar item
          </Button>
          <ToggleSwitch label='Ativado' id='teste' />
        </div>
      </div>
    </div>
  );
}
