import React, {useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme/useTheme';
import NavIcons from './NavIcons';
import NunitoRegular from '../components/fonts/NunitoRegular';
import {Route} from '@react-navigation/native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {BlurView} from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TabBarProps extends MaterialTopTabBarProps {
  isRunning: boolean;
}

const TabBar = ({state, descriptors, navigation, isRunning}: TabBarProps) => {
  const {
    navigation: {colors},
  } = useTheme();

  const insets = useSafeAreaInsets();
  const offset = useSharedValue(0);

  useEffect(() => {
    if (isRunning) {
      offset.value = withSpring(100, {damping: 100});
    } else {
      offset.value = withSpring(0, {damping: 100});
    }
  }, [isRunning, offset]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      transform: [{translateY: offset.value}],
    };
  });

  return (
    <Animated.View style={[styles.outerContainer, animatedStyle]}>
      <View style={styles.innerContainer}>
        <View style={styles.blurContainer}>
          <BlurView intensity={30} style={styles.blur} tint={'dark'} />
        </View>
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
    </Animated.View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  innerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 7,
    paddingHorizontal: 25,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 60,
    overflow: 'hidden',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
