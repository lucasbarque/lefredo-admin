import React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

const Tooltip = ({ children, ...props }: TooltipProps) => (
  <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
);

export type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
> & {
  sideOffset?: number;
};

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 5, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={clsx(
        'bg-title-default max-w-[600px] rounded-md p-2 text-white select-none',
        className
      )}
      {...props}
    >
      {children}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));

TooltipContent.displayName = 'TooltipContent';

Tooltip.Trigger = TooltipPrimitive.Trigger;
Tooltip.Content = TooltipContent;
Tooltip.Arrow = TooltipPrimitive.Arrow;

export default Tooltip;
