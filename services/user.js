import axios from './axios'

export const createUser = (user) => {
    console.log('axios', user)
    return axios.post('user', user)
}

export const loginUser = (user) => {
  console.log('loginUser :', user)

  return axios.post('/user/sign-in', data)
}
