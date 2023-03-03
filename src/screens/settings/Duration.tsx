import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

//components
import Card from '../../components/Card';
import NunitoSemiBold from '../../components/fonts/NunitoSemiBold';

//types
import {IntervalType, RootState} from '../../types/types';

//redux
import {updateTime} from '../../features/timerSettingsSlice';

function Duration() {
  const {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS} = useSelector(
    (state: RootState) => state.timer.timers,
  );

  const dispatch = useDispatch();

  const createUpdateTimeFunction = (type: IntervalType) => ({
    updateTimeFunction: (wheelPickerTime: number) =>
      dispatch(updateTime({type, wheelPickerTime})),
  });

  const pomodoroUpdateFunction = createUpdateTimeFunction('pomodoroTimeInMS');
  const shortBreakUpdateFunction =
    createUpdateTimeFunction('shortBreakTimeInMS');
  const longBreakUpdateFunction = createUpdateTimeFunction('longBreakTimeInMS');

  return (
    <View style={styles.container}>
      <NunitoSemiBold size={20} style={styles.header}>
        Duration
      </NunitoSemiBold>
      <View style={styles.cardsContainer}>
        <Card
          title="Focus Time"
          time={pomodoroTimeInMS}
          {...pomodoroUpdateFunction}
        />
        <Card
          title="Short Break"
          time={shortBreakTimeInMS}
          {...shortBreakUpdateFunction}
        />
        <Card
          title="Long Break"
          time={longBreakTimeInMS}
          {...longBreakUpdateFunction}
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
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  header: {
    alignSelf: 'flex-start',
  },
});
