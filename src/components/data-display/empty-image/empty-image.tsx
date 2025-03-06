import { IconCamera } from '@tabler/icons-react';

import { EmptyImageProps } from './empty-image.types';

export function EmptyImage({ size = 'md' }: EmptyImageProps) {
  const iconSizes = {
    sm: 24,
    md: 32,
  };
  return (
    <div
      data-size={size}
      className='border-line flex items-center justify-center rounded-2xl border border-dashed data-[size=md]:h-[90px] data-[size=md]:w-[90px] data-[size=sm]:h-16 data-[size=sm]:w-16'
    >
      <IconCamera size={iconSizes[size]} className='text-border-default' />
    </div>
  );
}
