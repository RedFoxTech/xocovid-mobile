import axios from './axios'

export const createUser = (user) => {
    console.log('axios', user)
    return axios.post('user', user)
}