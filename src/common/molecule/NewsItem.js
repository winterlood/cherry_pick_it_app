import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

// COMMONS
import ImageBackgroundWithError from '~/common/atom/ImageBackgroundWithError';
import ItemTag from '~/common/atom/ItemTag';

// UTILS
import {
  NEWS_SOURCE_SPINNER,
  NEWS_DEFAULT_IMAGE,
} from '~/util/NewsComponentResolver';
import {STYLE_COLOR, STYLE_TYPHO, STYLE_COMMON} from '~/util/StyleGuide';

// ICONS
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';

// AD
import NativeAd from '~/common/ads/NativeAd';

const BookmarkFlag = ({isBookmarked}) => {
  return (
    <View>
      {isBookmarked ? (
        <Icon_FontAwesome style={[styles.bookmark_btn__icon]} name="bookmark" />
      ) : (
        <></>
      )}
    </View>
  );
};

const NewsThumbnailView = ({item}) => {
  return (
    <ImageBackgroundWithError
      success={
        item.thumbnail_url
          ? {uri: item.thumbnail_url}
          : NEWS_DEFAULT_IMAGE(item.source)
      }
      fail={NEWS_DEFAULT_IMAGE(item.source)}
      style={styles.item_thumbnail}
    />
  );
};

const NewsBodyView = ({item}) => {
  return (
    <View style={styles.item_body}>
      <ItemTag type={item.type} />
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.item_body__headline}>
        {item.headline.replace(/\n/g, '')}
      </Text>
      <Text style={styles.item_body__source}>
        {NEWS_SOURCE_SPINNER(item.source)}
      </Text>
    </View>
  );
};

const NewsItem = ({item, toggleModal, type}) => {
  if (item.type === 'AD') {
    return <NativeAd />;
  } else {
    return (
      <TouchableOpacity
        onPress={() => toggleModal(item)}
        style={styles.container}>
        <NewsThumbnailView item={item} />

        <NewsBodyView item={item} />
        <BookmarkFlag isBookmarked={item.bookmark} />
      </TouchableOpacity>
    );
  }
};
function arePropsEqual(prevProps, nextProps) {
  return nextProps.item.bookmark === prevProps.item.bookmark;
}

const styles = StyleSheet.create({
  container: {
    ...STYLE_COMMON.SHADOW,

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingHorizontal: 5,
    borderRadius: 5,

    backgroundColor: 'white',
    minHeight: 100,
    overflow: 'hidden',
  },
  item_thumbnail: {
    marginLeft: -5,
    width: 120,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  item_body: {
    flex: 1,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
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
  item_body__headline: {
    ...STYLE_TYPHO.ITEM_HEADER__TEXT,
  },
  item_body__source: {
    ...STYLE_TYPHO.ITEM_HEADER__SUB,
  },
  bookmark_btn__icon: {
    color: STYLE_COLOR.PRIMARY,
    fontSize: 25,
    marginTop: -2,
  },
});

export default React.memo(NewsItem, arePropsEqual);
