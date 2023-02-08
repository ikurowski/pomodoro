import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import PoppinsRegular from '../../components/fonts/PoppinsRegular';

function ResetButton({resetTimer}: {resetTimer: () => void}) {
  return (
    <View style={styles.container}>
      <Pressable onPress={resetTimer}>
        <PoppinsRegular>Reset</PoppinsRegular>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default ResetButton;
