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

// STORE
import {AppDataContext} from '~/store/AppDataStore';

// COMMON
import ImageWithError from '~/common/atom/ImageWithError';
import ItemBookmarkTag from '~/common/atom/ItemBookmarkTag';

// STYLE GUIDE
import {STYLE_COLOR, STYLE_TYPHO} from '~/util/StyleGuide';

// UTILS
import {
  NEWS_SOURCE_SPINNER,
  NEWS_DEFAULT_IMAGE,
} from '~/util/NewsComponentResolver';

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
              fail={NEWS_DEFAULT_IMAGE(modalState?.targetData?.source)}
            />
          </View>
          <View style={styles.modal_header}>
            <View style={styles.modal_header_left}>
              <Text style={styles.modal_header__main}>
                {modalState?.targetData?.headline.replace(/\n/g, '')}
              </Text>
              <Text style={styles.modal_header__sub}>
                {NEWS_SOURCE_SPINNER(modalState?.targetData?.source)}
              </Text>
            </View>
            <View style={styles.modal_header_right}>
              <ItemBookMarkButton modalState={modalState} />
            </View>
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity
              onPress={() => Linking.openURL(modalState?.targetData?.url)}
              style={[styles.btn_common, styles.btn_positive]}>
              <Text style={[styles.btn_text, styles.btn_text_positive]}>
                {modalState?.targetData?.type === 'TYPE_NEWS'
                  ? '뉴스 읽으러 가기'
                  : '칼럼 읽으러 가기'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={[styles.btn_common, styles.btn_negative]}>
              <Text style={[styles.btn_text, styles.btn_text_negative]}>
                취소
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
