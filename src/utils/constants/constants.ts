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
    labelKey: 'home'
  },
  ADMIN: {
    route: ROUTES.ADMIN,
    id: 2,
    labelKey: 'admin'
  },
  PROFILE: {
    route: ROUTES.PROFILE,
    id: 3,
    labelKey: 'profile'
  }
} as const ;


export const LOCALSTORAGE_KEYS = { 
  LANGUAGE_OPTION: 'languageOption'
} as const;