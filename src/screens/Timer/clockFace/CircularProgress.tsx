import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {withPause} from 'react-native-redash';
import {Svg, Circle} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {RootState} from '../../../types/types';

type CircularProgressProps = {
  radius: number;
  backgroundColor: string;
  isRunning: boolean;
  timer: number;
};

export const CircularProgress: FC<CircularProgressProps> = ({
  radius,
  backgroundColor,
  isRunning,
  timer,
}) => {
  const {
    timers: {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS},
    currentTimerType,
  } = useSelector((state: RootState) => state.timer);

  // useEffect(() => {
  //   sharedValue.value = withPause(withTiming(1), paused);
  // }, []);

  const halfRadius = radius / 2;
  const circumfrence = 2 * Math.PI * halfRadius;

  const paused = useSharedValue(false);
  const sharedValue = useSharedValue(0);
  const animateTo = useDerivedValue(() => -circumfrence);
  const animatedProps = useAnimatedProps(() => {
    let animationDuration;
    switch (currentTimerType) {
      case 'pomodoroTimeInMS':
        animationDuration = pomodoroTimeInMS;
        break;
      case 'shortBreakTimeInMS':
        animationDuration = shortBreakTimeInMS;
        break;
      case 'longBreakTimeInMS':
        animationDuration = longBreakTimeInMS;
    }
    return {
      strokeDashoffset: withPause(
        withTiming(sharedValue.value, {
          duration: animationDuration,
          easing: Easing.linear,
        }),
        paused,
      ),
    };
  });

  const animate = () => {
    sharedValue.value = withPause(withTiming(1), paused);
  };

  useEffect(() => {
    if (isRunning) {
      animate();
    }
    // if (!isRunning) {

    // }
  }, [isRunning, animateTo, sharedValue]);

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={radius}
          cy={radius}
          fill={'transparent'}
          r={halfRadius}
          opacity=".1"
          stroke={backgroundColor}
          strokeWidth={radius}
          strokeDasharray={`${circumfrence} ${circumfrence}`}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </Svg>
      <Button title="Pause" onPress={() => (paused.value = true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
