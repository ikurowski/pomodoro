import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Vibration, View} from 'react-native';
import {useSelector} from 'react-redux';
import {scale, verticalScale} from 'react-native-size-matters';

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
import ClockFace from './clockFace/Index';

function Timer() {
  const {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS} = useSelector(
    (state: RootState) => state.timer,
  );

  const [timer, setTimer] = useState(pomodoroTimeInMS);
  const [timerType, setTimerType] = useState<
    'Pomodoro' | 'Short Break' | 'Long Break'
  >('Pomodoro');
  const [timerSchedule, setTimerSchedule] = useState(schedule);

  const [isRunning, setIsRunning] = useState(false);

  const timerShown = millisecondsToTime(timer);
  const timerIdRef = useRef<number>();

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

  const pomodoroBulletToBeFilled = timerSchedule.filter(
    bullet => bullet === 'Pomodoro',
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <NunitoBold size={55}>{timerShown}</NunitoBold>
        <ClockFace />
        <ScheduleBullets
          style={styles.scheduleBullets}
          bulletsToBeFilled={pomodoroBulletToBeFilled}
        />
        <View style={styles.buttonContainer}>
          <BasicButton onPress={resetTimer} moreStyles={styles.resetButton}>
            Reset
          </BasicButton>
          <BasicButton onPress={toggleTimer} filled={true}>
            {isRunning ? 'Pause' : 'Start'}
          </BasicButton>
        </View>
        <RenderCounter message="Timer" />
      </View>
      {/* <ToggleTimerButton toggleTimer={toggleTimer} isRunning={isRunning} /> */}
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
