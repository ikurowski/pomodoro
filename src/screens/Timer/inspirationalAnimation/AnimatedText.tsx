import React, {Dispatch, SetStateAction, useEffect} from 'react';
import Animated, {
  Easing,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {withPause} from 'react-native-redash';
import {StyleSheet} from 'react-native';
import NunitoSemiBold from '../../../components/fonts/NunitoSemiBold';
import TextContainer from '../../../components/TextContainer';

function AnimatedText({
  item,
  index,
  isMoving,
}: {
  item: string;
  index: number;
  isMoving: boolean;
  setAnimationArray: Dispatch<SetStateAction<string[]>>;
}) {
  const isEven = index % 2 === 0;
  const alignment = isEven ? 'flex-start' : 'flex-end';

  const positionY = useSharedValue(200);
  const opacity = useSharedValue(1);
  const paused = useSharedValue(false);

  useEffect(() => {
    positionY.value = withPause(
      withTiming(
        0,
        {
          duration: 14000,
          easing: Easing.linear,
        },
        () => {
          opacity.value = withTiming(0, {duration: 1000});
          positionY.value = withTiming(-10, {
            duration: 1000,
            easing: Easing.linear,
          });
        },
      ),

      paused,
    );
  }, [index, positionY, opacity, paused]);

  useEffect(() => {
    if (isMoving) {
      paused.value = false;
    } else {
      paused.value = true;
    }
  }, [isMoving, paused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: positionY.value}],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      entering={isEven ? SlideInLeft : SlideInRight}
      exiting={isEven ? SlideOutLeft : SlideOutRight}
      style={[styles.listItemContainer, animatedStyle, {alignSelf: alignment}]}>
      <TextContainer>
        <NunitoSemiBold size={16}>{item}</NunitoSemiBold>
      </TextContainer>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    position: 'absolute',
  },
});

export default React.memo(AnimatedText);
