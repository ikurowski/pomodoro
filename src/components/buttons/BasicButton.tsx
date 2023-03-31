import React from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

//components
import NunitoSemiBold from '../fonts/NunitoSemiBold';

//styles
import useTheme from '../../hooks/useTheme/useTheme';

function BasicButton({
  onPress,
  children,
  filled = false,
  moreStyles,
}: {
  onPress: () => void;
  children: string;
  filled?: boolean;
  moreStyles?: any;
}) {
  const {
    navigation: {colors},
  } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={
        filled
          ? {
              ...styles.filledButton,
              backgroundColor: colors.primary,
              ...moreStyles,
            }
          : {...styles.nonFilledButton, borderColor: colors.text, ...moreStyles}
      }>
      <NunitoSemiBold style={styles.text} size={20} numberOfLines={1}>
        {children}
      </NunitoSemiBold>
    </Pressable>
  );
}

const sharedStyles: ViewStyle = {
  borderRadius: 60,
  paddingVertical: 12,
  alignItems: 'center',
  justifyContent: 'center',
  width: moderateScale(120),
};

const styles = StyleSheet.create({
  nonFilledButton: {
    borderWidth: 1,
    ...sharedStyles,
  },
  filledButton: {
    ...sharedStyles,
  },
  text: {
    textAlign: 'center',
  },
});

export default React.memo(BasicButton);
