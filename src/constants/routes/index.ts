export type ROUTE = 'INDEX' | 'LOGIN' | 'HOME' | 'FIRST_STEPS';

export const DEFAULT_ROUTES: { [key in ROUTE]: string } = {
  INDEX: '/',
  LOGIN: '/login',
  HOME: '/home',
  FIRST_STEPS: '/first-steps',
};
