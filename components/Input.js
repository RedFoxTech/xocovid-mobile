import React from 'react';
import { Text } from 'react-native';
import { Input as KittenInput } from '@ui-kitten/components';

const Input = (props) => (
  <>
    <KittenInput secureTextEntry={props.type === 'password'} {...props} />
  </>
)

export default Input;