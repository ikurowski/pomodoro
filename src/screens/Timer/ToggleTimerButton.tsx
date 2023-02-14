import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';

//components
import PoppinsRegular from '../../components/fonts/PoppinsRegular';

//types
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
  },
});

export default ToggleTimerButton;
