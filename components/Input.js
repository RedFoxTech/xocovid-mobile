import React from 'react';
import { Text } from 'react-native';
import { Input as KittenInput } from '@ui-kitten/components';

const Input = (props) => (
  <>
    <KittenInput status={props.caption && 'danger'} secureTextEntry={props.type === 'password'} {...props} />
  </>
)

export default Input;