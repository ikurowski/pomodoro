import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

//components
import NewTaskModal from '../../components/modal/NewTaskModal';
import NunitoBold from '../../components/fonts/NunitoBold';
import PencilIcon from '../../assets/svg/pencil.svg';
import TasksList from './TasksList';

//types
import {ITask, STORAGE_KEY, TasksRootState} from '../../types/types';

//store
import {storeAsyncData} from '../../stores/RNAsyncStorage';
import {removeTask} from '../../features/tasksSlice';

//styles
import useTheme from '../../hooks/useTheme/useTheme';

function Tasks() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    navigation: {colors},
  } = useTheme();

  const dispatch = useDispatch();

  const tasks = useSelector((state: TasksRootState) => state.tasks);
  const {currentTask, otherTasks} = tasks;

  const onXButtonPress = (task: ITask) => {
    dispatch(removeTask(task));
  };

  useEffect(() => {
    storeAsyncData(tasks, STORAGE_KEY.TASKS);
  }, [tasks]);

  const pressHandler = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <NewTaskModal
        visible={isModalVisible}
        setModalVisible={setIsModalVisible}
      />
      <View style={styles.header}>
        <NunitoBold size={32}>Tasks</NunitoBold>
        <Pressable onPress={pressHandler}>
          <View
            style={{
              ...styles.pencilContainer,
              backgroundColor: colors.primary,
            }}>
            <PencilIcon
              width={moderateScale(22)}
              height={moderateScale(22)}
              color={colors.text}
            />
          </View>
        </Pressable>
      </View>
      <TasksList
        currentTask={currentTask}
        otherTasks={otherTasks}
        onXButtonPress={onXButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScale(40),
  },
  header: {
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pencilContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
});

export default Tasks;
