export type SignInRequestAPI = {
  data: {
    email: string;
    password: string;
  };
};

export type SignInResponseAPI = {
  token: {
    type: 'bearer';
    token: string;
  };
  user: {
    email: string;
  };
};
