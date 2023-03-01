import React from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import useTheme from '../../hooks/useTheme/useTheme';
import NunitoSemiBold from '../fonts/NunitoSemiBold';

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
      <NunitoSemiBold style={styles.text} size={20}>
        {children}
      </NunitoSemiBold>
    </Pressable>
  );
}

export default BasicButton;

const sharedStyles: ViewStyle = {
  borderRadius: 60,
  paddingHorizontal: 30,
  paddingVertical: 12,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
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
