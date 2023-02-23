import React from 'react';
import {View, PixelRatio, StyleSheet} from 'react-native';
import {CircularProgress} from './CircularProgress';

const PointerOfTheClock = ({
  isRunning,
  timer,
}: {
  isRunning: boolean;
  timer: number;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.ringChartContainer}>
        <CircularProgress
          isRunning={isRunning}
          timer={timer}
          radius={radius}
          backgroundColor="#F7FAF3"
        />
      </View>
    </View>
  );
};

const radius = PixelRatio.roundToNearestPixel(130);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
});

export default PointerOfTheClock;
