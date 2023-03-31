import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

//components
import MenuBurger from '../../assets/svg/menu-burger.svg';

//styles
import useTheme from '../../hooks/useTheme/useTheme';

//types
import {SettingsScreenNavigation} from '../../types/navigation';

type SettingsButtonNavigationProp = SettingsScreenNavigation['navigation'];

function SettingsButton({
  navigation,
}: {
  navigation: SettingsButtonNavigationProp;
}) {
  const handleOnPress = () => {
    navigation.navigate('Settings');
  };

  const {
    navigation: {colors},
  } = useTheme();

  return (
    <Pressable
      style={styles.container}
      hitSlop={moderateScale(10)}
      onPress={handleOnPress}>
      <MenuBurger
        fill={colors.text}
        width={moderateScale(35)}
        height={moderateScale(35)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default SettingsButton;
