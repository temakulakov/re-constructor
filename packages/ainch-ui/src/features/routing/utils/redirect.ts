import Router from 'next/navigation';

import { getRoute } from './getRoute';
import { Route, Params } from '../constants/routes';

type RedirectParams = {
  route: Route;
  params?: Params;
  replace?: boolean;
  hash?: string;
};

export const redirect = ({
  route,
  params = {},
  replace = false,
  hash,
  options,
}: RedirectParams) => {
  const { route: normalizedRoute, isExternal } = getRoute(route, params);
  const method = replace ? Router.replace : Router.push;
  console.info(`Redirecting to ${normalizedRoute}`, params);

  if (isExternal) {
    if (replace) {
      window.location.replace(normalizedRoute);
    } else {
      window.location.href = normalizedRoute;
    }
    return null;
  }
  return method(
    { pathname: normalizedRoute, query: params, hash },
    undefined,
    options
  );
};
