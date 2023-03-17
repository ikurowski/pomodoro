import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import CardWithSwitch from '../../components/CardWithSwitch';

//components
import NunitoSemiBold from '../../components/fonts/NunitoSemiBold';
import {useSoundSettings} from '../../hooks/useSoundSettings';
import {RootState} from '../../types/types';

function Sound() {
  const {sound, vibration, breaks} = useSelector(
    (state: RootState) => state.timer,
  );
  const [soundIsEnabled, setSoundIsEnabled] = useSoundSettings(sound, 'sound');
  const [vibrationIsEnabled, setVibrationIsEnabled] = useSoundSettings(
    vibration,
    'vibration',
  );
  const [turnOffBreaksIsEnabled, setTurnOffBreaksIsEnabled] = useSoundSettings(
    breaks,
    'breaks',
  );

  return (
    <View style={styles.container}>
      <NunitoSemiBold size={20} style={styles.header}>
        Sound
      </NunitoSemiBold>
      <View style={styles.cardsContainer}>
        <CardWithSwitch
          title="Sound alert"
          setIsEnabled={setSoundIsEnabled}
          isEnabled={soundIsEnabled}
        />

        <CardWithSwitch
          title="Vibration"
          setIsEnabled={setVibrationIsEnabled}
          isEnabled={vibrationIsEnabled}
        />
        <CardWithSwitch
          title="Turn off breaks"
          setIsEnabled={setTurnOffBreaksIsEnabled}
          isEnabled={turnOffBreaksIsEnabled}
        />
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
