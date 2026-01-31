import { useEffect } from 'react';
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiInfo, 
  FiX 
} from 'react-icons/fi';
import './Toast.scss';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = ({ id, message, type, duration = 5000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle />;
      case 'error':
        return <FiAlertCircle />;
      case 'info':
        return <FiInfo />;
      case 'warning':
        return <FiAlertCircle />;
      default:
        return <FiInfo />;
    }
  };

  return (
    <div className={`toast toast--${type}`} role="alert">
      <div className="toast__icon">{getIcon()}</div>
      <div className="toast__message">{message}</div>
      <button 
        className="toast__close" 
        onClick={() => onClose(id)}
        aria-label="Close notification"
      >
        <FiX />
      </button>
    </div>
  );
};

export default Toast;