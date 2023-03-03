import React, {useState} from 'react';
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

//components
import NunitoMedium from './fonts/NunitoMedium';

//utils
import {wheelPickerNumbers} from '../utils/constans';

//styles
import useTheme from '../hooks/useTheme/useTheme';
import {colors as colorsSheet} from '../styles/styles';
import WheelPicker from 'react-native-wheely';
import Chevron from './Chevron';

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

  const animatedItemsStyle = useAnimatedStyle(() => ({
    height: height.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));
  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderRadius: open.value
      ? withTiming(30, {duration: 600})
      : withTiming(40, {duration: 1000}),
  }));
  const animatedBorderWidth = useAnimatedStyle(() => ({
    borderBottomWidth: progress.value === 0 ? withTiming(0) : withTiming(1),
    paddingBottom: progress.value === 0 ? withTiming(0) : withTiming(10),
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
        <Animated.View style={[styles.titleContainer, animatedBorderWidth]}>
          <NunitoMedium color={colors.card} size={16}>
            {title}
          </NunitoMedium>
          <View style={styles.chevronAndTimeContainer}>
            <NunitoMedium
              color={colors.text}
              size={16}
              style={styles.timeInHeader}>
              {wheelPickerNumbers[selectedIndex]} min
            </NunitoMedium>
            <Chevron {...{progress}} />
          </View>
        </Animated.View>
      </Pressable>

      <Animated.View style={[styles.items, animatedItemsStyle]}>
        <View ref={wheelPicker}>
          <WheelPicker
            selectedIndex={selectedIndex}
            options={wheelPickerNumbers}
            onChange={index => {
              setSelectedIndex(index);
              updateTimeFunction(Number(wheelPickerNumbers[index]) * 60000);
              console.log('Czas', Number(wheelPickerNumbers[index]));
            }}
            itemTextStyle={{...styles.numbers, color: colors.text}}
            selectedIndicatorStyle={{
              ...styles.selectedIndicatorStyle,
              backgroundColor: colors.primary,
            }}
            itemHeight={moderateScale(30)}
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
    margin: 4, //FIXME remove this
    backgroundColor: colorsSheet.lightestGrey,
    borderRadius: 60,
    // borderRadius: 25,
  },
  innerContainer: {
    paddingHorizontal: moderateScale(20),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colorsSheet.lightGrey,
  },
  chevronAndTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInHeader: {
    marginRight: moderateScale(8),
  },
  selectedIndicatorStyle: {
    borderRadius: 8,
  },
  items: {
    overflow: 'hidden',
  },
  numbers: {
    fontFamily: 'Nunito-Regular',
    fontSize: moderateScale(23),
  },
});
