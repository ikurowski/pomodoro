import React from 'react';
import {Pressable} from 'react-native';

//components
import NunitoRegular from '../../components/fonts/NunitoRegular';

function ResetButton({resetTimer}: {resetTimer: () => void}) {
  return (
    <Pressable onPress={resetTimer}>
      <NunitoRegular>Reset</NunitoRegular>
    </Pressable>
  );
}

export default ResetButton;
