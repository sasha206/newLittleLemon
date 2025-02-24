import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

// Define the shape of our authentication context
interface AuthContextType {
  groups: string[];
  isLoading: boolean;
  refreshAuth: () => Promise<void>;  // Method to refresh authentication state
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to update context with user groups
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

  // Load data on initial render
  useEffect(() => {
    fetchUserGroups();
  }, [fetchUserGroups]);

  return (
    <AuthContext.Provider value={{ groups, isLoading, refreshAuth: fetchUserGroups }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
