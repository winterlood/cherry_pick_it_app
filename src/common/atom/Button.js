import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

// STYLE GUIDE
import {STYLE_COMMON, STYLE_TYPHO} from '~/util/StyleGuide';

// ICONS

const Button = (props) => {
  const {
    button__onPress,
    button__type,
    button__shadow,
    button__icon,
    button__text,
    button__extra_outter_style,
    button__extra_text_style,
    button__extra_icon_style,
  } = props;

  const Style = {
    button: [
      STYLE_COMMON.SHADOW__BUTTON,
      button__extra_outter_style ? button__extra_outter_style : undefined,
    ],
    button__text: [
      STYLE_TYPHO.BUTTON__TEXT,
      button__extra_text_style ? button__extra_text_style : undefined,
    ],
    button__icon: [
      STYLE_TYPHO.BUTTON__ICON,
      button__extra_icon_style ? button__extra_icon_style : undefined,
    ],
  };

  return (
    <TouchableOpacity onPress={() => button__onPress()} style={Style.button}>
      {button__text ? (
        <Text style={Style.button__text}>{button__text}</Text>
      ) : (
        <></>
      )}

      {/* {button__icon ? ButtonIconWithProps : <></>} */}
    </TouchableOpacity>
  );
};

export default Button;
