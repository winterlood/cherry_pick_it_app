import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';

const SceneContainer = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(250,250,250)',
  },
});

export default SceneContainer;
