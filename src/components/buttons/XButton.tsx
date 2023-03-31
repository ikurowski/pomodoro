import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

//components
import XIcon from '../../assets/svg/x-icon.svg';

//styles
import useTheme from '../../hooks/useTheme/useTheme';

//types
import {TimerScreenNavigation} from '../../types/navigation';

type XButtonNavigationProp = TimerScreenNavigation['navigation'];

function XButton({navigation}: {navigation: XButtonNavigationProp}) {
  const handleOnPress = () => {
    navigation.navigate('Timer');
  };

  const {
    navigation: {colors},
  } = useTheme();

  return (
    <Pressable
      style={styles.container}
      hitSlop={moderateScale(10)}
      onPress={handleOnPress}>
      <XIcon
        fill={colors.text}
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
