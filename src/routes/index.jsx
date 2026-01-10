import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import Users from '../pages/Users';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Integrations from '../pages/Integrations';
import Login from '../pages/Login'; // Import valid login page

import { ROLES } from '../config/roles';

// Auth Pages (Placeholder for now)
const Unauthorized = () => <div>Unauthorized Access</div>;

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      // Protected Routes
      {
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER, ROLES.MANAGER, ROLES.LIBRARIAN, ROLES.STAFF, ROLES.STUDENT]} />, // Allowing all authenticated for common dashboard for now, or refine
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'orders',
            element: <Orders />,
          },
          {
            path: 'reports',
            element: <Reports />,
          },
          {
            path: 'reports/sales',
            element: <Reports />,
          },
          {
            path: 'reports/traffic',
            element: <Reports />,
          },
          {
            path: 'integrations',
            element: <Integrations />,
          },
        ],
      },
      // Admin Only Routes
      {
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
        children: [
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
