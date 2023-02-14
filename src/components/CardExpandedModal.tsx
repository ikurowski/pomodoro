import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View, Modal, Pressable} from 'react-native';

import millisecondsToTime from '../utils/millisecondsToTime';

//components
import PoppinsRegular from './fonts/PoppinsRegular';

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
    <Modal visible={visible} animationType="fade" transparent={true}>
      <Pressable
        style={styles.modalContainer}
        onPress={() => setModalVisible(false)}>
        <Pressable style={styles.container}>
          <View style={styles.timeAndButtonContainer}>
            <Pressable onPress={leftButtonPress}>
              <PoppinsRegular size={80}>{' < '}</PoppinsRegular>
            </Pressable>
            <PoppinsRegular size={80}>
              {millisecondsToTime(timeAsSting, true)}
            </PoppinsRegular>
            <Pressable onPress={rightButtonPress}>
              <PoppinsRegular size={80}>{' > '}</PoppinsRegular>
            </Pressable>
          </View>
          <PoppinsRegular size={20} style={styles.title}>
            {title}
          </PoppinsRegular>
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
    borderWidth: 1,
    borderColor: 'red',
  },
  container: {
    padding: 40,
    borderWidth: 1,
    borderColor: 'red',
  },
  timeAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'red',
  },
  title: {
    textAlign: 'center',
  },
});
