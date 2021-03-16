import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import {style} from '~/common/ads/NativeAdStyle';
import NativeAdView, {
  AdBadge,
  HeadlineView,
  ImageView,
  TaglineView,
  AdvertiserView,
  PriceView,
  StoreView,
  StarRatingView,
  NativeMediaView,
  IconView,
  CallToActionView,
} from 'react-native-admob-native-ads';

const text25 = 'ㅁㄴㅇㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ';
const text90 =
  'ㅁㄴㅇㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ';

const NativeAd = () => {
  const nativeAdViewRef = useRef();

  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <>
      <View style={style.outter_container}>
        <NativeAdView
          ref={nativeAdViewRef}
          enableTestMode={true}
          adUnitID="ca-app-pub-3940256099942544/2247696110"
          adChoicesPlacement={'topRight'}>
          <View style={style.inner_container}>
            <View style={style.thunmnail_container}>
              <ImageView style={style.mediaview} />
              {/* <NativeMediaView style={style.mediaview} /> */}
            </View>
            <View style={style.body_container}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 1,
                }}>
                <HeadlineView style={style.headline__text} />
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconView
                  style={{
                    width: 15,
                    height: 15,
                    marginRight: 5,
                  }}
                />
                <AdvertiserView style={style.advertiser__text} />
              </View>
              {/* <Text style={style.headline__text}>{text25}</Text> */}
              {/* <Text style={style.tagline__text}>{text90}</Text> */}

              <TaglineView style={style.tagline__text} />
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <CallToActionView
                  style={style.calltoaction__view}
                  textStyle={style.calltoaction__view__text}
                />
              </View>
            </View>
          </View>
          <AdBadge style={style.badge} textStyle={style.badge__text} />
        </NativeAdView>
      </View>
    </>
  );
};

export default React.memo(NativeAd);
