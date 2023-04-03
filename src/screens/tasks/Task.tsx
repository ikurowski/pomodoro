import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Animated, {FadeOut, Layout} from 'react-native-reanimated';

//components
import NunitoMedium from '../../components/fonts/NunitoMedium';
import XIconCircle from '../../assets/svg/x-icon-circle.svg';

//styles
import useTheme from '../../hooks/useTheme/useTheme';
import {colors as colorsSheet} from '../../styles/styles';

//types
import {TaskProps} from '../../types/types';

//utils
import millisecondsToTime from '../../utils/millisecondsToTime';

function Task({task, onXPress, onPress = () => {}}: TaskProps) {
  const {
    navigation: {colors},
  } = useTheme();

  const minutes = millisecondsToTime(task.pomodoroTimeInMS, true);

  return (
    <Animated.View exiting={FadeOut} layout={Layout} style={styles.container}>
      <Pressable
        style={styles.pressableContainer}
        onPress={() => {
          onPress(task.id);
        }}>
        <View style={styles.taskNameContainer}>
          <NunitoMedium size={16}>{task.name}</NunitoMedium>
          <NunitoMedium size={12} color={colors.card}>
            {minutes} min
          </NunitoMedium>
        </View>
        <View style={styles.timerFractionContainer}>
          <NunitoMedium size={16}>
            {task.repeats - task.pomodorosToBeFilled}/{task.repeats}
          </NunitoMedium>
          <NunitoMedium size={12} color={colors.card}>
            {Number(minutes) * task.repeats} min
          </NunitoMedium>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          onXPress(task);
        }}>
        <XIconCircle width={moderateScale(29)} height={moderateScale(29)} />
      </Pressable>
    </Animated.View>
  );
}

export default Task;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: moderateScale(12),
    backgroundColor: colorsSheet.lightestGrey,
    marginVertical: moderateScale(4),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(9),
  },
  pressableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  taskNameContainer: {
    flex: 3,
  },
  timerFractionContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
