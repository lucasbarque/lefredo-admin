export type ROUTE =
  | 'INDEX'
  | 'LOGIN'
  | 'HOME'
  | 'FIRST_STEPS'
  | 'FIRST_CATEGORY_CREATE'
  | 'MENU_LIST';

export const DEFAULT_ROUTES: { [key in ROUTE]: string } = {
  INDEX: '/',
  LOGIN: '/login',
  HOME: '/home',
  FIRST_STEPS: '/first-steps',
  FIRST_CATEGORY_CREATE: '/first-category-create',
  MENU_LIST: '/menu-list',
};
