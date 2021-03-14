import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
// COMMONS
import ItemTag from '~/common/atom/ItemTag';

// STYLES
import {STYLE_TYPHO, STYLE_COLOR} from '~/util/StyleGuide';

// UTILS
import {
  NEWS_SOURCE_SPINNER,
  NEWS_DEFAULT_IMAGE,
} from '~/util/NewsComponentResolver';

// ICONS
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width: screenWidth} = Dimensions.get('window');

const NewsCarousel = ({data, toggleModal}) => {
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() => toggleModal(item)}
        style={styles.item}
        key={index}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            elevation: 5,
            backgroundColor: 'rgb(255,255,255)',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            marginBottom: -5,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', marginBottom: 3}}>
                <ItemTag type={item.type} style={{marginRight: 5}} />
                <Text style={styles.item_title__source}>
                  {NEWS_SOURCE_SPINNER(item.source)}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.item_title__text}>
                {item.headline.replace(/\n/g, '')}
              </Text>
            </View>
            <View>
              {item.bookmark ? (
                <Icon_FontAwesome
                  style={[styles.bookmark_btn__icon]}
                  name="bookmark"
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <ParallaxImage
          source={{uri: item.thumbnail_url}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}></ParallaxImage>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {data ? (
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          data={data}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

function arePropsEqual(prevProps, nextProps) {
  return prevProps.data === nextProps.data;
}
export default React.memo(NewsCarousel, arePropsEqual);
// export default NewsCarousel;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  carousel_title__text: {
    ...STYLE_TYPHO.SECTION_HEADER_MAIN,
  },
  item: {
    width: screenWidth - 40,
    height: 200,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
  item_title__text: {
    ...STYLE_TYPHO.CAROUSEL_ITEM_HEADER__TEXT,
  },
  item_title__source: {
    ...STYLE_TYPHO.ITEM_HEADER__SUB,
  },
  bookmark_btn__icon: {
    color: STYLE_COLOR.PRIMARY,
    fontSize: 25,
    marginTop: -11,
    // position: 'absolute',
  },
});
