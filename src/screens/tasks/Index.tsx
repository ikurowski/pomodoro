import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import NunitoBold from '../../components/fonts/NunitoBold';
import PencilIcon from '../../assets/svg/pencil.svg';
import {moderateScale} from 'react-native-size-matters';
import useTheme from '../../hooks/useTheme/useTheme';
import NunitoSemiBold from '../../components/fonts/NunitoSemiBold';
import Task from '../../components/Task';

function Tasks() {
  const [tasks, setTasks] = useState(['Task 1', 'Task 2', 'Task 3']);
  const {
    navigation: {colors},
  } = useTheme();

  const renderTasks = ({item}: {item: string}) => {
    return (
      <View>
        <Task name={item} />
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NunitoBold size={32}>Tasks</NunitoBold>
        <View
          style={{...styles.pencilContainer, backgroundColor: colors.primary}}>
          <PencilIcon
            width={moderateScale(22)}
            height={moderateScale(22)}
            color={colors.text}
          />
        </View>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTasks}
        keyExtractor={item => item}
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
