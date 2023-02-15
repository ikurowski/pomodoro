import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Vibration, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

//types
import {RootState} from '../../types/types';

//utils
import RenderCounter from '../../utils/RenderCounter';
import millisecondsToTime from '../../utils/millisecondsToTime';
import {schedule} from '../../utils/constans';

//components
import PoppinsRegular from '../../components/fonts/PoppinsRegular';
import ResetButton from './ResetButton';
import ToggleTimerButton from './ToggleTimerButton';
import ScheduleMarks from './ScheduleMarks';

function Timer() {
  const {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS} = useSelector(
    (state: RootState) => state.timer,
  );

  const [timer, setTimer] = useState(1000); //pomodoroTimeInMS
  const [timerType, setTimerType] = useState<
    'Pomodoro' | 'Short Break' | 'Long Break'
  >('Pomodoro');
  const [timerSchedule, setTimerSchedule] = useState(schedule);

  const [isRunning, setIsRunning] = useState(false);

  const timerShown = millisecondsToTime(timer);
  const timerIdRef = useRef<number>();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (timer < 0) {
      setIsRunning(false);
      setTimerSchedule(prev => prev.slice(1));
      Vibration.vibrate();
    }
  }, [timer]);

  useEffect(() => {
    if (timerSchedule.length === 0) {
      setTimerSchedule(schedule);
    }
    const nextTimerType = timerSchedule[0];
    setTimerType(nextTimerType);
    switch (nextTimerType) {
      case 'Pomodoro':
        setTimer(pomodoroTimeInMS);
        break;
      case 'Short Break':
        setTimer(shortBreakTimeInMS);
        break;
      case 'Long Break':
        setTimer(longBreakTimeInMS);
    }
  }, [timerSchedule, longBreakTimeInMS, shortBreakTimeInMS, pomodoroTimeInMS]);

  useEffect(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }

    if (isRunning) {
      timerIdRef.current = setInterval(() => {
        setTimer(prev => {
          return prev - 1000;
        });
      }, 1000);
    }
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    setTimerSchedule(schedule);
    setTimer(pomodoroTimeInMS);
    setIsRunning(false);
  };

  const pomodoroMarksToBeFilled = timerSchedule.filter(
    mark => mark === 'Pomodoro',
  ).length;

  return (
    <View
      style={{
        ...styles.container,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <View style={styles.textContainer}>
        <PoppinsRegular size={80}>{timerShown}</PoppinsRegular>
        <PoppinsRegular style={styles.title}>{timerType}</PoppinsRegular>
        <ScheduleMarks marksToBeFilled={pomodoroMarksToBeFilled} />
      </View>
      <ToggleTimerButton toggleTimer={toggleTimer} isRunning={isRunning} />
      <ResetButton resetTimer={resetTimer} />
      <RenderCounter message="Timer" />
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
  textContainer: {
    justifyContent: 'center',
    flex: 3,
  },
  title: {
    textAlign: 'center',
  },
});
