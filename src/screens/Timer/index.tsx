import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RenderCounter} from '../../utils/RenderCounter';
import PoppinsRegular from '../../components/fonts/PoppinsRegular';
import millisecondsToTime from '../../utils/millisecondsToTime';
import ToggleTimerButton from './ToggleTimerButton';
import ResetButton from './ResetButton';

const defaultTimer = 1500000; // 25 minutes

function Timer() {
  const [timer, setTimer] = useState(defaultTimer);
  const [isRunning, setIsRunning] = useState(false);

  const timerShown = millisecondsToTime(timer);
  const timerIdRef = useRef<number>();

  const toggleTimer = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    if (!isRunning) {
      timerIdRef.current = setInterval(() => {
        setTimer(prev => prev - 1000);
      }, 1000);
    }
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    setTimer(defaultTimer);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <PoppinsRegular>{timerShown}</PoppinsRegular>
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
});
