import React from 'react';
import { usePermission } from '../hooks/usePermission';

/**
 * PermissionGuard Component
 * Conditionally renders children based on user permissions.
 * @param {Object} props
 * @param {string} props.max - The required permission to view the content.
 * @param {React.ReactNode} props.children - The content to render if allowed.
 * @param {React.ReactNode} props.fallback - Optional content to render if denied.
 */
const PermissionGuard = ({ required, children, fallback = null }) => {
  const hasPermission = usePermission(required);

  if (hasPermission) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};

export default PermissionGuard;
