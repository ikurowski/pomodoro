import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../types/types';

export const getAsyncData = async (key: STORAGE_KEY) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // console.error(e);
  }
};

export const storeAsyncData = async (value: any, key: STORAGE_KEY) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // console.error(e);
  }
};
