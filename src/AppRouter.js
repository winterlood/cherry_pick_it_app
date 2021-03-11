import * as React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Scenes
import HomeScene from '~/scene/HomeScene';
import ListScene from '~/scene/ListScene';

// Commons
import BottomTabBar from '~/common/molecule/BottomTabBar';

// TESTS
import Button from '~/common/atom/Button';

const RenderedItem = ({item, id}) => {
  React.useEffect(() => {
    console.log(item.index);
  }, []);
  const {width, height} = Dimensions.get('window');
  return (
    <Image
      source={{uri: 'https://source.unsplash.com/random'}}
      style={{height: 800, width: width}}
    />
  );
};

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const AppRouter = () => {
  const my_tabBarOption = {
    showLabel: false,
    style: {
      borderWidth: 1,
      borderColor: 'red',
      marginTop: 10,
      backgroundColor: 'color: rgba(130, 130, 130, 0)',
    },
  };
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScene} />
        <Tab.Screen name="List" component={ListScene} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
