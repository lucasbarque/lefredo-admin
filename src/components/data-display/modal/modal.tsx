import React from 'react';

import * as DialogPrimitive from '@radix-ui/react-alert-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';

import { Button } from '@/components/inputs/button';

export type ModalProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  overlay?: boolean;
};

const Modal = ({ children, overlay = true, ...props }: ModalProps) => (
  <DialogPrimitive.Root {...props}>
    <DialogPrimitive.Portal>
      {overlay && (
        <DialogPrimitive.Overlay className='fixed inset-0 bg-gray-700/48 backdrop-blur-sm' />
      )}
      {children}
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);

const ModalWrapper = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentProps<typeof DialogPrimitive.Content> & {
    showBackButton?: boolean;
    title?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    hideCloseButton?: boolean;
    hideActionButton?: boolean;
    closeButtonText?: string;
    actionButtonText?: string;
    actionButtonFunction?: () => void;
    closeButtonFunction?: () => void;
  }
>(
  (
    {
      showBackButton = false,
      title,
      description,
      size = 'sm',
      hideCloseButton = false,
      hideActionButton = false,
      closeButtonText = 'Fechar',
      actionButtonText = 'Salvar',
      actionButtonFunction,
      closeButtonFunction,
      children,
      ...props
    },
    forwardedRef
  ) => (
    <DialogPrimitive.Content
      {...props}
      className={clsx(
        {
          'max-w-[388px]': size === 'sm',
          'max-w-[592px]': size === 'md',
          'max-w-[796px]': size === 'lg',
        },
        'fixed top-1/2 left-1/2 w-full max-w-[592px] min-w-[388px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-400 bg-white p-8'
      )}
      ref={forwardedRef}
    >
      {showBackButton && (
        <DialogPrimitive.Action asChild>
          <div className='absolute top-6 left-8'>
            <Button>voltar</Button>
          </div>
        </DialogPrimitive.Action>
      )}
      <DialogPrimitive.Cancel asChild>
        <div className='absolute top-6 right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-slate-200 transition-colors duration-300 hover:bg-gray-400/50'>
          <IconX size={24} className='text-gray-600' />
        </div>
      </DialogPrimitive.Cancel>
      {title && (
        <DialogPrimitive.Title asChild>
          <h3 className='text-title-secondary font-semibold'>{title}</h3>
        </DialogPrimitive.Title>
      )}
      <DialogPrimitive.Description asChild>
        {description ? (
          <p
            className='font-nunito-sans text-body-2-regular text-gray-7 pt-2'
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <VisuallyHidden.Root>{description}</VisuallyHidden.Root>
        )}
      </DialogPrimitive.Description>
      {children}
      {(!hideActionButton || !hideActionButton) && (
        <div className='mt-10 flex justify-end gap-4'>
          {!hideCloseButton && (
            <DialogPrimitive.Cancel asChild>
              <div className={clsx({ 'flex w-full flex-col': size === 'sm' })}>
                <Button
                  size='md'
                  family='secondary'
                  onClick={closeButtonFunction}
                >
                  {closeButtonText}
                </Button>
              </div>
            </DialogPrimitive.Cancel>
          )}

          {!hideActionButton && (
            <div className={clsx({ 'flex w-full flex-col': size === 'sm' })}>
              <Button size='md' onClick={actionButtonFunction}>
                {actionButtonText}
              </Button>
            </div>
          )}
        </div>
      )}
    </DialogPrimitive.Content>
  )
);

Modal.Wrapper = ModalWrapper;

export default Modal;
