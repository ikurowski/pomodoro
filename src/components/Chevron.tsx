import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {mix} from 'react-native-redash';
import useTheme from '../hooks/useTheme/useTheme';

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ChevronProps {
  progress: Animated.SharedValue<number>;
}

const Chevron = ({progress}: ChevronProps) => {
  const style = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${mix(progress.value, 0, Math.PI)}rad`}],
  }));

  const {
    navigation: {colors},
  } = useTheme();

  return (
    <Animated.View style={[styles.container, style]}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.text}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M6 9l6 6 6-6" />
      </Svg>
    </Animated.View>
  );
};

export default Chevron;
