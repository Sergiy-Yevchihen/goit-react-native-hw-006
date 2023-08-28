import { useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { authSignInUser } from '../redux/auth/authOperation';

import EmailInput from '../components/emailInput';
import PasswordInput from '../components/passwordInput';
import FormButton from '../components/formButton';

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleInputFocus = inputName => {
    setIsShowKeyboard(true);
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setIsShowKeyboard(false);
    setFocusedInput(null);
  };

  const isInputFocused = inputName => focusedInput === inputName;

  const onSubmitPress = () => {
    dispatch(authSignInUser({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../assets/images/bg-image.jpg')}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.box}>
              <Text style={styles.title}>Увійти</Text>

              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? -100 : 78,
                }}
              >
                <View style={{ marginBottom: 16 }}>
                  <EmailInput
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => handleInputFocus('email')}
                    onBlur={handleInputBlur}
                    onChangeText={value => setEmail(value)}
                    value={email}
                    isInputFocused={isInputFocused('email')}
                  />
                </View>

                <View style={{ marginBottom: 43 }}>
                  <PasswordInput
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => handleInputFocus('password')}
                    onBlur={handleInputBlur}
                    onChangeText={value => setPassword(value)}
                    value={password}
                    isInputFocused={isInputFocused('password')}
                    showPassword={showPassword}
                    onTogglePasswordShow={() => setShowPassword(!showPassword)}
                  />
                </View>
                <FormButton title={'Увійти'} onPress={onSubmitPress} />
                <Text style={styles.text} onPress={() => navigation.navigate('Register')}>
                  Немає акаунту? Зареєструватися
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  box: {
    position: 'relative',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 'auto',
    paddingTop: 32,
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginBottom: 32,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
  },
  form: {
    marginHorizontal: 16,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
});
