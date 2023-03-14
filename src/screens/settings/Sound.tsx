import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import CardWithSwitch from '../../components/CardWithSwitch';

//components
import NunitoSemiBold from '../../components/fonts/NunitoSemiBold';
import {updateSettings} from '../../features/timerSettingsSlice';

function Sound() {
  const [soundIsEnabled, setSoundIsEnabled] = useState(false);
  const [vibrationIsEnabled, setVibrationIsEnabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateSettings({property: 'sound', value: soundIsEnabled}));
  }, [dispatch, soundIsEnabled]);

  useEffect(() => {
    dispatch(
      updateSettings({property: 'vibration', value: vibrationIsEnabled}),
    );
  }, [dispatch, vibrationIsEnabled]);

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
