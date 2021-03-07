import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

const HomeScene = () => {
  useEffect(() => {
    console.log('HOME');
  }, []);
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <View
        style={{
          backgroundColor: 'white',
          width: 70,
          height: 70,
          elevation: 10,
        }}>
        <Text>DFd</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScene;
