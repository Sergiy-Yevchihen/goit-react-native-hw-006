import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const FormButton = ({ style, title, onPress }) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
});

export default FormButton;
