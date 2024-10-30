import { routerLabels } from "./routerLabels";

const ignoredAuthenticatedRoutes = [routerLabels.login.name];

const ignoredUnauthenticatedRoutes = [
  routerLabels.home.name,
  routerLabels.events.name,
  routerLabels.scanner.name,
  routerLabels.records.name,
  routerLabels.profile.name,
];

export const filterRoutes = (routes, user) => {
  let ignoredRoutes = user ? ignoredAuthenticatedRoutes : ignoredUnauthenticatedRoutes;
  return routes.filter((route) => !ignoredRoutes.includes(route.name));
};
