import { View } from 'react-native';
import Input from '../../components/input/Input';
import useFormInput from '../../hooks/forms/useFormInput';

const HomeScreen = () => {
  const email = useFormInput('');
  const password = useFormInput('');
  return (
    <View className={'flex-1 justify-center items-center'}>
      <Input
        label={'Email'}
        type="email"
        placeholder="Enter Email"
        value={email.value}
        onChange={email.onChange}
        accessibilityLabel="Email address input"
        accessibilityHint="Enter your email address here"
        accessibilityRole="text"
        accessibilityState={{ disabled: false }}
      />

      <Input
        label={'Password'}
        type="password"
        placeholder="Enter Password"
        value={password.value}
        onChange={password.onChange}
        minLength={6}
        maxLength={12}
        accessibilityLabel="Password input"
        accessibilityHint="Enter your password here"
        accessibilityRole="text"
        accessibilityState={{ disabled: false }}
        secureTextEntry
      />
    </View>
  );
};

export default HomeScreen;
