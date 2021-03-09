import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

// COMMON
import Bar from '~/common/atom/Bar';

// STYLE GUILDE
import {STYLE_TYPHO} from '~/util/StyleGuide';

const getTypho = (scene) => {
  switch (scene) {
    case 'Home': {
      return {title: 'LOREM IS PRUM', sub: 'SUB SCRIPTION'};
    }
    default: {
      return {title: 'Lorem Is Prum', sub: 'SUB SCRIPTION'};
    }
  }
};

const PageHeader = ({scene}) => {
  var TYPHO = getTypho(scene);
  return (
    <View>
      <View>
        <Text style={styles.title__text}>{TYPHO.title}</Text>
        <Text style={styles.title__sub}>{TYPHO.sub}</Text>
      </View>
      <Bar />
    </View>
  );
};

const styles = StyleSheet.create({
  title__text: {
    ...STYLE_TYPHO.PAGE_HEADER__MAIN,
  },
  title__sub: {
    ...STYLE_TYPHO.PAGE_HEADER__SUB,
  },
});

export default PageHeader;
