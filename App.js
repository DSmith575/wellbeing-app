import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Navigation from './src/navigation/NavigationContainer';
import { AuthContextProvider } from './src/context/firebase/FirestoreAuthContext';

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <View className={'flex-1'}>
          <StatusBar style="auto" />
          <Navigation />
        </View>
      </AuthContextProvider>
    </>
  );
}
