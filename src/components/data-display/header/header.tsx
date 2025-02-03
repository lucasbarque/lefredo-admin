import { HeaderProps } from './header.types';

export function Header({ title, description }: HeaderProps) {
  return (
    <div>
      <h2 className='font-extrabold text-[1.75rem] text-title-default mb-3'>
        {title}
      </h2>
      {description && (
        <p className='text-text-default max-w-[390px] text-lg'>{description}</p>
      )}
    </div>
  );
}
