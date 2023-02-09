import React, {ReactNode, FC} from 'react';
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

const PoppinsRegular: FC<Props> = props => {
  const {textColor} = useTheme();
  const {
    children,
    color = textColor.primary,
    size = moderateScale(16),
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
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1.5,
  },
});

export default PoppinsRegular;
