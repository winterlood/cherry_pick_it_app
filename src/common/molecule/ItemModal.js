import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Modal from 'react-native-modal';

// COMMON
import ImageWithError from '~/common/atom/ImageWithError';

// STYLE GUIDE
import {STYLE_TYPHO} from '~/util/StyleGuide';

// UTILS
import {
  NEWS_SOURCE_SPINNER,
  NEWS_DEFAULT_IMAGE,
} from '~/util/NewsComponentResolver';
const ItemModal = ({modalState, toggleModal}) => {
  const {_, width} = Dimensions.get('window');

  return (
    <Modal isVisible={modalState?.isVisible}>
      <TouchableOpacity
        onPress={() => toggleModal()}
        style={styles.modal_container}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modal_container__inner}>
          <View style={styles.modal_top_img}>
            <ImageWithError
              style={{
                width: width - 30,
                height: 150,
                backgroundColor: 'black',
                overflow: 'hidden',
                resizeMode: 'contain',
              }}
              success={
                modalState?.targetData?.thumbnail_url
                  ? {
                      uri: modalState?.targetData?.thumbnail_url,
                    }
                  : NEWS_DEFAULT_IMAGE(modalState?.targetData?.source)
              }
              fail={NEWS_DEFAULT_IMAGE(
                modalState?.targetData?.source,
              )}></ImageWithError>
          </View>
          <View style={styles.modal_header}>
            <Text style={styles.modal_header__main}>
              {modalState?.targetData?.headline}
            </Text>
            <Text style={styles.modal_header__sub}>
              {NEWS_SOURCE_SPINNER(modalState?.targetData?.source)}
            </Text>
          </View>

          {/* <TouchableOpacity onPress={() => toggleModal()}>
            <Text>{modalState?.targetData?.headline}</Text>
          </TouchableOpacity> */}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blur_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  modal_container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  modal_container__inner: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  modal_top_img: {
    marginBottom: 10,
    marginTop: -10,
    width: '100%',
    backgroundColor: 'black',
  },
  modal_header: {
    paddingHorizontal: 10,
  },
  modal_header__main: {
    ...STYLE_TYPHO.MODAL_HEADER_MAIN,
  },
  modal_header__sub: {
    ...STYLE_TYPHO.MODAL_HEADER_SUB,
  },
});

export default ItemModal;
