import { IUser } from '@contexts/AuthContext';

export type SignInRequestAPI = {
  data: {
    email: string;
    password: string;
  };
};

export type SignInResponseAPI = {
  token: string;
  user: IUser;
};
