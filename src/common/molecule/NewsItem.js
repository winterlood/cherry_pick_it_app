import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import {STYLE_COLOR, STYLE_TYPHO, STYLE_COMMON} from '~/util/StyleGuide';

const NewsItem = ({item, toggleModal}) => {
  return (
    <TouchableOpacity
      onPress={() => toggleModal(item)}
      style={styles.container}>
      {Math.floor(Math.random() * 10) % 2 === 0 ? (
        <>
          {item.thumbnail_url ? (
            <View>
              <Image
                source={{uri: item.thumbnail_url}}
                style={styles.item_thumbnail}
              />
            </View>
          ) : (
            <></>
          )}
          <View style={styles.item_body}>
            <Text style={styles.item_body__headline}>
              {item.headline.replace(/\n/g, '')}
            </Text>
            <Text style={styles.item_body__source}>{item.source}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.item_body}>
            <Text style={styles.item_body__headline}>
              {item.headline.replace(/\n/g, '')}
            </Text>
            <Text style={styles.item_body__source}>{item.source}</Text>
          </View>
          {item.thumbnail_url ? (
            <View>
              <Image
                source={{uri: item.thumbnail_url}}
                style={styles.item_thumbnail}
              />
            </View>
          ) : (
            <></>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
function arePropsEqual(prevProps, nextProps) {
  return nextProps.item.headline === prevProps.item.headline;
}

const styles = StyleSheet.create({
  container: {
    ...STYLE_COMMON.SHADOW,

    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingHorizontal: 5,
    borderRadius: 5,

    backgroundColor: 'white',
    height: 100,
    overflow: 'hidden',
  },
  item_thumbnail: {
    marginLeft: -5,
    marginRight: -5,
    flex: 1,
    width: 120,
    height: 100,
  },
  item_body: {
    flex: 1,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  item_body__headline: {
    ...STYLE_TYPHO.ITEM_HEADER__TEXT,
  },
  item_body__source: {
    ...STYLE_TYPHO.ITEM_HEADER__SUB,
  },
});

export default React.memo(NewsItem, arePropsEqual);
