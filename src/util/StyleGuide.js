import {StyleSheet} from 'react-native';

// Icons
import Icon_Ionicons from 'react-native-vector-icons/Ionicons';
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';

export const STYLE_COLOR = {
  // COMMON
  PRIMARY: 'tomato',
  SECONDARY: 'black',
  DEFAULT: 'rgb(200,200,200)',
  BACKGROUND: 'white',

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

  // MODAL
  MODAL_HEADER_MAIN: {
    fontFamily: 'AppleB',
    fontSize: 15,
    color: 'rgb(50,50,50)',
  },
  MODAL_HEADER_SUB: {
    fontFamily: 'AppleL',
    fontSize: 12,
    color: 'rgb(50,50,50)',
  },

  // TABBAR

  // BUTTON
  BUTTON__TEXT: {
    fontSize: 20,
    color: 'red',
  },
  BUTTON__ICON: {
    fontSize: 20,
    color: 'red',
  },

  // ITEM
  ITEM_HEADER__TEXT: {
    fontFamily: 'AppleEB',
  },
  ITEM_HEADER__SUB: {
    fontFamily: 'AppleL',
    color: STYLE_COLOR.DEFAULT,
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
