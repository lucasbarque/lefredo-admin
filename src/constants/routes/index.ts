export type ROUTE =
  | 'INDEX'
  | 'LOGIN'
  | 'HOME'
  | 'FIRST_STEPS'
  | 'FIRST_CATEGORY_CREATE';

export const DEFAULT_ROUTES: { [key in ROUTE]: string } = {
  INDEX: '/',
  LOGIN: '/login',
  HOME: '/home',
  FIRST_STEPS: '/first-steps',
  FIRST_CATEGORY_CREATE: '/first-category-create',
};
