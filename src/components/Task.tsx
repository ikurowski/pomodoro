import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import useTheme from '../hooks/useTheme/useTheme';
import NunitoMedium from './fonts/NunitoMedium';
import {colors as colorsSheet} from '../styles/styles';
import {moderateScale} from 'react-native-size-matters';
import XIconCircle from '../assets/svg/x-icon-circle.svg';
import millisecondsToTime from '../utils/millisecondsToTime';

interface TaskProps {
  name: string;
  timeInMS: number;
  repeatsDone: number;
  repeats: number;
  onPress: () => void;
}

function Task({name, timeInMS, repeatsDone, repeats, onPress}: TaskProps) {
  const {
    navigation: {colors},
  } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.taskNameContainer}>
        <NunitoMedium size={16}>{name}</NunitoMedium>
        <NunitoMedium size={12} color={colors.card}>
          {millisecondsToTime(timeInMS, true)} min
        </NunitoMedium>
      </View>
      <View style={styles.timerFractionContainer}>
        <NunitoMedium size={16}>
          {repeatsDone}/{repeats}
        </NunitoMedium>
        <NunitoMedium size={12} color={colors.card}>
          {Number(millisecondsToTime(timeInMS, true)) * repeats} min
        </NunitoMedium>
      </View>
      <Pressable onPress={onPress} style={styles.XButtonContainer}>
        <XIconCircle width={moderateScale(29)} height={moderateScale(29)} />
      </Pressable>
    </View>
  );
}

export default Task;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colorsSheet.lightestGrey,
    marginVertical: moderateScale(4),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(9),
  },
  taskNameContainer: {
    flex: 3,
  },
  timerFractionContainer: {
    flex: 1,
    alignItems: 'center',
  },
  XButtonContainer: {},
});
