/**
 * Defines the routes for the navigation in the wellbeing app.
 * Each route object contains the name, component, label, and icon properties.
 * @typedef {Object} Route
 * @property {string} name - The name of the route.
 * @property {React.Component} component - The component associated with the route.
 * @property {string} label - The label for the route.
 * @property {string} icon - The icon for the route.
 */

import ExploreEvents from "../../screens/events/ExploreEvents";
import EventScanner from "../../screens/scanner/EventScanner";
import Profile from "../../screens/profile/Profile";
import Records from "../../screens/records/Records";
import Login from "../../screens/auth/Login";
import { routerLabels } from "./routerLabels";

/**
 * Array of route objects that define the navigation routes.
 * @type {Route[]}
 */
export const routes = [
  {
    name: routerLabels.events.name,
    component: ExploreEvents,
    label: routerLabels.events.name,
    icon: routerLabels.events.icon,
  },
  {
    name: routerLabels.scanner.name,
    component: EventScanner,
    label: routerLabels.scanner.name,
    icon: routerLabels.scanner.icon,
  },
  {
    name: routerLabels.records.name,
    component: Records,
    label: routerLabels.records.name,
    icon: routerLabels.records.icon,
  },
  {
    name: routerLabels.profile.name,
    component: Profile,
    label: routerLabels.profile.name,
    icon: routerLabels.profile.icon,
  },
  {
    name: routerLabels.login.name,
    component: Login,
    label: routerLabels.login.name,
    icon: routerLabels.login.icon,
  },
];
