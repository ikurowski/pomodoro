import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View, Modal, Pressable} from 'react-native';

import millisecondsToTime from '../utils/millisecondsToTime';

//components
import NunitoRegular from './fonts/NunitoRegular';

function CardExpandedModal({
  timeAsSting,
  title,
  visible,
  setModalVisible,
  leftButtonPress,
  rightButtonPress,
}: {
  timeAsSting: number;
  title: string;
  visible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  leftButtonPress: () => void;
  rightButtonPress: () => void;
}) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      supportedOrientations={['portrait', 'landscape']}>
      <Pressable
        style={styles.modalContainer}
        onPress={() => setModalVisible(false)}>
        <Pressable style={styles.container}>
          <View style={styles.timeAndButtonContainer}>
            <Pressable onPress={leftButtonPress}>
              <NunitoRegular size={80}>{' < '}</NunitoRegular>
            </Pressable>
            <NunitoRegular size={80}>
              {millisecondsToTime(timeAsSting, true)}
            </NunitoRegular>
            <Pressable onPress={rightButtonPress}>
              <NunitoRegular size={80}>{' > '}</NunitoRegular>
            </Pressable>
          </View>
          <NunitoRegular size={20} style={styles.title}>
            {title}
          </NunitoRegular>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default CardExpandedModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000081',
  },
  container: {
    padding: 40,
  },
  timeAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
  },
});
