import {useTheme} from '@react-navigation/native';
import React, {ReactNode} from 'react';
import {Text, StyleSheet} from 'react-native';

const PoppinsRegular: React.FC<{
  color: string;
  size: number;
  children: ReactNode;
  style?: any;
  numberOfLines?: number;
}> = props => {
  const {colors} = useTheme();
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
        fontSize: size,
      }}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    // fontFamily: 'Poppins-Regular',
    letterSpacing: 0.5,
  },
});

export default PoppinsRegular;
