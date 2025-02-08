import { Navigate } from 'react-router-dom';
import { UserRole, UserRoles } from '../types/roles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRoles;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const userRolesString = localStorage.getItem('userRoles');
  console.log('User roles string from localStorage:', userRolesString);
  
  if (!userRolesString) {
    console.log('No roles found in localStorage');
    return <Navigate to="/login" replace />;
  }

  const userRoles: UserRoles = JSON.parse(userRolesString);
  console.log('Parsed user roles:', userRoles);
  console.log('Allowed roles:', allowedRoles);

  const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role));
  console.log('Has allowed role:', hasAllowedRole);

  if (!hasAllowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
