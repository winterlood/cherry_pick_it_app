import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

// COMMON
import Bar from '~/common/atom/Bar';

// STYLE GUILDE
import {STYLE_TYPHO} from '~/util/StyleGuide';

const getTypho = (scene) => {
  switch (scene) {
    case 'HOME': {
      return {
        title: '체리픽 IT',
        sub: '실시간 뉴스&칼럼 : 트렌드를 추적하는 가장 확실한 방법',
      };
    }
    case 'BOOKMARK':
      return {title: '북마크', sub: '북마크된 뉴스&칼럼'};
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
