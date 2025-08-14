import { ReactNode, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext, AuthData, AuthContextType } from "./AuthContext";
import { api } from "@/lib/api";
import { UserProfile } from "@/types/userProfile"; // adjust path if needed

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

  const [user, setUser] = useState<AuthData | null>(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        return jwtDecode<AuthData>(storedToken);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!token);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await api.getProfile();
      console.log("Fetched profile:", data);
      setProfile(data.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
    try {
      const decoded = jwtDecode<AuthData>(newToken);
      setUser(decoded);
    } catch {
      console.error("Invalid token");
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<AuthData>(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
          fetchProfile();
        }
      } catch {
        logout();
      }
    }
  }, [token, fetchProfile]);

  const contextValue: AuthContextType = {
    user,
    profile,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    role: user?.role,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
