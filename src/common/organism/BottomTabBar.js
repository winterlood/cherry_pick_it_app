import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';

// Icons
import Icon_Ionicons from 'react-native-vector-icons/Ionicons';
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';

const TabBarIcon = ({route, focused}) => {
  const icon_style_list = [
    styles.tabBar__icon,
    focused ? styles.tabBar__icon_on : styles.tabBar__icon_off,
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

const BottomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View
      style={{
        position: 'absolute',
        height: 50,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
      }}>
      <BlurView
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          zIndex: 1,
        }}
        blurType="xlight"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"></BlurView>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'rgba(150,150,150,0.1)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 5,
          elevation: 0,
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          //   const label =
          //     options.tabBarLabel !== undefined
          //       ? options.tabBarLabel
          //       : options.title !== undefined
          //       ? options.title
          //       : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
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

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, alignItems: 'center'}}>
              <TabBarIcon route={route} focused={isFocused} />
              {/* <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                {label}
              </Text> */}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  tabBar__icon: {
    fontSize: 20,
  },
  tabBar__icon_on: {
    color: 'red',
  },
  tabBar__icon_off: {
    color: 'gray',
  },
});

export default BottomTabBar;
