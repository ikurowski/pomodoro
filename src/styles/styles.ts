import {moderateScale} from 'react-native-size-matters';
import {Theme} from '../types/types';

export const theme: Theme = {
  // I used react-navigation theme structure to match default react-navigation theme
  navigation: {
    dark: false,
    colors: {
      primary: '#E39C0C',
      background: '#40916C',
      border: '#000000',
      card: '#40916C',
      text: '#FFFFFF',
      notification: '#E39C0C',
    },
  },
  fontSize: {
    nine: moderateScale(9),
    thirtySix: moderateScale(36),
  },
};
