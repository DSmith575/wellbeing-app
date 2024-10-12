import QrScanner from '../../components/qrScanner/QrScanner';
import HomeScreen from '../../screens/home/HomeScreen';
import Profile from '../../screens/profile/Profile';

export const routes = [
  {
    name: 'Explore Events',
    component: HomeScreen,
    label: 'Explore Events',
    icon: 'home',
  },
  {
    name: 'QR Scanner',
    component: QrScanner,
    label: 'QR Scanner',
    icon: 'qrcode-scan',
  },
  {
    name: 'Profile',
    component: Profile,
    label: 'Profile',
    icon: 'account',
  },
];
