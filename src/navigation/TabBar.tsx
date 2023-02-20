import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme/useTheme';
import NavIcons from './NavIcons';
import NunitoRegular from '../components/fonts/NunitoRegular';
import {Route} from '@react-navigation/native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {
    navigation: {colors},
  } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.outerContainer,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: colors.background,
      }}>
      <View style={styles.innerContainer}>
        {state.routes.map((route: Route<string>, index: number) => {
          const {options} = descriptors[route.key];

          const label =
            options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({
                name: route.name,
                params: route.params,
                merge: true,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={index}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <View style={styles.buttonContainer}>
                {NavIcons(label, isFocused)}
                <NunitoRegular size={10}>{label}</NunitoRegular>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    borderRadius: 60,
    backgroundColor: '#00000026',
    paddingTop: 10,
    paddingBottom: 7,
    paddingHorizontal: 25,
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
