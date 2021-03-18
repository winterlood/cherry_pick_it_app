import React from 'react';
import {View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const adUnitId = __DEV__
  ? 'ca-app-pub-3940256099942544/6300978111'
  : 'ca-app-pub-8356725717508400/6552757252';

const WideBannerAd = () => {
  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};
export default WideBannerAd;
