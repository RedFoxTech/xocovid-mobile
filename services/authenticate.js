import { AsyncStorage } from "react-native";

export const getToken = async () => AsyncStorage.getItem('token')

export const tokenFormated = async () => `Bearer ${await getToken()}`

export const saveToken = async val => AsyncStorage.setItem('token', val);

export const tokenExists = async () => getToken().then(v => v ? Promise.resolve() : Promise.reject).catch(Promise.reject)
