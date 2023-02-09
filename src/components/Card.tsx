import React from 'react';
import {Pressable, StyleSheet, Animated} from 'react-native';
import {scale} from 'react-native-size-matters';
import PoppinsRegular from './fonts/PoppinsRegular';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Card({children}: {children: string}) {
  const scaleAnimation = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedPressable
      style={[
        styles.container,
        {
          transform: [{scale: scaleAnimation}],
        },
      ]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <PoppinsRegular>{children}</PoppinsRegular>
    </AnimatedPressable>
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
