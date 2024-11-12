/**
 * Filters the routes based on the user's authentication status.
 *
 * @param {Array} routes - The array of routes to be filtered.
 * @param {Object} user - The user object containing authentication information.
 * @returns {Array} - The filtered array of routes.
 */
import { routerLabels } from "./routerLabels";

const ignoredAuthenticatedRoutes = [routerLabels.login.name, routerLabels.register.name];

const ignoredUnauthenticatedRoutes = [
  routerLabels.home.name,
  routerLabels.events.name,
  routerLabels.scanner.name,
  routerLabels.records.name,
  routerLabels.profile.name,
];

export const filterRoutes = (routes, user) => {
  const ignoredRoutes = user ? ignoredAuthenticatedRoutes : ignoredUnauthenticatedRoutes;
  return routes.filter((route) => !ignoredRoutes.includes(route.name));
};
