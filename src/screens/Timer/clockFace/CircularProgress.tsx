import React, {FC} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Svg, Circle} from 'react-native-svg';

type CircularProgressProps = {
  // strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: number;
};

export const CircularProgress: FC<CircularProgressProps> = ({
  radius,
  backgroundColor,
  percentageComplete,
}) => {
  const halfRadius = radius / 2;
  const circumfrence = 2 * Math.PI * halfRadius;
  const completion = percentageComplete / 100;

  const theta = useSharedValue(2 * Math.PI);
  const animateTo = useDerivedValue(() => 2 * Math.PI * completion);
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(theta.value * halfRadius, {
        duration: 1500,
      }),
    };
  });

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={radius}
          cy={radius}
          fill={'transparent'}
          r={halfRadius}
          opacity=".1"
          stroke={backgroundColor}
          strokeWidth={radius}
          strokeDasharray={`${circumfrence} ${circumfrence}`}
          strokeDashoffset={-circumfrence * completion}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </Svg>
      <Button
        title="Animate!"
        onPress={() => {
          theta.value = animateTo.value;
          console.log('animateTo.value: ', animateTo.value);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
