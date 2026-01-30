import { type RouteObject } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Users from '../pages/dashboard/Users';
import UserDetails from '../pages/dashboard/UserDetails';
import DashboardLayout from '../components/layouts/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { routePaths } from './route-paths';
import Dashboard from '../pages/dashboard/Dashboard';

export const routes: RouteObject[] = [
  {
    path: routePaths.auth.login,
    element: <Login />,
  },
  {
    path: routePaths.dashboard.home,
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { 
        index: true,
        element: <Dashboard />,
      },
      {
        path: routePaths.dashboard.users,
        element: <Users />,
      },
      {
        path: '/dashboard/users/:id',
        element: <UserDetails />,
      },
    ],
  },
];

export { routePaths };