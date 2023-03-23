import React, {FC, useEffect, useState} from 'react';
import {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {Svg} from 'react-native-svg';
import {useSelector} from 'react-redux';

//types
import {
  UseAnimatedProps,
  CircularProgressProps,
  TimerRootState,
} from '../../../types/types';

//components
import MemoizedAnimatedCircle from './MemoizedAnimatedCircle';

export const CircularProgress: FC<CircularProgressProps> = ({
  radius,
  backgroundColor,
  timer,
}) => {
  const {
    timers: {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS},
    currentTimerType,
    isRunning,
  } = useSelector((state: TimerRootState) => state.timer);
  const [timeFromTimerType, setTimeFromTimerType] = useState(pomodoroTimeInMS);

  const halfRadius = radius / 2;
  const circumfrence = 2 * Math.PI * halfRadius;

  const clockProgress = useSharedValue(0);
  const clockOpacity = useSharedValue(0.1);

  useEffect(() => {
    switch (currentTimerType) {
      case 'pomodoroTimeInMS':
        setTimeFromTimerType(pomodoroTimeInMS);
        break;
      case 'shortBreakTimeInMS':
        setTimeFromTimerType(shortBreakTimeInMS);
        break;
      case 'longBreakTimeInMS':
        setTimeFromTimerType(longBreakTimeInMS);
        break;
      default:
        setTimeFromTimerType(pomodoroTimeInMS);
    }
  }, [
    pomodoroTimeInMS,
    shortBreakTimeInMS,
    longBreakTimeInMS,
    currentTimerType,
  ]);

  useEffect(() => {
    const oneTickPI = circumfrence / (timeFromTimerType / 1000);
    const tickDivider = circumfrence / oneTickPI;
    const tickDivisor = (timeFromTimerType - timer) / 1000;

    // makes sure that the ticks are between 0 and 1
    let ticks = Math.min(Math.max(tickDivisor / tickDivider, 0), 1);

    // workaround for the bug that the clock animation is interrupted when the timer is reset
    if (!isRunning && ticks === 0) {
      clockProgress.value = withTiming(0, {
        duration: 1000,
        easing: Easing.linear,
      });
    }

    if (isRunning) {
      clockProgress.value = withTiming(ticks, {
        duration: 1000,
        easing: Easing.linear,
      });
    }
  }, [clockProgress, circumfrence, timeFromTimerType, timer, isRunning]);

  useEffect(() => {
    clockOpacity.value = withSequence(
      withTiming(0.18, {
        duration: 500,
        easing: Easing.linear,
      }),
      withTiming(0.1, {
        duration: 500,
        easing: Easing.linear,
      }),
    );
  }, [isRunning, clockOpacity]);

  const animatedProps = useAnimatedProps<UseAnimatedProps>(() => ({
    strokeDashoffset: -circumfrence * clockProgress.value,
    opacity: clockOpacity.value,
  }));

  return (
    <Svg>
      <MemoizedAnimatedCircle
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
