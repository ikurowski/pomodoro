import React, {ReactNode} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

//components
import SettingsIcon from '../assets/svg/settings-icon.svg';
import ClockIcon from '../assets/svg/clock-icon.svg';
import ListIcon from '../assets/svg/list-icon.svg';

//types
import {NavIconsProps} from '../types/types';

//styles
import {colors} from '../styles/styles';

const NavIcons = ({
  label,
  isFocused,
  color = colors.lightGrey,
  focusColor = colors.white,
}: NavIconsProps): ReactNode => {
  let iconColor: string;
  if (isFocused) {
    iconColor = focusColor;
  } else {
    iconColor = color;
  }

  switch (label) {
    case 'Settings':
      return (
        <SettingsIcon
          color={iconColor}
          width={scale(22)}
          height={verticalScale(22)}
        />
      );

    case 'Timer':
      return (
        <ClockIcon
          color={iconColor}
          width={scale(22)}
          height={verticalScale(22)}
        />
      );

    case 'Tasks':
      return (
        <ListIcon
          color={iconColor}
          width={scale(22)}
          height={verticalScale(22)}
        />
      );

    default:
      return null;
  }
};

export default NavIcons;
