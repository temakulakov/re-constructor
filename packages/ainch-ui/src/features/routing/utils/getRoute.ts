import { stringify } from 'qs';

import { Route, Params } from '../constants/routes';
import { findRouteByPathname } from './findRouteByPathname';

export const getRoute = (
  route: Route,
  params?: Params,
  hash?: string
): { route: string; isExternal: boolean; isRelative: boolean } => {
  const knownRoute =
    typeof route === 'object' ? route : findRouteByPathname(route).route;
  const isRelative = typeof route === 'string' && route.startsWith('/');
  const isInternal = Boolean(knownRoute) || isRelative;

  const isExternal = !isInternal;

  const pathname = knownRoute ? knownRoute.pathname : (route as string);
  const externalAsPath = isExternal
    ? `${route}${
        params && Object.keys(params).length > 0 ? `?${stringify(params)}` : ''
      }${hash ? `#${hash}` : ''}`
    : '';

  return {
    route: isExternal ? externalAsPath : pathname,
    isRelative,
    isExternal,
  };
};
