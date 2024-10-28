import { View, Text } from "react-native";
import Accordion from "../../components/accordion/Accordion";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import LoginForm from "../../components/form/LoginForm";
const ExploreEvents = () => {
  const { user } = useUserAuth();

  return (
    <>
      {!user ? (
        <LoginForm />
      ) : (
        <>
          <View className={"flex-1"}>
            <Accordion showRecordData={false} shouldFilterByDate={true} />
          </View>
        </>
      )}
    </>
  );
};

export default ExploreEvents;
