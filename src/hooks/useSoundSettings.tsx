import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateSettings} from '../features/timerSettingsSlice';
import {storeAsyncData} from '../storage/RNAsyncStorage';
import {STORAGE_KEY, UpdateSettingsType} from '../types/types';

export const useSoundSettings = (
  initialValue: boolean,
  key: UpdateSettingsType,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(initialValue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateSettings({property: key, value: value}));
    storeAsyncData(
      value,
      STORAGE_KEY[key.toUpperCase() as keyof typeof STORAGE_KEY],
    );
  }, [dispatch, key, value]);

  return [value, setValue];
};
