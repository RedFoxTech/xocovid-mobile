import { AsyncStorage } from "react-native";

export const getToken = async () => AsyncStorage.getItem('token')

export const saveToken = async val => AsyncStorage.setItem('token', val);
