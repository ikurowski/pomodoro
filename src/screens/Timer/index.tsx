import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

//types
import {RootState} from '../../app/store';

//utils
import RenderCounter from '../../utils/RenderCounter';
import millisecondsToTime from '../../utils/millisecondsToTime';
import {schedule} from '../../utils/constans';

//components
import PoppinsRegular from '../../components/fonts/PoppinsRegular';
import ResetButton from './ResetButton';
import ToggleTimerButton from './ToggleTimerButton';

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
      if (timerSchedule.length === 0) {
        setTimerSchedule(schedule);
      }
      setTimerSchedule(prev => prev.slice(1));
      const nextTimerType = timerSchedule[1];
      setTimerType(nextTimerType);
      switch (nextTimerType) {
        case 'Pomodoro':
          setTimer(1000); //pomodoroTimeInMS
          break;
        case 'Short Break':
          setTimer(2000); //shortBreakTimeInMS
          break;
        case 'Long Break':
          setTimer(3000); //longBreakTimeInMS
          break;
      }
    }
  }, [timer, timerType, timerSchedule]);

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

  return (
    <View style={{...styles.container, paddingBottom: insets.bottom}}>
      <View style={styles.textContainer}>
        <PoppinsRegular size={60}>{timerShown}</PoppinsRegular>
        <PoppinsRegular style={styles.title}>{timerType}</PoppinsRegular>
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
    borderWidth: 1,
    borderColor: 'red',
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
  title: {
    textAlign: 'center',
  },
});
