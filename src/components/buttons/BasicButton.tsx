import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import NunitoSemiBold from '../fonts/NunitoSemiBold';

function BasicButton({child}: {child: string}) {
  return (
    <Pressable style={styles.container}>
      <NunitoSemiBold>{child}</NunitoSemiBold>
    </Pressable>
  );
}

export default BasicButton;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
