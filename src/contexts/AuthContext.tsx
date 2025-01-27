import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// import { useSession } from '@hooks/network/useSession';
import { LoadingStatesEnum } from '@enums/loading-states.enum';

export const AuthContext = createContext<IContext>({} as IContext);

export interface IAuthProvider {
  children: ReactNode;
}

export interface IContext {
  // user: IUser | null;
  isAuthenticated: boolean;
  isBlocked: boolean;
  loadingState: LoadingStatesEnum;
  signOut: () => void;
  // setUser: (user: IUser) => void;
  refreshSession: () => void;
  signIn: (
    email: string,
    password: string
  ) => Promise<void | AuthenticateResponseDTO>;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  // const { getSession, authenticate, signOut: signOutApp } = useSession();

  // const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [checkLoggedUserLoading, setCheckLoggedUserLoading] = useState(true);
  // const [isBlocked, setIsBlocked] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingStatesEnum>(
    LoadingStatesEnum.STAND_BY
  );

  async function signIn(email: string, password: string) {
    console.log({ email, password });
    // const response = await authenticate({ email, password });

    // if (response?.user) {
    // setUser({
    //   ...response.user,
    //   token: response.token.token,
    // });
    // setIsAuthenticated(true);
    // localStorage.setItem(
    //   LocalStorageKeys.token,
    //   JSON.stringify(response.token.token)
    // );
    // }

    // if (response?.status === 403) {
    //   setIsBlocked(true);
    //   return response;
    // }
  }

  async function signOut() {
    // await signOutApp();
    // setUser(null);
    setIsAuthenticated(false);
    localStorage.clear();
    sessionStorage.clear();
  }

  async function refreshSession() {
    // const data = await getSession();
    // if (data?.user) {
    //   setUser({
    //     ...data.user,
    //     token: data.token.token,
    //   });
    // }
  }

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.token);
    if (token) {
      setIsAuthenticated(true);
      (async () => {
        // const data = await getSession();
        // if (data?.user) {
        //   setUser({
        //     ...data.user,
        //     token: data.token.token,
        //   });
        // }
      })();
    }
    setLoadingState(LoadingStatesEnum.DONE);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        // user,
        signIn,
        signOut,
        // setUser,
        isAuthenticated,
        isBlocked,
        loadingState,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
