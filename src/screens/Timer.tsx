import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RenderCounter} from '../utils/utils';
import PoppinsRegular from '../components/fonts/PoppinsRegular';

function Timer() {
  return (
    <View style={styles.container}>
      <PoppinsRegular>Timer</PoppinsRegular>
      <RenderCounter message="Timer" />
    </View>
  );
}

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
