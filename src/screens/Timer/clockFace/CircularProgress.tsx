import React, {FC, useEffect, useState} from 'react';
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
import RenderCounter from '../../../utils/RenderCounter';

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

  const halfRadius = radius / 2;
  const circumfrence = 2 * Math.PI * halfRadius;

  // const paused = useSharedValue(false);
  const clockProgress = useSharedValue(0);

  useEffect(() => {
    let timerInMS: number;
    switch (currentTimerType) {
      case 'pomodoroTimeInMS':
        timerInMS = pomodoroTimeInMS;
        break;
      case 'shortBreakTimeInMS':
        timerInMS = shortBreakTimeInMS;
        break;
      case 'longBreakTimeInMS':
        timerInMS = longBreakTimeInMS;
        break;
    }
    const partOfClockToMultiple = circumfrence / (timerInMS / 1000);
    const ticks = partOfClockToMultiple * ((timerInMS - timer) / 1000);
    if (isRunning) {
      clockProgress.value = withTiming(-ticks, {
        duration: 1000,
        easing: Easing.linear,
      });
    }
  }, [
    isRunning,
    timer,
    clockProgress,
    circumfrence,
    pomodoroTimeInMS,
    shortBreakTimeInMS,
    longBreakTimeInMS,
    currentTimerType,
  ]);

  useEffect(() => {
    if (timer === 0) {
      clockProgress.value = 0;
    }
  }, [timer, clockProgress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: clockProgress.value,
  }));

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <View style={styles.container}>
      <RenderCounter message="Clock" />
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
