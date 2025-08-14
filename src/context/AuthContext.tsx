import { createContext } from "react";
import { UserProfile } from "@/types/userProfile";

export interface AuthData {
  userId: number;
  exp: number;
  iat: number;
  role: string;
}

export interface AuthContextType {
  user: AuthData | null;
  profile: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  role?: string; // ✅ Add this
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
