import React from 'react';
import {StyleProp, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors as colorsSheet} from '../styles/styles';

function TextContainer({
  children,
  moreStyles,
}: {
  children: React.ReactNode;
  moreStyles?: StyleProp<any>;
}) {
  return <View style={{...styles.container, ...moreStyles}}>{children}</View>;
}

export default TextContainer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    marginVertical: 4,
    backgroundColor: colorsSheet.lightestGrey,
    borderRadius: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
