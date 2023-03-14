import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, StyleSheet, Vibration, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

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
  updateSettings,
  updateTimerType,
} from '../../features/timerSettingsSlice';
import ClockFace from './clockFace/Index';
import Pause from '../../assets/svg/pause.svg';
import InspirationalAnimation from './inspirationalAnimation/Index';
import TextContainer from '../../components/TextContainer';
import NunitoMedium from '../../components/fonts/NunitoMedium';

import Sound from 'react-native-sound';

function Timer() {
  const {
    timers: {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS},
    isRunning,
    sound,
    vibration,
  } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const IOS_SOUND = require('../../../ios/sounds/ios-sound.mp3');
  const alertSound = useMemo(
    () =>
      new Sound(IOS_SOUND, error => {
        if (error) {
          console.log('Error loading sound: ', error);
        }
      }),
    [IOS_SOUND],
  );

  const [timer, setTimer] = useState(pomodoroTimeInMS);
  const [timerSchedule, setTimerSchedule] = useState(schedule);
  const [isPaused, setIsPaused] = useState(false);
  const [reset, setReset] = useState(false);
  const [scheduleElementCompleted, setScheduleElementCompleted] =
    useState(false);

  const timerShown = millisecondsToTime(timer);
  const timerIdRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (timer < 0) {
      dispatch(updateSettings({property: 'isRunning', value: false}));
      setTimerSchedule(prev => prev.slice(1));
      setScheduleElementCompleted(prev => !prev);
      if (vibration) {
        Vibration.vibrate(1000);
      }
      if (sound) {
        alertSound.play();
      }
    }
  }, [timer, dispatch, vibration, sound, alertSound]);

  useEffect(() => {
    if (timerSchedule.length === 0) {
      setTimerSchedule(schedule);
      setScheduleElementCompleted(prev => !prev);
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
    dispatch(updateSettings({property: 'isRunning', value: !isRunning}));
    setReset(false);
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
    dispatch(updateSettings({property: 'isRunning', value: false}));
    setIsPaused(false);
    setReset(true);
  };

  const pomodoroBulletToBeFilled = timerSchedule.filter(
    bullet => bullet === 'pomodoroTimeInMS',
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <TextContainer>
          <NunitoMedium>Choose your task...</NunitoMedium>
        </TextContainer>
      </View>
      <View style={styles.clockFaceContainer}>
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
      <InspirationalAnimation
        isMoving={isRunning}
        reset={reset}
        scheduleElementCompleted={scheduleElementCompleted}
        isPaused={isPaused}
      />
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
  taskContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  clockFaceContainer: {
    alignItems: 'center',
    width: '100%',
    flex: 4,
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
    marginTop: verticalScale(12),
    marginBottom: verticalScale(32),
  },
});
