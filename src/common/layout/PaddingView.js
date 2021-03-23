import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

const PaddingView = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
});

export default PaddingView;
