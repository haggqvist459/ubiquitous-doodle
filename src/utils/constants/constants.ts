export const ROUTES = {
  HOME: '/',
  ADMIN: '/admin',
  ERROR: '/*',
} as const;

export const NAVBAR_OPTIONS = {
  HOME: {
    route: ROUTES.HOME,
    id: 1,
    text: 'Home'
  },
  ADMIN: {
    route: ROUTES.ADMIN,
    id: 2,
    text: 'Admin'
  },
} as const ;


export const DB_TABLES = {

} as const;

export const DB_COLUMNS = {

} as const;

export const LOCALSTORAGE_KEYS = { 

} as const;