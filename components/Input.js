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

const Input = ({ name = '', onChangeText = () => null, onBlur = () => null, style = {}, labelStyle = {}, touched = {}, errors = {}, caption = '', ...props }) => {
  caption = caption || touched[name] && errors[name];

  return (
    <>
      <KittenInput
        caption={caption}
        style={{ ...styles.input, ...style }}
        labelStyle={{ ...styles.inputLabel, ...labelStyle }}
        status={caption && 'danger'}
        secureTextEntry={props.type === 'password'}
        onChangeText={onChangeText(name)}
        onBlur={onBlur(name)}
        {...props}
      />
    </>
  );
};

export default Input;