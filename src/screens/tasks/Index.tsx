import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

//components
import TaskModal from '../../components/modal/TaskModal';
import NunitoBold from '../../components/fonts/NunitoBold';
import PencilIcon from '../../assets/svg/pencil.svg';
import TasksList from './TasksList';

//types
import {ITask, STORAGE_KEY, TasksRootState} from '../../types/types';

//store
import {storeAsyncData} from '../../storage/RNAsyncStorage';
import {removeTask} from '../../features/tasksSlice';

//styles
import useTheme from '../../hooks/useTheme/useTheme';

function Tasks() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    navigation: {colors},
  } = useTheme();
  const [idOfTaskToEdit, setIdOfTaskToEdit] = useState<string | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const dispatch = useDispatch();

  const tasks = useSelector((state: TasksRootState) => state.tasks);
  const {currentTask, otherTasks} = tasks;

  const onXButtonPress = (task: ITask) => {
    dispatch(removeTask(task));
  };

  const pressHandler = () => {
    setIsModalVisible(true);
  };

  const editPressHandler = (id: string) => {
    setIdOfTaskToEdit(id);
    setIsEditModalVisible(true);
  };

  useEffect(() => {
    storeAsyncData(tasks, STORAGE_KEY.TASKS);
  }, [tasks]);

  return (
    <View style={styles.container}>
      <TaskModal
        title="New Modal"
        visible={isModalVisible}
        setModalVisible={setIsModalVisible}
      />
      <TaskModal
        title="Edit Modal"
        visible={isEditModalVisible}
        setModalVisible={setIsEditModalVisible}
        idOfTaskToEdit={idOfTaskToEdit}
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
        onTaskPress={editPressHandler}
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
