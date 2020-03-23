import axios from './axios'

export const createUser = (user) => {
  return axios.post('user', user)
}

export const loginUser = (user) => {
  return axios.post('/user/sign-in', user)
}

export const emailToRecoveryPassword = (email) => axios.post(`/user/recovery-password/${email}`);

export const changePassword = (email, data) => axios.put(`/user/recovery-password/${email}`, data)
