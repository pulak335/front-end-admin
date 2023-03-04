// project imports
import { UserProfile } from "./UserDataTypes";

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => void;
  updateProfile: VoidFunction;
};
