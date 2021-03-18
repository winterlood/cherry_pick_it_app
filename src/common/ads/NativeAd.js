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

const NativeAd = ({scene}) => {
  const nativeAdViewRef = useRef();

  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <>
      <View style={style.outter_container}>
        <NativeAdView
          ref={nativeAdViewRef}
          // enableTestMode={true}
          adUnitID={
            __DEV__
              ? 'ca-app-pub-3940256099942544/2247696110'
              : 'ca-app-pub-8356725717508400/8249445329'
          }
          adChoicesPlacement={'topRight'}>
          <View style={style.inner_container}>
            <View style={style.thunmnail_container}>
              <ImageView style={style.mediaview} />
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

              <TaglineView style={style.tagline__text} />
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <CallToActionView
                  style={[
                    style.calltoaction__view,
                    scene === 'NEWS'
                      ? style.news_calltoaction__view
                      : style.column_calltoaction__view,
                  ]}
                  textStyle={style.calltoaction__view__text}
                />
              </View>
            </View>
          </View>
          <AdBadge
            style={[
              style.badge,
              scene === 'NEWS' ? style.news_badge : style.column_badge,
            ]}
            textStyle={style.badge__text}
          />
        </NativeAdView>
      </View>
    </>
  );
};

export default React.memo(NativeAd);
