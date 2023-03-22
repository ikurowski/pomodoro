import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import CardWithSwitch from '../../components/CardWithSwitch';

//components
import NunitoSemiBold from '../../components/fonts/NunitoSemiBold';
import {useSoundSettings} from '../../hooks/useSoundSettings';
import {TimerRootState} from '../../types/types';

function Sound() {
  const {sound, vibration, breaks} = useSelector(
    (state: TimerRootState) => state.timer,
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

  const toggleSwitch = (setState: Dispatch<SetStateAction<boolean>>) => {
    setState((previousState: boolean) => !previousState);
  };

  return (
    <View style={styles.container}>
      <NunitoSemiBold size={20} style={styles.header}>
        Sound
      </NunitoSemiBold>
      <View style={styles.cardsContainer}>
        <CardWithSwitch
          title="Sound alert"
          toggleSwitch={() => toggleSwitch(setSoundIsEnabled)}
          isEnabled={soundIsEnabled}
        />

        <CardWithSwitch
          title="Vibration"
          toggleSwitch={() => toggleSwitch(setVibrationIsEnabled)}
          isEnabled={vibrationIsEnabled}
        />
        <CardWithSwitch
          title="Turn off breaks"
          toggleSwitch={() => toggleSwitch(setTurnOffBreaksIsEnabled)}
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
