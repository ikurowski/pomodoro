import React from 'react';

import {Pressable} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import XIcon from '../assets/svg/x-icon.svg';
import {TimerScreenNavigation} from '../types/navigation';

type XButtonNavigationProp = TimerScreenNavigation['navigation'];

function XButton({navigation}: {navigation: XButtonNavigationProp}) {
  const handleOnPress = () => {
    navigation.navigate('Timer');
  };

  return (
    <Pressable hitSlop={moderateScale(10)} onPress={handleOnPress}>
      <XIcon width={moderateScale(35)} height={moderateScale(20)} />
    </Pressable>
  );
}

export default XButton;
