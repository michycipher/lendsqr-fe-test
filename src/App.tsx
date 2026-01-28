import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/auth';
import Login from './pages/Login';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import DashboardLayout from './components/DashboardLayout';
import './styles/main.scss';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Navigate to="/dashboard/users" replace />
              </DashboardLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/users" 
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/users/:id" 
          element={
            <PrivateRoute>
              <DashboardLayout>
                <UserDetails />
              </DashboardLayout>
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;