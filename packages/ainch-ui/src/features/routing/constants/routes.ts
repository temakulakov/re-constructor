import { routeNames } from './routeNames';

export type InternalRoute = {
  pathname: string;
  isProtected?: boolean;
};

export type Route = InternalRoute | string;

export type Params = {
  [paramName: string]: string | number;
};

export type Routes = { [fieldName in routeNames]: InternalRoute };

export const routes: Routes = {
  [routeNames.INDEX]: {
    pathname: '/',
  },
};

export const externalRoutes = {};
