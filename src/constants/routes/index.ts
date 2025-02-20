export type ROUTE =
  | 'INDEX'
  | 'LOGIN'
  | 'HOME'
  | 'FIRST_STEPS'
  | 'FIRST_CATEGORY_CREATE'
  | 'MENU_LIST'
  | 'CREATE_CATEGORY'
  | 'ADD_ITEM_DETAILS'
  | 'ADD_ITEM_PHOTOS'
  | 'ADD_ITEM_ADDITIONALS'
  | 'ADD_ITEM_CLASSIFICATION'
  | 'ADD_ITEM_FLAVORS';

export const DEFAULT_ROUTES: { [key in ROUTE]: string } = {
  INDEX: '/',
  LOGIN: '/login',
  HOME: '/home',
  FIRST_STEPS: '/first-steps',
  FIRST_CATEGORY_CREATE: '/first-category-create',
  MENU_LIST: '/menu-list',
  CREATE_CATEGORY: '/create-category',
  ADD_ITEM_DETAILS: '/add-item-details',
  ADD_ITEM_PHOTOS: '/add-item-photos',
  ADD_ITEM_ADDITIONALS: '/add-item-additionals',
  ADD_ITEM_CLASSIFICATION: '/add-item-classification',
  ADD_ITEM_FLAVORS: '/add-item-flavors',
};
