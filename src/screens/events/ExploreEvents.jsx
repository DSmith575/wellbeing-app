import { View, Text } from "react-native";
import Accordion from "../../components/accordion/Accordion";
import useLoading from "../../hooks/loading/useLoading";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import LoginForm from "../../components/form/LoginForm";
import { ActivityIndicator } from "react-native-web";
const ExploreEvents = () => {
  const { user } = useUserAuth();
  const { loading } = useLoading();
  return (
    <>
      {!user ? (
        <LoginForm />
      ) : (
        <>
          {loading("eventData") && <ActivityIndicator size={"large"} />}
          <View className={"flex-1"}>
            <Accordion showRecordData={false} shouldFilterByDate={true} />
          </View>
        </>
      )}
    </>
  );
};

export default ExploreEvents;
