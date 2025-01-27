import { toast as Toast, ToastPosition, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@styles/toast.css';

interface ToastProps {
  message: string;
  timeout?: number;
  type?: TypeOptions;
  position?: ToastPosition;
}

export const useToast = () => {
  const toast = ({
    message,
    type = 'error',
    timeout = 3500,
    position = 'bottom-center',
  }: ToastProps) => {
    Toast(message, {
      position,
      autoClose: timeout,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      type,
    });
  };
  return {
    toast,
  };
};
