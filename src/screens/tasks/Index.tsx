import React, {useEffect, useState} from 'react';
import {Pressable, SectionList, StyleSheet, View} from 'react-native';
import NunitoBold from '../../components/fonts/NunitoBold';
import PencilIcon from '../../assets/svg/pencil.svg';
import {moderateScale} from 'react-native-size-matters';
import useTheme from '../../hooks/useTheme/useTheme';
import NunitoSemiBold from '../../components/fonts/NunitoSemiBold';
import Task from '../../components/Task';
import NewTaskModal from '../../components/modal/NewTaskModal';
import {useDispatch, useSelector} from 'react-redux';
import {ITask, STORAGE_KEY, TasksRootState} from '../../types/types';
import {removeTask} from '../../features/tasksSlice';
import {storeAsyncData} from '../../stores/RNAsyncStorage';

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

  const renderTasks = ({item}: {item: ITask}) => {
    const {name, pomodoroTimeInMs, repeatsDone, repeats} = item;

    return (
      <View>
        <Task
          name={name}
          timeInMS={pomodoroTimeInMs}
          repeatsDone={repeatsDone}
          repeats={repeats}
          onPress={() => onXButtonPress(item)}
        />
      </View>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View style={styles.emptyListContainer}>
        <NunitoSemiBold size={20}>No tasks yet</NunitoSemiBold>
      </View>
    );
  };

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
      <SectionList
        sections={[
          ...(currentTask
            ? [{title: 'Current Task', data: [currentTask]}]
            : []),
          ...(otherTasks.length > 0
            ? [{title: 'Other Tasks', data: [...otherTasks]}]
            : []),
        ]}
        renderSectionHeader={({section: {title}}) => (
          <NunitoSemiBold size={20}>{title}</NunitoSemiBold>
        )}
        renderItem={renderTasks}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
}

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(40),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    flex: 1,
  },
  pencilContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
});
