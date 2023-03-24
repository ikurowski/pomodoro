import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';

//components
import BasicButton from '../../components/buttons/BasicButton';

//types
import {TimerButtonProps} from '../../types/types';

function TimerButtons({
  resetTimer,
  toggleTimer,
  isRunning,
  isPaused,
}: TimerButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <BasicButton onPress={resetTimer} moreStyles={styles.resetButton}>
        Reset
      </BasicButton>
      <BasicButton onPress={toggleTimer} filled={true}>
        {isRunning ? 'Pause' : !isPaused ? 'Start' : 'Resume'}
      </BasicButton>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxWidth: scale(248),
  },
  resetButton: {
    marginRight: scale(8),
  },
});

export default TimerButtons;
