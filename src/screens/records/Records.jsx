import Accordion from "../../components/accordion/Accordion";
import { View, Text } from "react-native";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import LoginForm from "../../components/form/LoginForm";
const Records = () => {
  const { user } = useUserAuth();

  return <>{!user ? <LoginForm /> : <Accordion showRecordData={true} shouldFilterByDate={false} />}</>;
};

export default Records;
