import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { ToastProvider } from './providers/ToastProvider';
import ToastContainer from './components/Toast/ToastContainer';
import './styles/main.scss';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes />
        <ToastContainer />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;