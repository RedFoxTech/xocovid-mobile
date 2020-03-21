import axios from './axios'

export const createUser = (user) => {
    return axios.post('user', user)
}

export const loginUser = (user) => {
  console.log('loginUser 2:', user)
  return axios.post('/user/sign-in', user)
}
