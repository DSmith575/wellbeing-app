import ExploreEvents from "../../screens/events/ExploreEvents";
import EventScanner from "../../screens/scanner/EventScanner";
import Profile from "../../screens/profile/Profile";
import Records from "../../screens/records/Records";
import Login from "../../screens/auth/Login";
import { routerLabels } from "./routerLabels";

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
