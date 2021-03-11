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

import {STYLE_TYPHO, STYLE_COMMON} from '~/util/StyleGuide';

const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];
const {width: screenWidth} = Dimensions.get('window');

const NewsCarousel = (props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES1);
    return () => {
      setEntries();
    };
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item} key={index}>
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}></ParallaxImage>
        {/* <Text style={styles.item_title__text} numberOfLines={2}>
          {item.title}
        </Text> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {entries ? (
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          data={entries}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default React.memo(NewsCarousel);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  carousel_title__text: {
    ...STYLE_TYPHO.SECTION_HEADER_MAIN,
  },
  item: {
    ...STYLE_COMMON.SHADOW,
    width: screenWidth - 40,
    height: screenWidth - 60,
    height: 200,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
