import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

//components
import Card from '../../components/Card';
import NunitoSemiBold from '../../components/fonts/NunitoSemiBold';

//types
import {IntervalType, TimerRootState, STORAGE_KEY} from '../../types/types';

//redux
import {updateRepeats, updateTime} from '../../features/timerSettingsSlice';
import {moderateScale} from 'react-native-size-matters';

//utils
import {
  repeats as repeatsArray,
  wheelPickerNumbers,
} from '../../utils/constans';

function Duration() {
  const {
    timers: {pomodoroTimeInMS, shortBreakTimeInMS, longBreakTimeInMS},
    repeats,
  } = useSelector((state: TimerRootState) => state.timer);
  const [openCard, setOpenCard] = useState<string | false>(false);

  const dispatch = useDispatch();

  const createUpdateTimeFunction = (type: IntervalType) => ({
    updateNumberFunction: (wheelPickerTime: number) =>
      dispatch(updateTime({type, wheelPickerTime})),
  });

  const pomodoroUpdateFunction = createUpdateTimeFunction('pomodoroTimeInMS');
  const shortBreakUpdateFunction =
    createUpdateTimeFunction('shortBreakTimeInMS');
  const longBreakUpdateFunction = createUpdateTimeFunction('longBreakTimeInMS');

  const repeatsUpdateFunction = (wheelPickerNumber: number) =>
    dispatch(updateRepeats({repeats: wheelPickerNumber}));

  return (
    <View style={styles.container}>
      <NunitoSemiBold size={20} style={styles.header}>
        Duration
      </NunitoSemiBold>
      <View style={styles.cardsContainer}>
        <Card
          title="Focus time"
          time={pomodoroTimeInMS}
          wheelPickOptions={wheelPickerNumbers}
          openCard={openCard}
          cardEnd={'min'}
          storageKey={STORAGE_KEY.FOCUS_TIME}
          setOpenCard={setOpenCard}
          {...pomodoroUpdateFunction}
        />
        <Card
          title="Short break"
          time={shortBreakTimeInMS}
          wheelPickOptions={wheelPickerNumbers}
          openCard={openCard}
          storageKey={STORAGE_KEY.SHORT_BREAK_TIME}
          cardEnd={'min'}
          setOpenCard={setOpenCard}
          {...shortBreakUpdateFunction}
        />
        <Card
          title="Long break"
          time={longBreakTimeInMS}
          wheelPickOptions={wheelPickerNumbers}
          openCard={openCard}
          storageKey={STORAGE_KEY.LONG_BREAK_TIME}
          cardEnd={'min'}
          setOpenCard={setOpenCard}
          {...longBreakUpdateFunction}
        />
        <Card
          title="Repeats until long break"
          time={repeats}
          millisecondsFormat={false}
          wheelPickOptions={repeatsArray}
          openCard={openCard}
          storageKey={STORAGE_KEY.REPEATS}
          cardEnd={'repeats'}
          setOpenCard={setOpenCard}
          updateNumberFunction={repeatsUpdateFunction}
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
