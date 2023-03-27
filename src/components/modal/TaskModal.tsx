import React, {useState} from 'react';
import {BlurView} from 'expo-blur';
import {StyleSheet, View, TextInput, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

//components
import BasicButton from '../buttons/BasicButton';
import CardWithSwitch from '../CardWithSwitch';
import DurationComponentInModal from './DurationComponentInModal';
import Handle from '../../assets/svg/handle.svg';
import NunitoBold from '../fonts/NunitoBold';
import NunitoSemiBold from '../fonts/NunitoSemiBold';
import TextContainer from '../TextContainer';

//types
import {ITask, TaskModalProps} from '../../types/types';

//styles
import useTheme from '../../hooks/useTheme/useTheme';
import {useDispatch} from 'react-redux';

//stores
import {addTask} from '../../features/tasksSlice';

function TaskModal({title, visible, setModalVisible}: TaskModalProps) {
  const [task, setTask] = useState<ITask>({
    name: '',
    pomodoroTimeInMS: 1_500_000,
    shortBreakTimeInMS: 300_000,
    longBreakTimeInMS: 900_000,
    repeats: 4,
    repeatsDone: 0,
    currentTask: false,
    id: uuidv4(),
  });
  const dispatch = useDispatch();

  const {
    navigation: {colors},
  } = useTheme();

  const createUpdateFunction = (taskKey: keyof ITask) => ({
    updateNumberFunction: (newTime: number) =>
      setTask(prevTask => ({
        ...prevTask,
        [taskKey]: newTime,
      })),
  });

  const toggleSwitch = () => {
    setTask(prevState => ({
      ...prevState,
      currentTask: !prevState.currentTask,
    }));
  };

  const onChangeTextHandler = (text: string) => {
    setTask(prevState => ({
      ...prevState,
      name: text,
    }));
  };

  const backdropPressHandle = () => {
    setModalVisible(false);
  };

  const onButtonPressHandler = () => {
    if (task.name === '') {
      Alert.alert('Please enter a task name'); //TODO: custom alert
      return;
    }
    setModalVisible(false);
    dispatch(addTask(task));
  };

  return (
    <Modal
      style={styles.container}
      isVisible={visible}
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      backdropOpacity={0.38}
      onBackdropPress={backdropPressHandle}
      propagateSwipe={true}
      scrollTo={() => {}} //library bug workaround
      scrollOffset={1} //library bug workaround
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down">
      <View style={styles.blurContainer}>
        <BlurView intensity={30} tint={'light'} style={styles.blurContent}>
          <Handle style={styles.handle} />
          <NunitoSemiBold style={styles.tile} size={20}>
            {title}
          </NunitoSemiBold>
          <View style={styles.cardHeader}>
            <NunitoBold size={16}>Task name</NunitoBold>
          </View>
          <TextContainer>
            <TextInput
              maxLength={80}
              placeholder="Task name..."
              value={task.name}
              onChangeText={onChangeTextHandler}
              placeholderTextColor={colors.card}
              style={{...styles.textInput, color: colors.text}}
            />
          </TextContainer>
          <DurationComponentInModal
            task={task}
            setTask={setTask}
            createUpdateFunction={createUpdateFunction}
          />
          <View style={styles.cardHeader}>
            <NunitoBold size={16}>Group</NunitoBold>
          </View>
          <CardWithSwitch
            title="Current task"
            titleColor={colors.text}
            isEnabled={task.currentTask}
            toggleSwitch={toggleSwitch}
          />
          <BasicButton
            moreStyles={styles.applyButton}
            filled
            onPress={onButtonPressHandler}>
            Apply
          </BasicButton>
        </BlurView>
      </View>
    </Modal>
  );
}

export default TaskModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
  },
  blurContainer: {
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    overflow: 'hidden', // library bug workaround
    height: '80%',
    width: '100%',
  },
  blurContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardHeader: {
    marginVertical: moderateScale(6),
  },
  tile: {
    paddingTop: 22,
    paddingBottom: 6,
    textAlign: 'center',
  },
  textInput: {
    fontSize: moderateScale(16),
    fontFamily: 'Nunito-Medium',
    paddingVertical: 2,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  applyButton: {
    marginTop: 16,
    width: '100%',
  },
  handle: {
    alignSelf: 'center',
    marginTop: 5,
  },
});
