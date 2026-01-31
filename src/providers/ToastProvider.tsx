import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import type { ToastType } from '../contexts/ToastContext';

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
  }>>([]);

  const addToast = useCallback((message: string, type: ToastType, duration = 5000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    addToast(message, 'success', duration);
  }, [addToast]);

  const error = useCallback((message: string, duration?: number) => {
    addToast(message, 'error', duration);
  }, [addToast]);

  const info = useCallback((message: string, duration?: number) => {
    addToast(message, 'info', duration);
  }, [addToast]);

  const warning = useCallback((message: string, duration?: number) => {
    addToast(message, 'warning', duration);
  }, [addToast]);

  return (
    <ToastContext.Provider 
      value={{ 
        toasts, 
        addToast, 
        removeToast, 
        success, 
        error, 
        info, 
        warning 
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};