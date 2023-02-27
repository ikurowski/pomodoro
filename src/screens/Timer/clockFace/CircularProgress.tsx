import React, {FC, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
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

  const clockProgress = useSharedValue(0);
  const clockOpacity = useSharedValue(0.1);

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
    const increasingTimer = timerInMS - timer;

    let ticks = partOfClockToMultiple * (increasingTimer / 1000);

    clockProgress.value = withTiming(-ticks, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, [
    timer,
    clockProgress,
    circumfrence,
    pomodoroTimeInMS,
    shortBreakTimeInMS,
    longBreakTimeInMS,
    currentTimerType,
  ]);

  useEffect(() => {
    clockOpacity.value = withSequence(
      withTiming(0.2, {
        duration: 500,
        easing: Easing.linear,
      }),
      withTiming(0.1, {
        duration: 500,
        easing: Easing.linear,
      }),
    );
  }, [isRunning, clockOpacity]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: clockProgress.value,
    opacity: clockOpacity.value,
  }));

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <Svg>
      <AnimatedCircle
        animatedProps={animatedProps}
        cx={radius}
        cy={radius}
        fill={'transparent'}
        r={halfRadius}
        stroke={backgroundColor}
        strokeWidth={radius}
        strokeDasharray={`${circumfrence} ${circumfrence}`}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
    </Svg>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
