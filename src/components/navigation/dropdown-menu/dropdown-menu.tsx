import { ReactNode } from 'react';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';

import { MenuItem } from '../menu-item';

type DropdownMenuProps = React.ComponentProps<
  typeof NavigationMenuPrimitive.Root
>;

const DropdownMenu = ({ children, ...rest }: DropdownMenuProps) => {
  return (
    <NavigationMenuPrimitive.Root className='relative z-50' {...rest}>
      <NavigationMenuPrimitive.List className='flex flex-row rounded-lg'>
        {children}
      </NavigationMenuPrimitive.List>

      <div
        className={clsx('absolute flex justify-center right-2 top-4 w-[240px]')}
        style={{
          perspective: '2000px',
        }}
      >
        <NavigationMenuPrimitive.Viewport
          className={clsx(
            'shadow-[0px_18px_21.6px_0px_rgba(0,_0,_0,_0.09)] relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]'
          )}
        />
      </div>
    </NavigationMenuPrimitive.Root>
  );
};
interface DropdownItem {
  title: string;
  icon?: ReactNode;
  linkProps?: NavigationMenuPrimitive.NavigationMenuLinkProps;
}

type DropdownContentProps = React.ComponentProps<
  typeof NavigationMenuPrimitive.Content
> & {
  dropdownItems: DropdownItem[];
  lastDropdownItems?: DropdownItem[];
};
const DropdownContent = ({
  dropdownItems,
  lastDropdownItems,
  ...props
}: DropdownContentProps) => (
  <NavigationMenuPrimitive.Content
    {...props}
    className={clsx(
      'absolute right-0 top-0 w-[240px] rounded-lg border border-line px-2 py-3 '
    )}
  >
    <div>
      <div className='flex w-full flex-col space-y-2'>
        {dropdownItems.map((dropdownItem) => (
          <DropdownMenu.Link key={dropdownItem.title}>
            <MenuItem
              variation='quaternary'
              title={dropdownItem.title}
              icon={dropdownItem?.icon}
            />
          </DropdownMenu.Link>
        ))}
      </div>
      {lastDropdownItems && (
        <>
          <hr className='my-[6px] text-border-default' />
          {lastDropdownItems.map((dropdownItem) => (
            <DropdownMenu.Link
              key={dropdownItem.title}
              {...dropdownItem.linkProps}
            >
              <MenuItem
                variation='quaternary'
                title={dropdownItem.title}
                icon={dropdownItem?.icon}
              />
            </DropdownMenu.Link>
          ))}
        </>
      )}
    </div>
  </NavigationMenuPrimitive.Content>
);

DropdownMenu.Item = NavigationMenuPrimitive.Item;
DropdownMenu.Trigger = NavigationMenuPrimitive.Trigger;
DropdownMenu.Content = DropdownContent;
DropdownMenu.Link = NavigationMenuPrimitive.Link;
export { DropdownMenu };
