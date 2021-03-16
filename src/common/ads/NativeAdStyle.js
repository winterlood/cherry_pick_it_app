import {StyleSheet} from 'react-native';
import {STYLE_COLOR, STYLE_TYPHO, STYLE_COMMON} from '~/util/StyleGuide';

export const style = StyleSheet.create({
  outter_container: {
    ...STYLE_COMMON.SHADOW,

    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'rgb(250,250,250)',
    minHeight: 100,
    maxHeight: 250,
    overflow: 'hidden',
  },
  inner_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: 5,
  },
  thunmnail_container: {},
  mediaview: {
    width: 150,
    height: 110,
    // resizeMode: 'contain',
  },
  body_container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  headline__text: {
    fontFamily: 'AppleB',
    fontSize: 13,
  },
  advertiser__text: {
    fontFamily: 'AppleB',
    fontSize: 10,
  },
  tagline__text: {
    fontFamily: 'AppleL',
    fontSize: 12,
  },
  badge: {
    width: 20,
    height: 15,
    backgroundColor: STYLE_COLOR.PRIMARY,
    borderWidth: 0,
    // position: 'relative',
    marginRight: 5,
    justifyContent: 'center',
  },
  badge__text: {
    fontSize: 10,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'AppleB',
  },
  calltoaction__view: {
    width: 100,
    height: 30,
    borderRadius: 10,
    backgroundColor: STYLE_COLOR.PRIMARY,
    ...STYLE_COMMON.SHADOW,
  },
  calltoaction__view__text: {
    fontFamily: 'AppleEB',
    color: 'white',
    fontSize: 14,
  },
});
