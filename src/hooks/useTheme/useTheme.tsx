import {useContext} from 'react';

import ThemeContext from './ThemeContext';

export default function useTheme() {
  const theme = useContext(ThemeContext);

  return theme;
}
