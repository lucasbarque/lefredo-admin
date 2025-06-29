import { LoadingSpinner } from '@/components/data-display/loading-spinner/loading-spinner';

import { ButtonIconProps, ButtonProps } from './button.types';

function Button({
  family = 'primary',
  size = 'md',
  fullSize = false,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      data-family={family}
      data-size={size}
      data-fullsize={fullSize ? 'true' : 'false'}
      className='data-[family=primary]:bg-brand-default group data-[family=primary]:hover:bg-brand-hover data-[family=secondary]:text-brand-default data-[family=secondary]:border-brand-default data-[family=tertiary]:text-brand-default data-[family=tertiary]:hover:text-button-hover flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition duration-300 ease-in-out select-none disabled:opacity-40 data-[family=primary]:text-white data-[family=secondary]:border data-[family=secondary]:bg-white data-[family=secondary]:hover:bg-[#3F4D54]/6 data-[family=tertiary]:bg-white data-[family=tertiary]:!px-0 data-[fullsize=true]:w-full data-[size=lg]:h-14 data-[size=lg]:px-5 data-[size=md]:h-11 data-[size=md]:px-5 data-[size=sm]:h-10 data-[size=sm]:px-4'
      {...props}
    >
      {isLoading && (
        <LoadingSpinner
          className='group-data-[size=lg]:w-7 group-data-[size=md]:w-6 group-data-[size=sm]:w-4'
          family={family}
        />
      )}
      {props.children}
    </button>
  );
}

export function ButtonIcon({ ...props }: ButtonIconProps) {
  return <span className='flex items-center' {...props} />;
}

Button.Icon = ButtonIcon;
export { Button };
