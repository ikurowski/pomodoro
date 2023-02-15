import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
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
    <Pressable
      style={styles.container}
      hitSlop={moderateScale(10)}
      onPress={handleOnPress}>
      <XIcon
        fill={textColor.secondary}
        width={moderateScale(35)}
        height={moderateScale(20)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default XButton;
