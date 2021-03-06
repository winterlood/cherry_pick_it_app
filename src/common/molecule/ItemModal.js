import React, {useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';

// STORE
import {AppDataContext} from '~/store/AppDataStore';

// COMMON
import ItemBookmarkTag from '~/common/atom/ItemBookmarkTag';

// STYLE GUIDE
import {STYLE_COLOR, STYLE_TYPHO} from '~/util/StyleGuide';

// ADMOB
import WideBannerAd from '~/common/ads/WideBannerAd';

// ICONS
import Icon_Feather from 'react-native-vector-icons/Feather';
const {_, width} = Dimensions.get('window');

const ModalImage = ({thumbnail_url, source, type}) => {
  const {getItemDefaultImage} = useContext(AppDataContext);

  const image_url =
    typeof thumbnail_url === 'undefined'
      ? getItemDefaultImage(source, type)
      : thumbnail_url;
  return (
    <FastImage
      source={{uri: image_url, priority: FastImage.priority.normal}}
      style={{
        width: width - 30,
        height: 150,
        backgroundColor: 'black',
        overflow: 'hidden',
        resizeMode: 'contain',
      }}
      onError={() => {
        console.log('HA');
      }}
    />
  );
};

const ItemBookMarkButton = ({modalState}) => {
  const {itemAction} = useContext(AppDataContext);
  const toggleBookmark = () => {
    itemAction(
      'BOOKMARK',
      modalState?.targetData,
      modalState?.targetData?.url,
      modalState?.targetData?.type,
    );
  };
  return (
    <ItemBookmarkTag
      bookmark={modalState?.targetData?.bookmark}
      toggleBookmark={toggleBookmark}
    />
  );
};

const ItemModal = ({modalState, toggleModal}) => {
  const openAction = async () => {
    Linking.openURL(modalState?.targetData?.url);
  };

  return (
    <Modal isVisible={modalState?.isVisible}>
      <TouchableOpacity
        onPress={() => toggleModal()}
        style={styles.modal_container}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modal_container__inner}>
          <View style={styles.modal_top_img}>
            <ModalImage {...modalState.targetData} />
          </View>

          <View style={styles.modal_header}>
            <View style={styles.modal_header_left}>
              <Text style={styles.modal_header__main}>
                {modalState?.targetData?.headline.replace(/\n/g, '')}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(modalState?.targetData?.source)}
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'rgb(220,220,220)',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                  }}>
                  <Text style={styles.modal_header__sub}>
                    [??????] {modalState?.targetData?.source}
                  </Text>
                  <Icon_Feather name="external-link" style={{fontSize: 15}} />
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modal_header_right}>
              <ItemBookMarkButton modalState={modalState} />
            </View>
          </View>
          <WideBannerAd />

          <View style={styles.modal_footer}>
            <TouchableOpacity
              onPress={() => openAction()}
              style={[styles.btn_common, styles.btn_positive]}>
              <Text style={[styles.btn_text, styles.btn_text_positive]}>
                {modalState?.targetData?.type === 'TYPE_NEWS'
                  ? '?????? ????????? ??????'
                  : '?????? ????????? ??????'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={[styles.btn_common, styles.btn_negative]}>
              <Text style={[styles.btn_text, styles.btn_text_negative]}>
                ??????
              </Text>
            </TouchableOpacity>
          </View>
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
    marginTop: -10,
    width: '100%',
    backgroundColor: 'black',
  },
  modal_header: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    marginBottom: 10,
  },
  modal_header_left: {
    flex: 1,
  },
  modal_header_right: {
    marginLeft: 10,
  },
  modal_header__main: {
    ...STYLE_TYPHO.MODAL_HEADER_MAIN,
  },
  modal_header__sub: {
    ...STYLE_TYPHO.MODAL_HEADER_SUB,
    marginRight: 5,
  },
  bookmark_btn: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bookmark_btn__icon: {
    fontSize: 30,
  },
  bookmark_btn__icon_on: {
    color: STYLE_COLOR.PRIMARY,
  },
  bookmark_btn__icon_off: {
    color: STYLE_COLOR.DEFAULT,
  },
  modal_footer: {
    paddingHorizontal: 10,
  },

  btn_common: {
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  btn_positive: {
    backgroundColor: STYLE_COLOR.PRIMARY,
  },
  btn_negative: {
    backgroundColor: STYLE_COLOR.DEFAULT,
  },
  btn_text: {
    textAlign: 'center',
    ...STYLE_TYPHO.BUTTON__TEXT,
  },
  btn_text_positive: {
    color: 'white',
  },
  btn_text_negative: {
    color: 'black',
  },
});

export default ItemModal;
