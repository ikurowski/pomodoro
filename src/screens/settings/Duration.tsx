import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

//components
import Card from '../../components/Card';
import NunitoRegular from '../../components/fonts/NunitoRegular';

//types
import {IntervalType, RootState} from '../../types/types';

//redux
import {updateTime} from '../../features/timerSettingsSlice';

function Duration() {
  const {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS} = useSelector(
    (state: RootState) => state.timer.timers,
  );

  const dispatch = useDispatch();

  const createButtonPressFunctions = (type: IntervalType) => ({
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
      <NunitoRegular>Duration</NunitoRegular>
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
