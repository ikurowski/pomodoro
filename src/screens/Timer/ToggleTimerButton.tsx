import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import PoppinsRegular from '../../components/fonts/PoppinsRegular';
import {ToggleTimerButtonProps} from '../../types/types';

function ToggleTimerButton({toggleTimer, isRunning}: ToggleTimerButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={toggleTimer}>
        <PoppinsRegular>{isRunning ? 'Stop' : 'Start'}</PoppinsRegular>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default ToggleTimerButton;
