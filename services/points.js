import axios from './axios'
import { tokenFormated } from './../services/authenticate'

export const findPoints = async ({ latitude, longitude }) => axios.get(`user-status?lat=${latitude}&long=${longitude}`, { headers: { authorization: await tokenFormated() } })

export const loginUser = (user) => axios.post('/user/sign-in', user)
