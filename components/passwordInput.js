import React from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const PasswordInput = ({
  style,
  placeholder,
  placeholderTextColor,
  onFocus,
  onBlur,
  onChangeText,
  value,
  isInputFocused,
  passwordShow,
  onTogglePasswordShow,
}) => {
  return (
    <>
      <TextInput
        style={[styles.input, isInputFocused && styles.inputFocus, style]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={passwordShow}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity onPress={onTogglePasswordShow} style={styles.btnPasswordShow}>
        <Text style={styles.passwordShowText}>{passwordShow ? 'Показати' : 'Приховати'}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    color: '#212121',
    height: 50,
    borderRadius: 8,
  },
  inputFocus: {
    borderColor: '#FF6C00',
  },
  btnPasswordShow: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  passwordShowText: {
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    fontSize: 16,
    lineHeight: 19,
  },
});

export default PasswordInput;
