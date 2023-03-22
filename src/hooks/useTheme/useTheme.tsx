import {useContext} from 'react';
import {useSelector} from 'react-redux';
import {colors} from '../../styles/styles';
import {TimerRootState} from '../../types/types';

import ThemeContext from './ThemeContext';

export default function useTheme() {
  const theme = useContext(ThemeContext);
  const {currentTimerType} = useSelector(
    (state: TimerRootState) => state.timer,
  );

  if (currentTimerType !== 'pomodoroTimeInMS') {
    theme.navigation.colors.background = colors.tertiary;
  }
  if (currentTimerType === 'pomodoroTimeInMS') {
    theme.navigation.colors.background = colors.secondary;
  }

  return theme;
}
