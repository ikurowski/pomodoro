import React from 'react';

import {Pressable} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import MenuBurger from '../assets/svg/menu-burger.svg';
import useTheme from '../hooks/useTheme/useTheme';
import {SettingsScreenNavigation} from '../types/navigation';

type SettingsButtonNavigationProp = SettingsScreenNavigation['navigation'];

function SettingsButton({
  navigation,
}: {
  navigation: SettingsButtonNavigationProp;
}) {
  const handleOnPress = () => {
    navigation.navigate('Settings');
  };

  const {textColor} = useTheme();

  return (
    <Pressable hitSlop={moderateScale(10)} onPress={handleOnPress}>
      <MenuBurger
        fill={textColor.secondary}
        width={moderateScale(35)}
        height={moderateScale(35)}
      />
    </Pressable>
  );
}

export default SettingsButton;
