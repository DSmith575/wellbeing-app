import QrScanner from "../../components/qrScanner/QrScanner";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import LoginForm from "../../components/form/LoginForm";

const EventScanner = () => {
  const { user } = useUserAuth();

  return <>{!user ? <LoginForm /> : <QrScanner />}</>;
};

export default EventScanner;
