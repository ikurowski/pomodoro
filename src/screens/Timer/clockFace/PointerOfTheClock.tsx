import React from 'react';
import {View, PixelRatio, StyleSheet} from 'react-native';
import {CircularProgress} from './CircularProgress';

const PointerOfTheClock = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ringChartContainer}>
        <CircularProgress
          radius={radius}
          backgroundColor="#F7FAF3"
          percentageComplete={60}
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
