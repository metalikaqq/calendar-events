import { IUser } from "../../../models/IUser";

export interface AuthState {
  isAuth: boolean;
  user: IUser | null;
  users: IUser[];
  isLoading: boolean;
  error: string;

  isLoginError: boolean;
  isRegistrationError: boolean;

  isLoginPending: boolean,
  isRegistrationPending: boolean,

  isLoginSuccess: boolean,
  isRegistrationSuccess: boolean,
}
