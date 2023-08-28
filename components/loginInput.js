import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const LoginInput = ({
  style,
  placeholder,
  placeholderTextColor,
  onFocus,
  onBlur,
  onChangeText,
  value,
  isInputFocused,
}) => {
  return (
    <TextInput
      style={[styles.input, isInputFocused && styles.inputFocus, style]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onFocus={onFocus}
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
    />
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
});

export default LoginInput;
