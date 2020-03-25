import React, { useState } from 'react';

import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { styles } from './Login';
import ErrorMessages from '../constants/ErrorMessages';
import ConfirmEmail from '../components/ForgotPassword/ConfirmEmail';
import { emailToRecoveryPassword, changePassword } from '../services/user';
import { showMessage } from 'react-native-flash-message';
import ChangePassword from '../components/ForgotPassword/ChangePassword';
import Pages from '../constants/Pages';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const validationSchemaConfirmEmail = Yup.object().shape({
    email: Yup.string()
      .email(ErrorMessages.email)
      .required(ErrorMessages.required)
  });
  const validationSchemaChangePassword = Yup.object().shape({
    code: Yup.string()
      .length(6, ErrorMessages.length(6))
      .required(ErrorMessages.required),
    password: Yup.string()
      .required(ErrorMessages.required),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], ErrorMessages.equalPasswords)
      .required(ErrorMessages.required)
  })
  const handleSubmitEmail = ({ email }) => {
    emailToRecoveryPassword(email)
      .then(() => setEmail(email))
      .catch(() => showMessage({
        type: 'danger',
        message: ErrorMessages.tryAgain
      }))
  }
  const handleSubmitChangePassword = ({ confirmPassword, ...data }) => {
    changePassword(email, data)
      .then(() => {
        showMessage({
          type: 'success',
          message: 'Senha modificada com sucesso.'
        });

        navigation.navigate(Pages.HOME);
      })
      .catch(() => {
        showMessage({
          type: 'danger',
          message: ErrorMessages.tryAgain,
        });
      });
  }

  return (
    <Layout style={styles.container}>
      {
        !email
          ? <ConfirmEmail
              validationSchema={validationSchemaConfirmEmail}
              onSubmit={handleSubmitEmail}
            />
          : <ChangePassword
              validationSchema={validationSchemaChangePassword}
              onSubmit={handleSubmitChangePassword}
            />
      }
    </Layout>
  );
};

export default ForgotPassword;
