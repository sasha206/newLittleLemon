import { createContext, useContext, useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

interface AuthContextType {
  groups: string[];
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserGroups() {
      try {
        const { tokens } = await fetchAuthSession();
        const groups = tokens?.accessToken.payload["cognito:groups"] as string[] || [];
        setGroups(groups);
      } catch (error) {
        console.error("Ошибка при получении групп:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserGroups();
  }, []);

  return (
    <AuthContext.Provider value={{ groups, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
};
