import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CardWithSwitch from '../../components/CardWithSwitch';

//components
import NunitoSemiBold from '../../components/fonts/NunitoSemiBold';

function Sound() {
  return (
    <View style={styles.container}>
      <NunitoSemiBold size={20} style={styles.header}>
        Sound
      </NunitoSemiBold>
      <View style={styles.cardsContainer}>
        <CardWithSwitch title="Sound alert" />
        <CardWithSwitch title="Vibration" />
        <CardWithSwitch title="Vibration" />
      </View>
    </View>
  );
}

export default Sound;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: moderateScale(12),
  },
  header: {
    alignSelf: 'flex-start',
  },
});
