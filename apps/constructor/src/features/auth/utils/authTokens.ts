import { getCookie, removeCookie } from 'typescript-cookie';

import { tokenNames } from '../constants/tokenNames';

export const authTokens = {
  getAccessToken: () => getCookie(tokenNames.ACCESS),
  getRefreshToken: () => getCookie(tokenNames.REFRESH),
  removeAccessToken: () =>
    removeCookie(tokenNames.ACCESS, {
      path: '/',
    }),
  removeTokens: () => {
    removeCookie(tokenNames.ACCESS, {
      path: '/',
    });
    removeCookie(tokenNames.REFRESH, {
      path: '/',
    });
  },
};
