import { ReactNode, createContext, useEffect, useState } from 'react';

import { MeAPI } from '@adapters/authentication/me';
import { SignInAPI } from '@adapters/authentication/sign-in';
import { SignOutAPI } from '@adapters/authentication/sign-out';

import { LOADING_STATE } from '@enums/loading-states.enum';

import { LOCAL_STORAGE_KEYS } from '../constants/storage/keys';

export const AuthContext = createContext<IContext>({} as IContext);

export interface IAuthProvider {
  children: ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN';
}

export interface IContext {
  user: IUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<{ redirect: string }>;
  setUser: (user: IUser) => void;
  isAuthenticated: boolean;
  token: string | null;
  loadingState: LOADING_STATE;
  getDataUser: () => void;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.token) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingState, setLoadingState] = useState<LOADING_STATE>(
    LOADING_STATE.STAND_BY
  );

  async function getDataUser() {
    const { data } = await MeAPI();

    if (data) {
      setIsAuthenticated(true);
      setUser(data);
    }

    setLoadingState(LOADING_STATE.DONE);
  }

  async function signIn(email: string, password: string) {
    const { data } = await SignInAPI({
      data: {
        email: email.toLowerCase().trim(),
        password,
      },
    });

    if (data?.user) {
      setUser(data.user);
      setIsAuthenticated(true);

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.token,
        JSON.stringify(data.token)
      );
      setToken(data.token);
    }
  }

  async function signOut() {
    await SignOutAPI();
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);

    return {
      redirect: '/welcome',
    };
  }

  useEffect(() => {
    if (!token) setLoadingState(LOADING_STATE.DONE);

    if (token) getDataUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        setUser,
        isAuthenticated,
        loadingState,
        getDataUser,
        token,
      }}
    >
      {loadingState === LOADING_STATE.DONE ? children : <h2>Loading...</h2>}
    </AuthContext.Provider>
  );
};
