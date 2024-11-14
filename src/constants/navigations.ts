const mainNavigations = {
  HOME: 'Home',
  FIND: 'Find',
} as const;

const authNaviagtions = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  SEARCH_LOCATION: 'SearchLocation',
  LOCATION_START: 'LocationStart',
  LOCATION_END: 'LocationEnd',
  ROUTE_RESULT: 'RouteResult',
  MAP_RESULT: 'MapResult',
} as const;

export {mainNavigations, authNaviagtions, mapNavigations};
