import React from 'react';

import { Formik } from 'formik';
import Input from '../Input';
import { Button } from '@ui-kitten/components';
import { styles } from '../../screens/Login';

const ChangePassword = ({ initialValues = { password: '', confirmPassword: '', code: '' }, ...props }) => {
  

  return (
    <Formik
      initialValues={initialValues}
      {...props}
    >
      {(props) => {
        const { values: { password, confirmPassword, code }, errors, touched, handleBlur, handleChange, handleSubmit } = props;

        return (
          <>
            <Input
              name="code"
              value={code}
              errors={errors}
              touched={touched}
              onChangeText={handleChange}
              onBlur={handleBlur}
              label="Código de verificação"
            />
            <Input
              name="password"
              type="password"
              value={password}
              errors={errors}
              touched={touched}
              onChangeText={handleChange}
              onBlur={handleBlur}
              label="Nova senha"
            />
            <Input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              errors={errors}
              touched={touched}
              onChangeText={handleChange}
              onBlur={handleBlur}
              label="Nova senha"
            />
            <Button style={styles.loginBtn} onPress={handleSubmit}> CONFIRMAR </Button>
          </>
        );
      }}
    </Formik>
  );
};

export default ChangePassword;
