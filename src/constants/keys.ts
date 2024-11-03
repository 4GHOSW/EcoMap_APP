const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

const GOOGLE_MAP_API_KEY = 'AIzaSyBwxaYRDGBpTyvfhG4Ok_A3e7P2K3phUj8';
const NAVER_CLIENT_ID = 'gtifmv2nof';
const NAVER_CLIENT_SECRET = 'PmIIheK4hUbuBIpNAFZdGrJ4wiXFVOLwrG2TksBo';

export {
  queryKeys,
  storageKeys,
  GOOGLE_MAP_API_KEY,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
};
