import { Routes, routes, InternalRoute } from '../constants/routes';
import { routeNames } from '../constants/routeNames';

export const findRouteByPathname = (
  pathname: string
): {
  route?: InternalRoute;
  routeName?: routeNames;
} => {
  const routeName = Object.keys(routes).find(
    (name: string) => routes[name as keyof Routes].pathname === pathname
  ) as keyof Routes | undefined;
  const route = routeName ? routes[routeName] : undefined;
  return { route, routeName };
};
