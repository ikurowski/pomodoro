import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';

//components
import NunitoRegular from '../../components/fonts/NunitoRegular';

//types
import {ToggleTimerButtonProps} from '../../types/types';

function ToggleTimerButton({toggleTimer, isRunning}: ToggleTimerButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={toggleTimer}>
        <NunitoRegular size={35}>
          {isRunning ? 'Stop' : 'Start'}
        </NunitoRegular>
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
