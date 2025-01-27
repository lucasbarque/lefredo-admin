import { ReactNode, createContext, useEffect, useState } from 'react';

import { SignOutAPI } from '@adapters/authentication/sign-out';

import { LOADING_STATE } from '@enums/loading-states.enum';

import { SignInApi } from '../adapters/authentication/sign-in';
import { LOCAL_STORAGE_KEYS } from '../constants/storage/keys';

export const AuthContext = createContext<IContext>({} as IContext);

export interface IAuthProvider {
  children: ReactNode;
}

interface IUser {}

export interface IContext {
  user: IUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<{ redirect: string }>;
  setUser: (user: IUser) => void;
  isAuthenticated: boolean;
  token: string | null;
  isBlocked: boolean;
  loadingState: LOADING_STATE;
  getDataUser: () => void;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.token) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [loadingState, setLoadingState] = useState<LOADING_STATE>(
    LOADING_STATE.STAND_BY
  );

  async function getDataUser() {
    // const { data } = await GetSessionApi({
    //   affiliatedId: affiliated.id,
    // });

    // if (data?.token) {
    //   setIsAuthenticated(true);
    //   setUser({
    //     ...data.user,
    //     plans: data.plans,
    //   });
    // }

    setLoadingState(LOADING_STATE.DONE);
  }

  async function signIn(email: string, password: string) {
    const { data } = await SignInApi({
      data: {
        email: email.toLowerCase().trim(),
        password,
      },
    });
    if (!data) {
      setIsBlocked(true);
      return;
    }

    if (data?.user) {
      setUser(data.user);
      setIsAuthenticated(true);

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.user,
        JSON.stringify(data.user.email)
      );

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.token,
        JSON.stringify(data.token.token)
      );
      setToken(data.token.token);
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
        isBlocked,
        loadingState,
        getDataUser,
        token,
      }}
    >
      {loadingState === LOADING_STATE.DONE ? children : <h2>Loading...</h2>}
    </AuthContext.Provider>
  );
};
