import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, Vibration, View} from 'react-native';
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
import taskCompletedAlert from './taskCompletedAlert';

//stores
import {
  removeFirstSchedule,
  updateSchedule,
  updateSettings,
  updateTimerType,
} from '../../features/timerSettingsSlice';

//types
import {BottomTabsNavigationProp} from '../../types/navigation';
import {
  IntervalType,
  STORAGE_KEY,
  TasksRootState,
  TimerRootState,
} from '../../types/types';

//utils
import millisecondsToTime from '../../utils/millisecondsToTime';
import {generateSchedule} from '../../utils/generateSchedule';
import {updatePomodorosToBeFilled} from '../../features/tasksSlice';
import {storeAsyncData} from '../../stores/RNAsyncStorage';
import useFetchAsyncData from '../../hooks/useFetchData';

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
    schedule,
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
  const dispatchPomodorosToBeFilled = useCallback(
    (dispatchValue: number) => {
      dispatch(updatePomodorosToBeFilled(dispatchValue));
    },
    [dispatch],
  );
  const dispatchSchedule = useCallback(
    (dispatchValue: IntervalType[]) => {
      dispatch(updateSchedule({schedule: dispatchValue}));
    },
    [dispatch],
  );
  const dispatchRemoveFirstSchedule = useCallback(() => {
    dispatch(removeFirstSchedule());
  }, [dispatch]);

  const [timerSource, setTimerSource] = useState({
    pomodoroTimeInMS,
    repeats,
    shortBreakTimeInMS,
    longBreakTimeInMS,
  });
  const [timer, setTimer] = useState(timerSource.pomodoroTimeInMS);
  const [reset, setReset] = useState(false);
  const [scheduleElementCompleted, setScheduleElementCompleted] =
    useState(false);

  const timerShown = millisecondsToTime(timer);
  const timerIdRef = useRef<NodeJS.Timer>();
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

  const [pomodoroBulletsToBeFilled, setPomodoroBulletsToBeFilled] = useState(0);

  const resetTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    dispatchSchedule(generateSchedule(timerSource.repeats, breaks));
    setTimer(timerSource.pomodoroTimeInMS);
    dispatchIsRunning(false);
    dispatchIsPaused(false);
    setReset(true);
  }, [
    timerSource,
    timerIdRef,
    breaks,
    dispatchSchedule,
    setTimer,
    dispatchIsRunning,
    dispatchIsPaused,
  ]);
  useFetchAsyncData();

  useEffect(() => {
    setTimerSource(
      currentTask
        ? {
            pomodoroTimeInMS: currentTask.pomodoroTimeInMS,
            repeats: currentTask.repeats,
            shortBreakTimeInMS: currentTask.shortBreakTimeInMS,
            longBreakTimeInMS: currentTask.longBreakTimeInMS,
          }
        : {
            pomodoroTimeInMS,
            repeats,
            shortBreakTimeInMS,
            longBreakTimeInMS,
          },
    );
    dispatchIsRunning(false);
    setReset(true);
  }, [
    currentTask,
    pomodoroTimeInMS,
    repeats,
    shortBreakTimeInMS,
    longBreakTimeInMS,
    dispatchIsRunning,
  ]);

  useEffect(() => {
    dispatchSchedule(generateSchedule(timerSource.repeats, breaks));
  }, [timerSource.repeats, breaks, dispatchSchedule]);

  useEffect(() => {
    if (timer < 59000) {
      if (currentTask) {
        if (schedule.length === 0) {
          taskCompletedAlert(navigation);
          return;
        }
      }
    }
  }, [timer, schedule.length, navigation, currentTask]);

  useEffect(() => {
    if (timer < 59000) {
      dispatchIsRunning(false);
      dispatchRemoveFirstSchedule();
      setScheduleElementCompleted(prev => !prev);
      if (vibration) {
        Vibration.vibrate(1000);
      }
      if (sound) {
        alertSound.play();
      }
    }
  }, [
    timer,
    dispatchIsRunning,
    vibration,
    sound,
    alertSound,
    dispatchRemoveFirstSchedule,
  ]);

  useEffect(() => {
    if (schedule.length === 0) {
      dispatchSchedule(generateSchedule(timerSource.repeats, breaks));
      setScheduleElementCompleted(prev => !prev);
    }
    const nextTimerType = schedule[0];
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
  }, [timerSource, dispatch, breaks, schedule, dispatchSchedule]);

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

  useEffect(() => {
    setPomodoroBulletsToBeFilled(
      schedule.filter(bullet => bullet === 'pomodoroTimeInMS').length,
    );
    dispatchPomodorosToBeFilled(pomodoroBulletsToBeFilled);
  }, [pomodoroBulletsToBeFilled, dispatchPomodorosToBeFilled, schedule]);

  useEffect(() => {
    storeAsyncData(schedule, STORAGE_KEY.SCHEDULE);
  }, [schedule]);

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
          bulletsToBeFilled={pomodoroBulletsToBeFilled}
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
