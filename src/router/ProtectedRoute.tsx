import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    const fetchUserGroups = useCallback(async () => {
      setIsLoading(true);
      try {
        const { tokens } = await fetchAuthSession();
        const userGroups = tokens?.accessToken.payload["cognito:groups"] as string[] || [];
        setGroups(userGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
        setGroups([]);  // Clear groups on error
      } finally {
        setIsLoading(false);
      }
    }, []);
    useEffect(() => {
      fetchUserGroups();
    }, [fetchUserGroups]);
// const { groups, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  if (!groups.some(role => allowedRoles.includes(role))) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
