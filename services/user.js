import { AsyncStorage } from "react-native";

export const getUser = async () => AsyncStorage.getItem('user')

export const saveUser = async val => AsyncStorage.setItem('user', val);

export const getToken = async () => AsyncStorage.getItem('token')

export const saveToken = async val => AsyncStorage.setItem('token', val);
