import QrScanner from "../../components/qrScanner/QrScanner";
import ExploreEvents from "../../screens/events/ExploreEvents";
import Profile from "../../screens/profile/Profile";
import Records from "../../screens/records/Records";

export const routes = [
  {
    name: "Explore Events",
    component: ExploreEvents,
    label: "Explore Events",
    icon: "home",
  },
  {
    name: "Event Scanner",
    component: QrScanner,
    label: "Event Scanner",
    icon: "qrcode-scan",
  },
  {
    name: "My Hauora",
    component: Records,
    label: "My Hauora",
    icon: "chart-bell-curve-cumulative",
  },
  {
    name: "Profile",
    component: Profile,
    label: "Profile",
    icon: "account",
  },
];
