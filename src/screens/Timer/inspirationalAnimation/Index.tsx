import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {inspirationalLines} from '../../../utils/constans';
import {getArrayElement} from '../../../utils/getArrayElement';

import AnimatedText from './AnimatedText';

function InspirationalAnimation({
  isMoving,
  reset,
  scheduleElementCompleted,
}: {
  isMoving: boolean;
  reset: boolean;
  scheduleElementCompleted: boolean;
  isPaused: boolean;
}) {
  const [animationArray, setAnimationArray] = useState<string[]>([]);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (reset) {
      setAnimationArray([]);
    }
  }, [reset]);

  //whenever the schedule cycle is completed, the animation array will be reset
  useEffect(() => {
    setAnimationArray([]);
  }, [scheduleElementCompleted]);

  useEffect(() => {
    const arr = inspirationalLines;

    if (isMoving) {
      //FIXME eventually this can be changed, bc now when animation is paused and  then resumed, it creates a small gap in the animation
      if (animationArray.length === 0) {
        getArrayElement(arr, setAnimationArray);
      }
      const interval = setInterval(() => {
        getArrayElement(arr, setAnimationArray);
      }, 6000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isMoving, animationArray.length, animationArray]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View>
        {animationArray.map((item, index) => {
          return (
            <AnimatedText
              key={index + item}
              item={item}
              index={index}
              isMoving={isMoving}
              setAnimationArray={setAnimationArray}
            />
          );
        })}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.6,
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 50,
  },
});

export default InspirationalAnimation;
