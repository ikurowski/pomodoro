import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, Vibration, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import Sound from 'react-native-sound';

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
import ChooseTask from './ChooseTask';

//types
import {BottomTabsNavigationProp} from '../../types/navigation';
import {TimerRootState} from '../../types/types';

//utils
import millisecondsToTime from '../../utils/millisecondsToTime';
import {generateSchedule} from '../../utils/generateSchedule';

const IOS_SOUND = require('../../../ios/sounds/ios-sound.mp3');

function Timer({navigation}: {navigation: BottomTabsNavigationProp}) {
  const {
    timers: {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS},
    isRunning,
    sound,
    vibration,
    isPaused,
    repeats,
    breaks,
  } = useSelector((state: TimerRootState) => state.timer);
  const dispatch = useDispatch();
  const dispatchIsRunning = useCallback(
    (dispatchValue: boolean) => {
      dispatch(updateSettings({property: 'isRunning', value: dispatchValue}));
    },
    [dispatch],
  );
  const dispatchIsPaused = (dispatchValue: boolean) => {
    dispatch(updateSettings({property: 'isPaused', value: dispatchValue}));
  };

  const alertSound = useMemo(
    () =>
      new Sound(IOS_SOUND, error => {
        if (error) {
          console.log('Error loading sound: ', error);
        }
      }),
    [],
  );

  const [timer, setTimer] = useState(pomodoroTimeInMS);
  const [timerSchedule, setTimerSchedule] = useState(
    generateSchedule(repeats, breaks),
  );
  const [reset, setReset] = useState(false);
  const [scheduleElementCompleted, setScheduleElementCompleted] =
    useState(false);

  const timerShown = millisecondsToTime(timer);
  const timerIdRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    setTimerSchedule(generateSchedule(repeats, breaks));
  }, [repeats, breaks]);

  useEffect(() => {
    if (timer < 0) {
      dispatchIsRunning(false);
      setTimerSchedule(prev => prev.slice(1));
      setScheduleElementCompleted(prev => !prev);
      if (vibration) {
        Vibration.vibrate(1000);
      }
      if (sound) {
        alertSound.play();
      }
    }
  }, [timer, dispatchIsRunning, vibration, sound, alertSound]);

  useEffect(() => {
    if (timerSchedule.length === 0) {
      setTimerSchedule(generateSchedule(repeats, breaks));
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
    repeats,
    breaks,
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
    dispatchIsRunning(!isRunning);
    setReset(false);
    dispatchIsPaused(isRunning);
  };

  const resetTimer = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    setTimerSchedule(generateSchedule(repeats, breaks));
    setTimer(pomodoroTimeInMS);
    dispatchIsRunning(false);
    dispatchIsPaused(false);
    setReset(true);
  };

  const pomodoroBulletToBeFilled = timerSchedule.filter(
    bullet => bullet === 'pomodoroTimeInMS',
  ).length;

  return (
    <View style={styles.container}>
      <ChooseTask
        navigation={navigation}
        disableChooseTask={isPaused ? true : isRunning}
      />
      <View style={styles.clockFaceContainer}>
        <ClockFace timer={timer}>
          {isPaused ? (
            <Animated.View
              key={'pause'} // this is needed for animation to work
              entering={FadeIn.delay(300)}
              exiting={FadeOut}>
              <Pressable onPress={toggleTimer}>
                <Pause width={moderateScale(52)} height={moderateScale(82)} />
              </Pressable>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn.delay(300)} exiting={FadeOut}>
              <NunitoBold size={55}>{timerShown}</NunitoBold>
            </Animated.View>
          )}
        </ClockFace>
        <ScheduleBullets
          numberOfBullets={repeats}
          bulletsToBeFilled={pomodoroBulletToBeFilled}
          style={styles.scheduleBullets}
        />
        <View style={styles.buttonContainer}>
          <BasicButton onPress={resetTimer} moreStyles={styles.resetButton}>
            Reset
          </BasicButton>
          <BasicButton onPress={toggleTimer} filled={true}>
            {isRunning ? 'Pause' : !isPaused ? 'Start' : 'Resume'}
          </BasicButton>
        </View>
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
  clockFaceContainer: {
    alignItems: 'center',
    width: '100%',
    flex: 4,
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
