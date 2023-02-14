import React from 'react';
import {Pressable} from 'react-native';

//components
import PoppinsRegular from '../../components/fonts/PoppinsRegular';

function ResetButton({resetTimer}: {resetTimer: () => void}) {
  return (
    <Pressable onPress={resetTimer}>
      <PoppinsRegular>Reset</PoppinsRegular>
    </Pressable>
  );
}

export default ResetButton;
