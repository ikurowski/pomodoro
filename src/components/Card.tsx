import React, {useState} from 'react';
import {Pressable, StyleSheet, Animated, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import millisecondsToTime from '../utils/millisecondsToTime';
import CardExpandedModal from './CardExpandedModal';
import PoppinsRegular from './fonts/PoppinsRegular';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Card({
  title,
  time,
  leftButtonPress,
  rightButtonPress,
}: {
  title: string;
  time: number;
  leftButtonPress: () => void;
  rightButtonPress: () => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnimation = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    setModalVisible(true);
  };

  return (
    <AnimatedPressable
      style={[
        styles.container,
        {
          transform: [{scale: scaleAnimation}],
        },
      ]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <View style={styles.time}>
        <CardExpandedModal
          title={title}
          timeAsSting={time}
          visible={modalVisible}
          setModalVisible={setModalVisible}
          leftButtonPress={leftButtonPress}
          rightButtonPress={rightButtonPress}
        />
        <PoppinsRegular size={32}>
          {millisecondsToTime(time, true)}
        </PoppinsRegular>
      </View>
      <PoppinsRegular size={12}>{title}</PoppinsRegular>
    </AnimatedPressable>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff2f',
    padding: 10,
    borderRadius: 10,
    width: scale(100),
    height: scale(100),
  },
  time: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
