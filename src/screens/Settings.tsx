import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RenderCounter} from '../utils/utils';

function Settings() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
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
