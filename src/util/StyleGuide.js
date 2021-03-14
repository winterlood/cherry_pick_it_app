import {StyleSheet} from 'react-native';

export const STYLE_COLOR = {
  // COMMON
  PRIMARY: 'tomato',
  SECONDARY: '#47d5ff',
  THIRD: '#9ae264',
  DEFAULT: 'rgb(200,200,200)',
  LABEL: 'rgb(150,150,150)',
  BACKGROUND: 'white',
  PRIMARY_BACKGROUND: '#ffe5e1',

  // BUTTON
  BUTTON_POSITIVE: 'black',
  BUTTON_NEGATIVE: '',
  BUTTON_DEFAULT: '',
};

export const STYLE_TYPHO = StyleSheet.create({
  // PAGE HEADER
  PAGE_HEADER__MAIN: {
    fontFamily: 'AppleL',
    color: 'black',
    fontSize: 30,
  },
  PAGE_HEADER__SUB: {
    fontFamily: 'AppleB',
    color: 'gray',
    fontSize: 12,
  },

  // PAGE ALERT
  PAGE_ALERT__TEXT: {
    fontFamily: 'AppleB',
    color: STYLE_COLOR.PRIMARY,
    fontSize: 15,
  },
  PAGE_ALERT__ICON: {
    fontFamily: 'AppleB',
    color: STYLE_COLOR.PRIMARY,
  },

  // SCETION
  SECTION_HEADER_MAIN: {
    fontFamily: 'AppleEB',
    fontSize: 20,
    color: 'rgb(50,50,50)',
  },
  SECTION_HEADER_SUB: {
    fontFamily: 'AppleL',
    fontSize: 12,
    color: 'rgb(50,50,50)',
  },
  SECTION_SIDE_TEXT: {
    fontFamily: 'AppleEB',
    fontSize: 12,
    color: 'white',
    // color: STYLE_COLOR.THIRD,
  },

  // MODAL
  MODAL_HEADER_MAIN: {
    fontFamily: 'AppleB',
    fontSize: 18,
    color: 'rgb(50,50,50)',
  },
  MODAL_HEADER_SUB: {
    fontFamily: 'AppleL',
    fontSize: 15,
    color: 'rgb(50,50,50)',
  },

  // CAROUSEL
  CAROUSEL_ITEM_HEADER__TEXT: {
    fontFamily: 'AppleEB',
    fontSize: 15,
  },

  // BUTTON
  BUTTON__TEXT: {
    fontSize: 12,
    fontFamily: 'AppleB',
  },
  BUTTON__ICON: {
    fontSize: 12,
    fontFamily: 'AppleL',
  },

  // ITEM
  ITEM_HEADER__TEXT: {
    fontFamily: 'AppleEB',
    fontSize: 15,
  },
  ITEM_HEADER__SUB: {
    fontFamily: 'AppleL',
    color: STYLE_COLOR.LABEL,
    fontSize: 14,
  },
  ITEM_HEADER__TAG: {
    fontFamily: 'AppleEB',
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  ITEM_BODY__TEXT: {},
  ITEM_BODY__SUB: {},
});

export const STYLE_COMPONENT = StyleSheet.create({
  BUTTON_PRIMARY: {},
  BUTTON_SECONDARY: {},
  BUTTON_POSITIVE: {},
  BUTTON_NEGATIVE: {},
  BUTTON_DEFAULT: {},
});

export const STYLE_COMMON = StyleSheet.create({
  BUTTON: {
    // paddings
    paddingHorizontal: 20,
    paddingVertical: 5,

    // container setting
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  SHADOW: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 11,
  },
});
