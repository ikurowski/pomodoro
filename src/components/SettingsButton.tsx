import {useTheme} from '@react-navigation/native';
import React, {FC} from 'react';

import {Pressable} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import MenuBurger from '../assets/svg/menu-burger.svg';
import {SettingsScreenNavigation} from '../types/navigation';

type SettingsButtonNavigationProp = SettingsScreenNavigation['navigation'];

function SettingsButton({
  navigation,
}: {
  navigation: SettingsButtonNavigationProp;
}) {
  const handleOnPress = () => {
    navigation.navigate('Timer');
  };

  const {colors} = useTheme();

  return (
    <Pressable hitSlop={moderateScale(10)} onPress={handleOnPress}>
      <MenuBurger
        color={colors.text}
        width={moderateScale(35)}
        height={moderateScale(35)}
      />
    </Pressable>
  );
}

export default SettingsButton;
