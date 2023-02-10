import React from 'react';
import {StyleSheet, View} from 'react-native';
import Card from '../../components/Card';
import PoppinsRegular from '../../components/fonts/PoppinsRegular';

function Duration() {
  return (
    <View style={styles.container}>
      <PoppinsRegular>Duration</PoppinsRegular>
      <View style={styles.cardsContainer}>
        <Card title="Pomodoro" xxxx={25} />
        <Card title="Short Break" xxxx={5} />
        <Card title="Long Break" xxxx={15} />
      </View>
    </View>
  );
}

export default Duration;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
});
