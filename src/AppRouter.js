import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Scenes
import HomeScene from '~/scene/HomeScene';
import ListScene from '~/scene/ListScene';
import BookmarkScene from '~/scene/BookmarkScene';
// Commons
import BottomTabBar from '~/common/molecule/BottomTabBar';

import WideBannerAd from '~/common/ads/WideBannerAd';
const Tab = createBottomTabNavigator();
const AppRouter = () => {
  return (
    <>
      {/* <WideBannerAd /> */}

      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
          <Tab.Screen name="Home" component={HomeScene} />
          <Tab.Screen name="List" component={ListScene} />
          <Tab.Screen name="Settings" component={BookmarkScene} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppRouter;
