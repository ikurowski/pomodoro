import React, {ReactNode} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import useTheme from '../hooks/useTheme/useTheme';

//icons
import SettingsIcon from '../assets/svg/settings-icon.svg';
import ClockIcon from '../assets/svg/clock-icon.svg';
import ListIcon from '../assets/svg/list-icon.svg';

const NavIcons = (label: string, isFocused: boolean): ReactNode => {
  const {
    navigation: {colors},
  } = useTheme();

  let color;
  if (isFocused) {
    color = 'red'; //FIXME
  } else {
    color = colors.text;
  }

  switch (label) {
    case 'Settings':
      return (
        <SettingsIcon
          color={color}
          width={scale(22)}
          height={verticalScale(22)}
        />
      );

    case 'Timer':
      return (
        <ClockIcon color={color} width={scale(22)} height={verticalScale(22)} />
      );

    case 'Tasks':
      return (
        <ListIcon color={color} width={scale(22)} height={verticalScale(22)} />
      );

    default:
      return null;
  }
};

export default NavIcons;
