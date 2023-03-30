import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

//components
import Card from '../Card';
import NunitoBold from '../fonts/NunitoBold';

//types
import {ITask} from '../../types/types';

//redux
import {moderateScale} from 'react-native-size-matters';

//utils
import {
  repeats as repeatsArray,
  wheelPickerNumbers,
} from '../../utils/constans';
import useTheme from '../../hooks/useTheme/useTheme';

function DurationComponentInModal({
  task,
  createUpdateFunction,
}: {
  task: ITask;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
  createUpdateFunction: (taskKey: keyof ITask) => {
    updateNumberFunction: (newTime: number) => void;
  };
}) {
  const [openCard, setOpenCard] = useState<string | false>(false);
  const {
    navigation: {colors},
  } = useTheme();

  const pomodoroUpdateFunction = createUpdateFunction('pomodoroTimeInMS');
  const shortBreakUpdateFunction = createUpdateFunction('shortBreakTimeInMS');
  const longBreakUpdateFunction = createUpdateFunction('longBreakTimeInMS');
  const repeatsUpdateFunction = createUpdateFunction('repeats');

  return (
    <View style={styles.container}>
      <NunitoBold size={16} style={styles.header}>
        Duration
      </NunitoBold>
      <View style={styles.cardsContainer}>
        <Card
          title="Focus time"
          titleColor={colors.text}
          time={task.pomodoroTimeInMS}
          wheelPickOptions={wheelPickerNumbers}
          openCard={openCard}
          cardEnd={'min'}
          setOpenCard={setOpenCard}
          {...pomodoroUpdateFunction}
        />
        <Card
          title="Short break"
          titleColor={colors.text}
          time={task.shortBreakTimeInMS}
          wheelPickOptions={wheelPickerNumbers}
          openCard={openCard}
          cardEnd={'min'}
          setOpenCard={setOpenCard}
          {...shortBreakUpdateFunction}
        />
        <Card
          title="Long break"
          titleColor={colors.text}
          time={task.longBreakTimeInMS}
          wheelPickOptions={wheelPickerNumbers}
          openCard={openCard}
          cardEnd={'min'}
          setOpenCard={setOpenCard}
          {...longBreakUpdateFunction}
        />
        <Card
          title="Repeats until long break"
          titleColor={colors.text}
          time={task.repeats}
          millisecondsFormat={false}
          wheelPickOptions={repeatsArray}
          openCard={openCard}
          cardEnd={'repeats'}
          setOpenCard={setOpenCard}
          {...repeatsUpdateFunction}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  cardsContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  header: {
    alignSelf: 'flex-start',
    marginVertical: moderateScale(6),
  },
});

export default DurationComponentInModal;
