import { ButtonIconProps, ButtonProps } from './button.types';

function Button({
  family = 'primary',
  size = 'md',
  fullSize = false,
  ...props
}: ButtonProps) {
  return (
    <button
      data-family={family}
      data-size={size}
      data-fullsize={fullSize ? 'true' : 'false'}
      className='
        flex items-center cursor-pointer justify-center gap-2 rounded-lg font-medium transition duration-300 ease-in-out disabled:opacity-40

        data-[fullsize=true]:w-full

        data-[size=sm]:h-10 data-[size=sm]:px-4
        data-[size=md]:h-11 data-[size=md]:px-5
        data-[size=lg]:h-14 data-[size=lg]:px-5
        data-[family=tertiary]:!px-0

        data-[family=primary]:bg-brand-default data-[family=primary]:text-white data-[family=primary]:hover:bg-brand-hover
        data-[family=secondary]:bg-white data-[family=secondary]:text-brand-default data-[family=secondary]:border data-[family=secondary]:border-brand-default data-[family=secondary]:hover:bg-[#3F4D54]/6
        data-[family=tertiary]:bg-white data-[family=tertiary]:text-brand-default data-[family=tertiary]:hover:text-button-hover
      '
      {...props}
    />
  );
}

export function ButtonIcon({ ...props }: ButtonIconProps) {
  return <span className='flex items-center' {...props} />;
}

Button.Icon = ButtonIcon;
export { Button };
