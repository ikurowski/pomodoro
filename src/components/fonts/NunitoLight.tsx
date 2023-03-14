import React, {ReactNode} from 'react';
import {Text, StyleSheet, ColorValue, TextStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import useTheme from '../../hooks/useTheme/useTheme';

interface Props {
  color?: ColorValue;
  size?: number;
  children: ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
}

function NunitoLight(props: Props) {
  const {
    navigation: {colors},
  } = useTheme();
  const {
    children,
    color = colors.text,
    size = 16,
    style,
    numberOfLines,
  } = props;

  return (
    <Text
      numberOfLines={numberOfLines ? numberOfLines : 0}
      style={{
        ...style,
        ...styles.text,
        color: color,
        fontSize: moderateScale(size),
      }}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito-Light',
  },
});

export default NunitoLight;
