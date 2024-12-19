import Cookies from 'js-cookie';

export const setCookie = (key: string, value: string, expiresInDays = 365) =>
  Cookies.set(key, value, { expires: expiresInDays });

export const getCookie = (key: string) => Cookies.get(key);

export const removeCookie = (key: string) => Cookies.remove(key);
