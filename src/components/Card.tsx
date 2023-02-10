import React, {useState} from 'react';
import {Pressable, StyleSheet, Animated, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import CardExpandedModal from './CardExpandedModal';
import PoppinsRegular from './fonts/PoppinsRegular';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Card({title, xxxx}: {title: string; xxxx: number}) {
  const [isExpanded, setIsExpanded] = useState(false);
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

    setIsExpanded(true);
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
      <View style={styles.xxxx}>
        <PoppinsRegular size={32}>{xxxx}</PoppinsRegular>
      </View>
      <PoppinsRegular size={12}>{title}</PoppinsRegular>
    </AnimatedPressable>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff2f',
    padding: 10,
    borderRadius: 10,
    width: scale(100),
    height: scale(100),
  },
  xxxx: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
