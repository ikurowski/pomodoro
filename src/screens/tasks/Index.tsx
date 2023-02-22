import React from 'react';
import {StyleSheet, View} from 'react-native';
import RenderCounter from '../../utils/RenderCounter';
import PointerOfTheClock from '../timer/clockFace/PointerOfTheClock';

function Tasks() {
  return (
    <View style={styles.container}>
      <RenderCounter message="Tasks" />
      <PointerOfTheClock />
    </View>
  );
}

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
