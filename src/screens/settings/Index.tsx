import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import NunitoBold from '../../components/fonts/NunitoBold';
import Duration from './Duration';
import Sound from './Sound';

function Settings() {
  return (
    <View style={styles.container}>
      <NunitoBold size={32} style={styles.screenTitle}>
        Settings
      </NunitoBold>
      <Duration />
      <Sound />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(40),
  },
  screenTitle: {
    alignSelf: 'flex-start',
  },
});

export default Settings;
