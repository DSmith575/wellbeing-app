import { View, Text } from 'react-native';
import LoginForm from '../../components/form/LoginForm';
import { useUserAuth } from '../../context/firebase/FirestoreAuthContext';
import Button from '../../components/button/Button';

const Profile = () => {
  const { user, logout } = useUserAuth();
  return (
    <>
      {user ? (
        <View className={'flex-1 justify-center items-center'}>
          <Text className={'text-2xl text-gray-800'}>Welcome {user}</Text>
          <Button onPress={logout} text="Logout" accessibilityLabel="Logout button" accessibilityHint="Tap to logout" />
        </View>
      ) : (
        <>
          <LoginForm />
        </>
      )}
    </>
  );
};

export default Profile;
