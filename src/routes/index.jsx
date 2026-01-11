// ==================== ROLE-BASED ROUTES ====================
// routes/index.jsx

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { UnauthorizedPage } from '../pages/public/Unauthorized';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
// import Books from '../pages/Books';
// import Borrowings from '../pages/Borrowings';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';

// Roles
import { ROLES } from '../config/roles';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },

  // Protected routes
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },

      // Routes accessible by all authenticated users
      {
        element: <ProtectedRoute allowedRoles={Object.values(ROLES)} />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          // {
          //   path: 'books',
          //   element: <Books />,
          // },
          // {
          //   path: 'borrowings',
          //   element: <Borrowings />,
          // },
        ],
      },

      // Admin and Manager only
      {
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,
        children: [
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'reports',
            element: <Reports />,
          },
        ],
      },

      // Admin only
      {
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
        children: [
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },

      // Librarian and above
      {
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.LIBRARIAN]} />,
        children: [
          {
            path: 'borrowings/manage',
            element: <div>Manage Borrowings</div>,
          },
        ],
      },
    ],
  },

  // 404 route
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

