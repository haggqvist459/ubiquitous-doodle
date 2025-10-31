export const ROUTES = {
  HOME: '/',
  ADMIN: '/admin',
  ERROR: '/*',
  DETAILS: "/recipes/:id",
  DETAILS_PAGE: '/recipes/',
  PROFILE: '/profile'
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


export const LOCALSTORAGE_KEYS = { 

} as const;