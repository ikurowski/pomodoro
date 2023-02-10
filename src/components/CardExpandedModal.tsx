import React from 'react';
import {StyleSheet, View} from 'react-native';
import PoppinsRegular from './fonts/PoppinsRegular';

function CardExpandedModal({number, title}: {number: number; title: string}) {
  return (
    <View style={styles.container}>
      <PoppinsRegular>{number}</PoppinsRegular>
      <PoppinsRegular>{title}</PoppinsRegular>
    </View>
  );
}

export default CardExpandedModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
});
