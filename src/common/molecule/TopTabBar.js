import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';

// STYLE GUIDE
import {STYLE_COLOR} from '~/util/StyleGuide';

// Icons
import Icon_Ionicons from 'react-native-vector-icons/Ionicons';
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';
const TabBarIcon = ({route, focused}) => {
  const icon_style_list = [
    styles.tabbar_item__icon,
    focused ? styles.tabbar_item__icon_on : styles.tabbar_item__icon_off,
  ];
  if (route.name === 'Home') {
    return <Icon_Ionicons name={'home'} style={icon_style_list} />;
  }
  if (route.name === 'List') {
    return <Icon_FontAwesome name={'feed'} style={icon_style_list} />;
  }
  if (route.name === 'Settings') {
    return <Icon_Ionicons name={'ios-settings'} style={icon_style_list} />;
  }
  return <Text>?</Text>;
};

const TopTabBar = ({state, descriptors, navigation, position}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {/* <BlurView
        style={styles.tabbar_container_blur}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"></BlurView> */}
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            {/* <TabBarIcon route={route} focused={isFocused} /> */}
            <Text>{label}</Text>
          </TouchableOpacity>
        );
        ``;
      })}
    </View>
  );
};
const styles = StyleSheet.create({});

export default TopTabBar;
