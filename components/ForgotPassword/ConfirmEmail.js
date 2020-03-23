import React from 'react';
import { Formik } from 'formik';

import Input from '../Input';
import { Button } from '@ui-kitten/components';
import { styles } from '../../screens/Login';

const ConfirmEmail = ({ initialValues = { email: '' }, ...props }) => (
  <Formik
    initialValues={initialValues}
    {...props}
  >
    {(props) => {
      const { values: { email }, handleChange, handleBlur, errors, touched, handleSubmit } = props;

      return (
        <>
          <Input
            name="email"
            label="Email"
            value={email}
            onChangeText={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
          <Button
            style={styles.loginBtn}
            onPress={handleSubmit}
          >
            ENVIAR CÓDIGO
          </Button>
        </>
      );
    }}
  </Formik>)

export default ConfirmEmail;
