import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, Vibration, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import Sound from 'react-native-sound';

//components
import ScheduleBullets from './ScheduleBullets';
import NunitoBold from '../../components/fonts/NunitoBold';
import ClockFace from './clockFace/Index';
import Pause from '../../assets/svg/pause.svg';
import InspirationalAnimation from './inspirationalAnimation/Index';
import ChooseTask from './ChooseTask';
import TimerButtons from './TimerButtons';

//stores
import {
  updateSettings,
  updateTimerType,
} from '../../features/timerSettingsSlice';

//types
import {BottomTabsNavigationProp} from '../../types/navigation';
import {TasksRootState, TimerRootState} from '../../types/types';

//utils
import millisecondsToTime from '../../utils/millisecondsToTime';
import {generateSchedule} from '../../utils/generateSchedule';
import {updateCurrentTaskRepeatsDone} from '../../features/tasksSlice';

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
  const {currentTask} = useSelector((state: TasksRootState) => state.tasks);
  const dispatch = useDispatch();
  const dispatchIsRunning = useCallback(
    (dispatchValue: boolean) => {
      dispatch(updateSettings({property: 'isRunning', value: dispatchValue}));
    },
    [dispatch],
  );
  const dispatchIsPaused = useCallback(
    (dispatchValue: boolean) => {
      dispatch(updateSettings({property: 'isPaused', value: dispatchValue}));
    },
    [dispatch],
  );
  const dispatchCurrentTaskRepeatsDone = useCallback(
    (dispatchValue: number) => {
      dispatch(updateCurrentTaskRepeatsDone(dispatchValue));
    },
    [dispatch],
  );

  const [timerSource, setTimerSource] = useState({
    pomodoroTimeInMS,
    repeats,
    shortBreakTimeInMS,
    longBreakTimeInMS,
  });
  const [timer, setTimer] = useState(timerSource.pomodoroTimeInMS);
  const [timerSchedule, setTimerSchedule] = useState(
    generateSchedule(timerSource.repeats, breaks),
  );
  const [reset, setReset] = useState(false);
  const [scheduleElementCompleted, setScheduleElementCompleted] =
    useState(false);

  const timerShown = millisecondsToTime(timer);
  const timerIdRef = useRef<NodeJS.Timer>();
  const pomodoroBulletToBeFilled = timerSchedule.filter(
    bullet => bullet === 'pomodoroTimeInMS',
  ).length;
  const alertSound = useMemo(
    () =>
      new Sound(IOS_SOUND, error => {
        if (error) {
          console.log('Error loading sound: ', error);
        }
      }),
    [],
  );

  const toggleTimer = useCallback(() => {
    dispatchIsRunning(!isRunning);
    setReset(false);
    dispatchIsPaused(isRunning);
  }, [dispatchIsRunning, dispatchIsPaused, isRunning, setReset]);

  const resetTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    setTimerSchedule(generateSchedule(timerSource.repeats, breaks));
    setTimer(timerSource.pomodoroTimeInMS);
    dispatchIsRunning(false);
    dispatchIsPaused(false);
    setReset(true);
    if (currentTask) {
      dispatchCurrentTaskRepeatsDone(0);
    }
  }, [
    timerSource,
    timerIdRef,
    breaks,
    setTimerSchedule,
    setTimer,
    dispatchIsRunning,
    dispatchIsPaused,
    currentTask,
    dispatchCurrentTaskRepeatsDone,
  ]);

  useEffect(() => {
    setTimerSource(
      currentTask
        ? {
            pomodoroTimeInMS: currentTask.pomodoroTimeInMS,
            repeats: currentTask.repeats,
            shortBreakTimeInMS: currentTask.shortBreakTimeInMS,
            longBreakTimeInMS: currentTask.longBreakTimeInMS,
          }
        : {pomodoroTimeInMS, repeats, shortBreakTimeInMS, longBreakTimeInMS},
    );
    dispatchIsRunning(false);
    setReset(true);
  }, [
    currentTask,
    pomodoroTimeInMS,
    repeats,
    shortBreakTimeInMS,
    longBreakTimeInMS,
    setTimerSource,
    dispatchIsRunning,
  ]);

  useEffect(() => {
    setTimerSchedule(generateSchedule(timerSource.repeats, breaks));
  }, [timerSource.repeats, breaks]);

  useEffect(() => {
    if (timer < 59000) {
      if (currentTask) {
        if (timerSchedule.length === 0) {
          dispatchCurrentTaskRepeatsDone(0);
          Alert.alert(
            //TODO
            'Task completed',
            'You have completed all the repeats of this task',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Tasks');
                },
              },
            ],
          );
          return;
        }
        dispatchCurrentTaskRepeatsDone(
          timerSource.repeats - pomodoroBulletToBeFilled,
        );
      }
    }
  }, [
    timer,
    pomodoroBulletToBeFilled,
    currentTask,
    dispatchCurrentTaskRepeatsDone,
    timerSource.repeats,
    timerSchedule.length,
    navigation,
  ]);

  useEffect(() => {
    if (timer < 59000) {
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
      setTimerSchedule(generateSchedule(timerSource.repeats, breaks));
      setScheduleElementCompleted(prev => !prev);
    }
    const nextTimerType = timerSchedule[0];
    if (nextTimerType === undefined) {
      dispatch(updateTimerType({type: 'pomodoroTimeInMS'}));
      setTimer(timerSource.pomodoroTimeInMS);
      return;
    }
    dispatch(updateTimerType({type: nextTimerType}));

    switch (nextTimerType) {
      case 'pomodoroTimeInMS':
        setTimer(timerSource.pomodoroTimeInMS);
        break;
      case 'shortBreakTimeInMS':
        setTimer(timerSource.shortBreakTimeInMS);
        break;
      case 'longBreakTimeInMS':
        setTimer(timerSource.longBreakTimeInMS);
    }
  }, [timerSource, timerSchedule, dispatch, breaks]);

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

  return (
    <View style={styles.container}>
      <ChooseTask
        navigation={navigation}
        disableChooseTask={isPaused ? true : isRunning}
      />
      <View style={styles.clockFaceContainer}>
        <ClockFace
          timer={timer}
          pomodoroTimeInMS={timerSource.pomodoroTimeInMS}
          shortBreakTimeInMS={timerSource.shortBreakTimeInMS}
          longBreakTimeInMS={timerSource.longBreakTimeInMS}>
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
          numberOfBullets={timerSource.repeats}
          bulletsToBeFilled={
            currentTask
              ? currentTask.repeats - currentTask.repeatsDone
              : pomodoroBulletToBeFilled
          }
          style={styles.scheduleBullets}
        />
        <TimerButtons
          isRunning={isRunning}
          isPaused={isPaused}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
        />
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

  scheduleBullets: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(32),
  },
});
