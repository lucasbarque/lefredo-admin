export type ROUTE = 'INDEX' | 'LOGIN' | 'HOME';

export const DEFAULT_ROUTES: { [key in ROUTE]: string } = {
  INDEX: '/',
  LOGIN: '/login',
  HOME: '/home',
};
