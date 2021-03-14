import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {STYLE_COLOR, STYLE_TYPHO, STYLE_COMMON} from '~/util/StyleGuide';

const ItemTag = ({type, style}) => {
  return (
    <View
      style={[
        style,
        styles.item_body__tag_box,
        type === 'TYPE_NEWS'
          ? styles.item_body__tag_box_news
          : styles.item_body__tag_box_column,
      ]}>
      <Text style={styles.item_body__tag_text}>
        {type === 'TYPE_NEWS' ? '뉴스' : '칼럼'}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  item_body__tag_box: {
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  item_body__tag_box_news: {
    backgroundColor: STYLE_COLOR.SECONDARY,
  },
  item_body__tag_box_column: {
    backgroundColor: STYLE_COLOR.THIRD,
  },
  item_body__tag_text: {
    ...STYLE_TYPHO.ITEM_HEADER__TAG,
  },
});

export default ItemTag;
