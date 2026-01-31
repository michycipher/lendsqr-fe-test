import { createPortal } from 'react-dom';
import Toast from './Toast';
import { useToast } from '../../hooks/useToast';
import './Toast.scss';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return createPortal(
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;