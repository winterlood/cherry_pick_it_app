import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

// STYLE GUILDE
import {STYLE_COLOR} from '~/util/StyleGuide';

const Bar = () => {
  return <View style={styles.bar}></View>;
};

const styles = StyleSheet.create({
  bar: {
    paddingVertical: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: STYLE_COLOR.DEFAULT,
    // backgroundColor: 'red',
  },
});

export default Bar;
