import {StyleSheet} from 'react-native';

// Icons
import Icon_Ionicons from 'react-native-vector-icons/Ionicons';
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';

export const STYLE_COLOR = {
  // COMMON
  PRIMARY: 'black',
  SECONDARY: 'black',
  DEFAULT: 'black',
  BACKGROUND: 'white',

  // BUTTON
  BUTTON_POSITIVE: 'black',
  BUTTON_NEGATIVE: '',
  BUTTON_DEFAULT: '',
};

export const STYLE_TYPHO = StyleSheet.create({
  // PAGE HEADER
  PAGE_HEADER__MAIN: {},
  PAGE_HEADER__SUB: {},

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
  ITEM_HEADER__TEXT: {},
  ITEM_HEADER__SUB: {},

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
    elevation: 5,
  },
});
