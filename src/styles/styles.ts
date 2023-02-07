import {moderateScale} from 'react-native-size-matters';

export const theme = {
  color: {
    primary: '#E63946',
    secondary: '#F1FAEE',
    tetriary: '#A8DADC',
    quaternary: '#457B9D',
    quinary: '#1D3557',
  },
  backgroundColor: {
    primary: '#1D3557',
  },
  textColor: {
    primary: '#F1FAEE', // white
    secondary: '#F1FAEE', // light gray
  },
  fontSize: {
    nine: moderateScale(9),
    thirtySix: moderateScale(36),
  },
  navigation: {
    dark: false,
    colors: {
      primary: '#E63946',
      background: '#1D3557',
      card: '#1D3557',
      text: '#F1FAEE',
      border: '#1D3557',
      notification: '#E63946',
    },
  },
};
