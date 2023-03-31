import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import WheelPicker from 'react-native-wheely';

//components
import NunitoMedium from './fonts/NunitoMedium';
import Chevron from './Chevron';

//styles
import useTheme from '../hooks/useTheme/useTheme';
import {colors as colorsSheet} from '../styles/styles';

//types
import {CardProps} from '../types/types';

//stores
import {storeAsyncData} from '../storage/RNAsyncStorage';

function Card(props: CardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    navigation: {colors},
  } = useTheme();

  const {
    title,
    titleColor = colors.card,
    time,
    millisecondsFormat = true,
    openCard,
    storageKey = false,
    cardEnd,
    wheelPickOptions,
    setOpenCard,
    updateNumberFunction,
  } = props;

  useEffect(() => {
    setSelectedIndex(time / (millisecondsFormat ? 60000 : 1) - 1);
  }, [time, millisecondsFormat]);

  const wheelPicker = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );
  const height = useSharedValue(0);

  useEffect(() => {
    if (openCard === title) {
      open.value = true;
    } else {
      open.value = false;
    }
  }, [openCard, open, title]);

  const animatedItemsStyle = useAnimatedStyle(() => ({
    height: height.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  const animatedBorderWidth = useAnimatedStyle(() => ({
    borderBottomWidth: progress.value === 0 ? withTiming(0) : withTiming(0.5),
    paddingBottom:
      progress.value === 0
        ? withTiming(0, {duration: 150, easing: Easing.linear})
        : withTiming(10, {duration: 150, easing: Easing.linear}),
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
    setOpenCard(title);
  };

  return (
    <View style={styles.container}>
      <Pressable
        hitSlop={moderateScale(10)}
        style={styles.innerContainer}
        onPress={onPress}>
        <Animated.View style={[styles.titleContainer, animatedBorderWidth]}>
          <NunitoMedium color={titleColor} size={16}>
            {title}
          </NunitoMedium>
          <View style={styles.chevronAndTimeContainer}>
            <NunitoMedium
              color={colors.text}
              size={16}
              style={styles.timeInHeader}>
              {wheelPickOptions[selectedIndex]} {cardEnd}
            </NunitoMedium>
            <Chevron {...{progress}} />
          </View>
        </Animated.View>
      </Pressable>

      <Animated.View style={[styles.items, animatedItemsStyle]}>
        <View ref={wheelPicker}>
          <WheelPicker
            selectedIndex={selectedIndex}
            options={wheelPickOptions}
            onChange={index => {
              setSelectedIndex(index);
              updateNumberFunction(
                Number(wheelPickOptions[index]) *
                  (millisecondsFormat ? 60000 : 1),
              );
              if (storageKey !== false) {
                storeAsyncData(
                  Number(wheelPickOptions[index]) *
                    (millisecondsFormat ? 60000 : 1),
                  storageKey,
                );
              }
            }}
            itemTextStyle={{...styles.numbers, color: colors.text}}
            selectedIndicatorStyle={{
              ...styles.selectedIndicatorStyle,
              backgroundColor: colors.primary,
            }}
            itemHeight={moderateScale(35)}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(9), // one pixel less for compensation of one pixel added to animatedItemsStyle.height
    marginVertical: 4,
    backgroundColor: colorsSheet.lightestGrey,
    borderRadius: moderateScale(25),
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
    borderRadius: moderateScale(8),
  },
  items: {
    overflow: 'hidden',
  },
  numbers: {
    fontFamily: 'Nunito-Regular',
    fontSize: moderateScale(23),
  },
});

export default Card;
