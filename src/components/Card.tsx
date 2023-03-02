import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import WheelPicker from 'react-native-wheely';

//components
import NunitoMedium from './fonts/NunitoMedium';

//utils
import {wheelPickerNumbers} from '../utils/constans';

//styles
import useTheme from '../hooks/useTheme/useTheme';
import {colors as colorsSheet} from '../styles/styles';

function Card({
  title,
  time,
  updateTimeFunction,
}: {
  title: string;
  time: number;
  updateTimeFunction: (wheelPickerTime: number) => void;
}) {
  const initialWheelPickerTime = time / 1000 - 1;
  const [selectedIndex, setSelectedIndex] = useState(initialWheelPickerTime);

  const wheelPicker = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value
      ? withSpring(1, {
          mass: 0.9,
          stiffness: 75,
        })
      : withTiming(0),
  );
  const height = useSharedValue(0);

  useEffect(() => {
    updateTimeFunction((selectedIndex + 1) * 60000);
  }, [selectedIndex, updateTimeFunction]);

  const animatedItemsStyle = useAnimatedStyle(() => ({
    height: height.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));
  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderRadius: progress.value === 0 ? 60 : 22,
  }));

  const onPress = () => {
    if (height.value === 0) {
      runOnUI(() => {
        'worklet';
        const wheelPickerViewDimensions = measure(wheelPicker);
        height.value = wheelPickerViewDimensions
          ? wheelPickerViewDimensions.height
          : 0;
      })();
    }
    open.value = !open.value;
  };

  const {
    navigation: {colors},
  } = useTheme();

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Pressable
        hitSlop={moderateScale(10)}
        style={styles.innerContainer}
        onPress={onPress}>
        <NunitoMedium color={colors.card} size={16}>
          {title}
        </NunitoMedium>
        <NunitoMedium color={colors.card} size={16}>
          TEST
        </NunitoMedium>
      </Pressable>

      <Animated.View style={[styles.items, animatedItemsStyle]}>
        <View ref={wheelPicker}>
          <WheelPicker
            selectedIndex={selectedIndex}
            options={wheelPickerNumbers}
            onChange={index => {
              setSelectedIndex(index);
            }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(9), // one pixel less for compensation of one pixel added to animatedItemsStyle.height
    paddingHorizontal: moderateScale(20),
    margin: 4, //FIXME remove this
    backgroundColor: colorsSheet.lightestGrey,
    borderRadius: 60,
    // borderRadius: 25,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wheelPicker: {
    // borderWidth: 1,
    // borderColor: 'red',
  },
  items: {
    overflow: 'hidden',
  },
});
