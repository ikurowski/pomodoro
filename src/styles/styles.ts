import {moderateScale} from 'react-native-size-matters';
import {Theme} from '../types/types';

export const colors = {
  primary: '#E39C0C',
  secondary: '#40916C',
  tertiary: '#48A750',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#E5E5E5',
  lightGrey: '#BDD7D1',
  lighterGrey: '#9FBFB8',
  lightestGrey: '#ffffff33',
};

export const theme: Theme = {
  // I used react-navigation theme structure to match default react-navigation theme
  navigation: {
    dark: false,
    colors: {
      primary: colors.primary,
      background: colors.secondary,
      border: colors.black,
      card: colors.lightGrey,
      text: colors.white,
      notification: colors.primary,
    },
  },
  fontSize: {
    nine: moderateScale(9),
    thirtySix: moderateScale(36),
  },
};
