import React from 'react';
import { Input as KittenInput } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ECEFF1',
  },
  inputLabel: {
    color: '#414A4E'
  },
});

const Input = ({ name, onChangeText, onBlur, style, labelStyle, ...props }) => (
  <>
    <KittenInput
      style={{ ...styles.input, ...style }}
      labelStyle={{ ...styles.inputLabel, ...labelStyle }}
      status={props.caption && 'danger'}
      secureTextEntry={props.type === 'password'}
      onChangeText={onChangeText(name)}
      onBlur={onBlur(name)}
      {...props}
    />
  </>
)

export default Input;