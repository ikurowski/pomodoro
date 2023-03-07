import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Vibration, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

//types
import {RootState} from '../../types/types';

//utils
import RenderCounter from '../../utils/RenderCounter';
import millisecondsToTime from '../../utils/millisecondsToTime';
import {schedule} from '../../utils/constans';

//components
import ScheduleBullets from './ScheduleBullets';
import NunitoBold from '../../components/fonts/NunitoBold';
import BasicButton from '../../components/buttons/BasicButton';
import {
  updateIsRunning,
  updateTimerType,
} from '../../features/timerSettingsSlice';
import ClockFace from './clockFace/Index';
import Pause from '../../assets/svg/pause.svg';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

function Timer() {
  const {
    timers: {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS},
    isRunning,
  } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const [timer, setTimer] = useState(pomodoroTimeInMS);
  const [timerSchedule, setTimerSchedule] = useState(schedule);
  const [isPaused, setIsPaused] = useState(false);

  const timerShown = millisecondsToTime(timer);
  const timerIdRef = useRef<number>();

  useEffect(() => {
    if (timer < 0) {
      dispatch(updateIsRunning({isRunning: false}));
      setTimerSchedule(prev => prev.slice(1));
      Vibration.vibrate();
    }
  }, [timer, dispatch]);

  useEffect(() => {
    if (timerSchedule.length === 0) {
      setTimerSchedule(schedule);
    }
    const nextTimerType = timerSchedule[0];
    if (nextTimerType === undefined) {
      dispatch(updateTimerType({type: 'pomodoroTimeInMS'}));
      setTimer(pomodoroTimeInMS);
      return;
    }
    dispatch(updateTimerType({type: nextTimerType}));

    switch (nextTimerType) {
      case 'pomodoroTimeInMS':
        setTimer(pomodoroTimeInMS);
        break;
      case 'shortBreakTimeInMS':
        setTimer(shortBreakTimeInMS);
        break;
      case 'longBreakTimeInMS':
        setTimer(longBreakTimeInMS);
    }
  }, [
    timerSchedule,
    longBreakTimeInMS,
    shortBreakTimeInMS,
    pomodoroTimeInMS,
    dispatch,
  ]);

  useEffect(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }

    if (isRunning) {
      timerIdRef.current = setInterval(() => {
        setTimer(prev => prev - 1000);
      }, 1000);
    }
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [isRunning]);

  const toggleTimer = () => {
    dispatch(updateIsRunning({isRunning: !isRunning}));

    if (isRunning) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  };

  const resetTimer = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    setTimerSchedule(schedule);
    setTimer(pomodoroTimeInMS);
    dispatch(updateIsRunning({isRunning: false}));
    setIsPaused(false);
  };

  const pomodoroBulletToBeFilled = timerSchedule.filter(
    bullet => bullet === 'pomodoroTimeInMS',
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ClockFace timer={timer}>
          {isPaused ? (
            <Animated.View
              key={'pause'} // this is needed for animation to work
              entering={FadeIn.delay(300)}
              exiting={FadeOut}>
              <Pause width={moderateScale(52)} height={moderateScale(82)} />
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn.delay(300)} exiting={FadeOut}>
              <NunitoBold size={55}>{timerShown}</NunitoBold>
            </Animated.View>
          )}
        </ClockFace>
        <ScheduleBullets
          style={styles.scheduleBullets}
          bulletsToBeFilled={pomodoroBulletToBeFilled}
        />
        <View style={styles.buttonContainer}>
          <BasicButton onPress={resetTimer} moreStyles={styles.resetButton}>
            Reset
          </BasicButton>
          <BasicButton onPress={toggleTimer} filled={true}>
            {isRunning ? 'Pause' : !isPaused ? 'Start' : 'Resume'}
          </BasicButton>
        </View>
        <RenderCounter message="Timer" />
      </View>
    </View>
  );
}

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 3,
  },
  title: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxWidth: scale(248),
  },
  resetButton: {
    marginRight: scale(8),
  },
  scheduleBullets: {
    marginTop: verticalScale(24),
    marginBottom: verticalScale(48),
  },
});
