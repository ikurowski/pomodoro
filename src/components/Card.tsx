import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import PoppinsRegular from './fonts/PoppinsRegular';

function Card({children}: {children: string}) {
  return (
    <Pressable
      style={({pressed}) => [
        {...styles.container, transform: [{scale: pressed ? 0.9 : 1}]},
      ]}>
      <PoppinsRegular>{children}</PoppinsRegular>
    </Pressable>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff2f',
    borderRadius: 10,
    width: scale(100),
    height: scale(100),
  },
});
