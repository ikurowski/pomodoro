import React from 'react';
import {StyleSheet, View} from 'react-native';
import PoppinsRegular from '../components/fonts/PoppinsRegular';
import {RenderCounter} from '../utils/utils';

function Settings() {
  return (
    <View style={styles.container}>
      <PoppinsRegular>Settings</PoppinsRegular>
      <RenderCounter message="Settings" />
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
