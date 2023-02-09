import React from 'react';
import {StyleSheet, View} from 'react-native';
// import PoppinsRegular from '../../components/fonts/PoppinsRegular';
import {RenderCounter} from '../../utils/RenderCounter';
import Duration from './Duration';

function Settings() {
  return (
    <View style={styles.container}>
      <Duration />
      <RenderCounter message="Settings" />
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
