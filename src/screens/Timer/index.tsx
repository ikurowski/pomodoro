import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

//types
import {RootState} from '../../app/store';

//utils
import RenderCounter from '../../utils/RenderCounter';
import millisecondsToTime from '../../utils/millisecondsToTime';

//components
import PoppinsRegular from '../../components/fonts/PoppinsRegular';
import ResetButton from './ResetButton';
import ToggleTimerButton from './ToggleTimerButton';

function Timer() {
  const {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS} = useSelector(
    (state: RootState) => state.timer,
  );

  const [timer, setTimer] = useState(pomodoroTimeInMS);
  const [isRunning, setIsRunning] = useState(false);

  const timerShown = millisecondsToTime(timer);
  const timerIdRef = useRef<number>();
  const insets = useSafeAreaInsets();

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
    setTimer(pomodoroTimeInMS);
    setIsRunning(false);
  };

  return (
    <View style={{...styles.container, paddingBottom: insets.bottom}}>
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
