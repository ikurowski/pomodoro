import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

//components
import Card from '../../components/Card';
import NunitoSemiBold from '../../components/fonts/NunitoSemiBold';

//types
import {IntervalType, RootState} from '../../types/types';

//redux
import {updateTime} from '../../features/timerSettingsSlice';
import {moderateScale} from 'react-native-size-matters';

//storage
import {STORAGE_KEY} from '../../stores/RNAsyncStorage';

function Duration() {
  const {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS} = useSelector(
    (state: RootState) => state.timer.timers,
  );
  const [openCard, setOpenCard] = useState<string | false>(false);

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
          openCard={openCard}
          storageKey={STORAGE_KEY.FOCUS_TIME}
          setOpenCard={setOpenCard}
          {...pomodoroUpdateFunction}
        />
        <Card
          title="Short Break"
          time={shortBreakTimeInMS}
          openCard={openCard}
          storageKey={STORAGE_KEY.SHORT_BREAK_TIME}
          setOpenCard={setOpenCard}
          {...shortBreakUpdateFunction}
        />
        <Card
          title="Long Break"
          time={longBreakTimeInMS}
          openCard={openCard}
          storageKey={STORAGE_KEY.LONG_BREAK_TIME}
          setOpenCard={setOpenCard}
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
    marginTop: moderateScale(12),
  },
  header: {
    alignSelf: 'flex-start',
  },
});
