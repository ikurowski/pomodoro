import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, Vibration, View} from 'react-native';
import {useSelector} from 'react-redux';
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

//types
import {BottomTabsNavigationProp} from '../../types/navigation';
import {STORAGE_KEY, TasksRootState, TimerRootState} from '../../types/types';

//utils
import millisecondsToTime from '../../utils/millisecondsToTime';
import {generateSchedule} from '../../utils/generateSchedule';
import {storeAsyncData} from '../../stores/RNAsyncStorage';
import useFetchAsyncData from '../../hooks/useFetchData';
import useTimerDispatch from '../../hooks/useTimerDispatch';

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
  const {
    dispatchIsRunning,
    dispatchIsPaused,
    dispatchPomodorosToBeFilled,
    dispatchSchedule,
    dispatchRemoveFirstSchedule,
    dispatchUpdateCurrentTaskSchedule,
    dispatchUpdateTimerType,
  } = useTimerDispatch();

  const [timerSource, setTimerSource] = useState({
    // only responsible for the display
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

  const resetTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    dispatchSchedule(generateSchedule(timerSource.repeats)); // TODO reset schedule
    if (currentTask) {
      dispatchUpdateCurrentTaskSchedule(generateSchedule(timerSource.repeats));
    }
    setTimer(timerSource.pomodoroTimeInMS);
    dispatchIsRunning(false);
    dispatchIsPaused(false);
    setReset(true);
  }, [
    timerSource,
    timerIdRef,
    setTimer,
    dispatchIsRunning,
    dispatchIsPaused,
    dispatchSchedule,
    currentTask,
    dispatchUpdateCurrentTaskSchedule,
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
    if (timer < 59000) {
      if (currentTask) {
        dispatchUpdateCurrentTaskSchedule(schedule);
        if (schedule.length === 0) {
          taskCompletedAlert(navigation);
          return;
        }
      }
    }
  }, [
    timer,
    schedule,
    navigation,
    currentTask,
    dispatchUpdateCurrentTaskSchedule,
  ]);

  useEffect(() => {
    if (timer < 59000) {
      dispatchIsRunning(false);
      dispatchRemoveFirstSchedule(breaks);
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
    breaks,
  ]);

  useEffect(() => {
    if (schedule.length === 0) {
      dispatchSchedule(generateSchedule(timerSource.repeats)); // TODO reset schedule
      setScheduleElementCompleted(prev => !prev);
      if (currentTask) {
        dispatchUpdateCurrentTaskSchedule(
          generateSchedule(timerSource.repeats),
        );
      }
    }
    const timerType = breaks ? 'pomodoroTimeInMS' : schedule[0];
    if (timerType === undefined) {
      dispatchUpdateTimerType('pomodoroTimeInMS');

      setTimer(timerSource.pomodoroTimeInMS);
      return;
    }

    dispatchUpdateTimerType(timerType);

    switch (timerType) {
      case 'pomodoroTimeInMS':
        setTimer(timerSource.pomodoroTimeInMS);
        break;
      case 'shortBreakTimeInMS':
        setTimer(timerSource.shortBreakTimeInMS);
        break;
      case 'longBreakTimeInMS':
        setTimer(timerSource.longBreakTimeInMS);
    }
  }, [
    timerSource,
    breaks,
    dispatchUpdateTimerType,
    schedule,
    dispatchSchedule,
    currentTask,
    dispatchUpdateCurrentTaskSchedule,
    scheduleElementCompleted,
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

  useEffect(() => {
    if (currentTask === null) {
      dispatchSchedule(generateSchedule(timerSource.repeats)); // reset schedule
    }
  }, [breaks, dispatchSchedule, currentTask, timerSource.repeats]);

  useEffect(() => {
    if (currentTask?.taskSchedule) {
      dispatchSchedule(currentTask.taskSchedule);
    }
  }, [dispatchSchedule, currentTask?.taskSchedule]);

  useEffect(() => {
    dispatchPomodorosToBeFilled(
      schedule.filter(bullet => bullet === 'pomodoroTimeInMS').length,
    );
  }, [dispatchPomodorosToBeFilled, schedule]);

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
          bulletsToBeFilled={
            currentTask
              ? currentTask.pomodorosToBeFilled
              : schedule.filter(bullet => bullet === 'pomodoroTimeInMS').length
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  clockFaceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 4,
  },
  scheduleBullets: {
    marginTop: verticalScale(22),
    marginBottom: verticalScale(32),
  },
});

export default Timer;
