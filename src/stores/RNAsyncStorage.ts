import AsyncStorage from '@react-native-async-storage/async-storage';

export enum STORAGE_KEY {
  FOCUS_TIME = '@focus_time',
  SHORT_BREAK_TIME = '@short_break_time',
  LONG_BREAK_TIME = '@long_break_time',
  SOUND = '@sound',
  VIBRATION = '@vibration',
}
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
