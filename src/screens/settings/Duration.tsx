import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

//components
import Card from '../../components/Card';
import PoppinsRegular from '../../components/fonts/PoppinsRegular';

//types
import {RootState, TimerSettingsState} from '../../types/types';

//redux
import {updateTime} from '../../features/timerSettingsSlice';

function Duration() {
  const {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS} = useSelector(
    (state: RootState) => state.timer,
  );

  const dispatch = useDispatch();

  const createButtonPressFunctions = (type: keyof TimerSettingsState) => ({
    leftButtonPress: () => {
      dispatch(updateTime({type, amount: -60000}));
    },
    rightButtonPress: () => {
      dispatch(updateTime({type, amount: 60000}));
    },
  });

  const pomodoroButtonPressFunctions =
    createButtonPressFunctions('pomodoroTimeInMS');
  const shortBreakButtonPressFunctions =
    createButtonPressFunctions('shortBreakTimeInMS');
  const longBreakButtonPressFunctions =
    createButtonPressFunctions('longBreakTimeInMS');

  return (
    <View style={styles.container}>
      <PoppinsRegular>Duration</PoppinsRegular>
      <View style={styles.cardsContainer}>
        <Card
          title="Pomodoro"
          time={pomodoroTimeInMS}
          {...pomodoroButtonPressFunctions}
        />
        <Card
          title="Short Break"
          time={shortBreakTimeInMS}
          {...shortBreakButtonPressFunctions}
        />
        <Card
          title="Long Break"
          time={longBreakTimeInMS}
          {...longBreakButtonPressFunctions}
        />
      </View>
    </View>
  );
}

export default Duration;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});
