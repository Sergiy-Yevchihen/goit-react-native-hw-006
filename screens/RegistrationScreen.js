import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";

import * as ImagePicker from "expo-image-picker";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import { authSignUpUser } from "../redux/auth/authOperation";

import { storage } from "../firebase/config";

import LoginInput from "../components/loginInput";
import EmailInput from "../components/emailInput";
import PasswordInput from "../components/passwordInput";
import FormButton from "../components/formButton";

const RegistrationScreen = ({ navigation }) => {
  const [passwordShow, setPasswordShow] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleInputFocus = (inputName) => {
    setIsShowKeyboard(true);
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setIsShowKeyboard(false);
    setFocusedInput(null);
  };

  const isInputFocused = (inputName) => focusedInput === inputName;

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
  };

  const uploadPhotoToServer = async () => {
    let imageRef;

    if (avatar) {
      const response = await fetch(avatar);
      const file = await response.blob();
      const uniqueAvatarId = Date.now().toString();
      imageRef = ref(storage, `userAvatars/${uniqueAvatarId}`);
      await uploadBytes(imageRef, file);
    }

    const processedPhoto = await getDownloadURL(imageRef);
    return processedPhoto;
  };

  const onSubmitPress = async () => {
    const photo = await uploadPhotoToServer();
    dispatch(authSignUpUser({ login, email, password, avatar: photo }));
    setLogin("");
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/bg-image.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.box}>
              <View style={styles.avatar}>
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
                {!avatar ? (
                  <TouchableOpacity
                    style={styles.btnAddAvatar}
                    activeOpacity={0.9}
                    onPress={pickAvatar}
                  >
                    <Ionicons name="add" size={20} color="#FF6C00" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnRemoveAvatar}
                    activeOpacity={0.9}
                    onPress={removeAvatar}
                  >
                    <Ionicons name="close" size={20} color="#E8E8E8" />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? -100 : 78,
                }}
              >
                <View style={{ marginBottom: 16 }}>
                  <LoginInput
                    placeholder="Логін"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => handleInputFocus("login")}
                    onBlur={handleInputBlur}
                    onChangeText={(value) => setLogin(value)}
                    value={login}
                    isInputFocused={isInputFocused("login")}
                  />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <EmailInput
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => handleInputFocus("email")}
                    onBlur={handleInputBlur}
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                    isInputFocused={isInputFocused("email")}
                  />
                </View>
                <View style={{ marginBottom: 43 }}>
                  <PasswordInput
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => handleInputFocus("password")}
                    onBlur={handleInputBlur}
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                    isInputFocused={isInputFocused("password")}
                    passwordShow={passwordShow}
                    onTogglePasswordShow={() => setPasswordShow(!passwordShow)}
                  />
                </View>
                <FormButton title="Зареєстуватися" onPress={onSubmitPress} />
                <Text
                  style={styles.text}
                  onPress={() => navigation.navigate("Login")}
                >
                  Вже є акаунт? Увійти
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  box: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "auto",
    backgroundColor: "#FFFFFF",
    paddingTop: 92,
  },
  avatar: {
    position: "absolute",

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
    alignSelf: "center",
    marginHorizontal: "auto",
    width: 120,
    height: 120,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btnAddAvatar: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FF6C00",
  },
  btnRemoveAvatar: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
  },
  title: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  form: {
    marginHorizontal: 16,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
