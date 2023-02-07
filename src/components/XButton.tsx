import React from 'react';
import {Pressable} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {TimerScreenNavigation} from '../types/navigation';
import useTheme from '../hooks/useTheme/useTheme';
import XIcon from '../assets/svg/x-icon.svg';

type XButtonNavigationProp = TimerScreenNavigation['navigation'];

function XButton({navigation}: {navigation: XButtonNavigationProp}) {
  const handleOnPress = () => {
    navigation.navigate('Timer');
  };

  const {textColor} = useTheme();

  return (
    <Pressable hitSlop={moderateScale(10)} onPress={handleOnPress}>
      <XIcon
        fill={textColor.secondary}
        width={moderateScale(35)}
        height={moderateScale(20)}
      />
    </Pressable>
  );
}

export default XButton;
