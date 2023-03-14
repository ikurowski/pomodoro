import React, {memo} from 'react';
import Animated from 'react-native-reanimated';
import {Circle} from 'react-native-svg';
import {UseAnimatedProps} from '../../../types/types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type AnimatedCircleProps = {
  animatedProps: Partial<UseAnimatedProps>;
  cx: number;
  cy: number;
  fill: string;
  r: number;
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
  transform: string;
};

const MemoizedAnimatedCircle = memo<AnimatedCircleProps>(
  ({
    animatedProps,
    cx,
    cy,
    fill,
    r,
    stroke,
    strokeWidth,
    strokeDasharray,
    transform,
  }) => (
    <AnimatedCircle
      animatedProps={animatedProps}
      cx={cx}
      cy={cy}
      fill={fill}
      r={r}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      transform={transform}
    />
  ),
);

export default MemoizedAnimatedCircle;
