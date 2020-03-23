import React from 'react';
import { Text } from 'react-native';
import { Input as KittenInput } from '@ui-kitten/components';

const Input = ({ name, onChangeText, onBlur, ...props }) => (
  <>
    <KittenInput
      status={props.caption && 'danger'}
      secureTextEntry={props.type === 'password'}
      onChangeText={onChangeText(name)}
      onBlur={onBlur(name)}
      {...props}
    />
  </>
)

export default Input;