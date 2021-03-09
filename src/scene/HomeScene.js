import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Modal from 'react-native-modal';

// STYLE GUIDE
import {STYLE_TYPHO} from '~/util/StyleGuide';

// STORES
import {AppDataContext} from '~/store/AppDataStore';

// COMMON
import PaddingView from '~/common/layout/PaddingView';
import PageHeader from '~/common/molecule/PageHeader';
import NewsCarousel from '~/common/molecule/NewsCarousel';
import NewsItem from '~/common/molecule/NewsItem';

const HomeList = React.memo(({toggleModal}) => {
  const {state} = useContext(AppDataContext);
  useEffect(() => {
    console.log('RENDER!@');
  }, []);
  return (
    <>
      {state ? (
        <>
          <FlatList
            style={styles.home_list}
            ListFooterComponent={() => <View style={{height: 60}}></View>}
            ListHeaderComponent={() => (
              <>
                <PaddingView>
                  <PageHeader scene={'HOME'} />
                  <View style={styles.section__header}>
                    <Text style={styles.scetion__header_main}>
                      Trending Topics
                    </Text>
                    <Text style={styles.section__header_sub}>
                      체리픽의 실시간 추천 소식입니다
                    </Text>
                  </View>
                </PaddingView>
                <NewsCarousel />

                <PaddingView>
                  <View style={styles.section__header}>
                    <Text style={styles.scetion__header_main}>News</Text>
                    <Text style={styles.section__header_sub}>
                      북마크하지 않은 기사는 업데이트 시 없어질 수 있습니다
                    </Text>
                  </View>
                </PaddingView>
              </>
            )}
            data={state?.data}
            renderItem={({item}) => (
              <NewsItem item={item} toggleModal={toggleModal} />
            )}
            keyExtractor={(item) => item.url}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
});

const HomeScene = () => {
  const {_, width} = Dimensions.get('window');
  const [modalState, setModalState] = useState({
    isVisible: false,
    targetData: undefined,
  });
  const toggleModal = (targetData) => {
    if (modalState.isVisible) {
      setModalState({
        isVisible: false,
        targetData: undefined,
      });
    } else {
      setModalState({
        isVisible: true,
        targetData: targetData,
      });
    }
  };
  return (
    <>
      <HomeList toggleModal={toggleModal} />
      {modalState.isVisible ? (
        <BlurView
          style={styles.blur_container}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor="white"></BlurView>
      ) : (
        <></>
      )}
      <Modal isVisible={modalState?.isVisible}>
        <TouchableOpacity
          onPress={() => toggleModal()}
          style={styles.modal_container}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modal_container__inner}>
            <View style={styles.modal_header}>
              <Text style={styles.modal_header__main}>
                {modalState?.targetData?.headline}
              </Text>
              <Text style={styles.modal_header__sub}>
                {modalState?.targetData?.source}
              </Text>
            </View>
            <View style={styles.modal_imagebox_mask}>
              <ImageBackground
                resizeMode="contain"
                style={{
                  width: width - 50,
                  height: 200,
                  backgroundColor: 'black',
                  overflow: 'hidden',
                }}
                source={{
                  uri: modalState?.targetData?.thumbnail_url,
                }}></ImageBackground>
            </View>

            <TouchableOpacity onPress={() => toggleModal()}>
              <Text>{modalState?.targetData?.headline}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
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
  },
  modal_header: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modal_header__main: {
    ...STYLE_TYPHO.MODAL_HEADER_MAIN,
  },
  modal_header__sub: {
    ...STYLE_TYPHO.MODAL_HEADER_SUB,
  },
  modal_imagebox_mask: {
    height: 200,
    overflow: 'hidden',
    backgroundColor: 'rgb(0,0,0)',
    borderColor: 'red',
    borderWidth: 1,
  },
  home_list: {
    paddingBottom: 50,
  },
  section__header: {
    marginTop: 15,
    marginBottom: 10,
  },
  scetion__header_main: {
    // paddingVertical: 10,
    ...STYLE_TYPHO.SECTION_HEADER_MAIN,
  },
  section__header_sub: {
    ...STYLE_TYPHO.SECTION_HEADER_SUB,
  },
});

export default HomeScene;
{
  /* <NewsItem
            item={{
              source: 'http://www.inews24.com/',
              headline: '티빙, K-OTT 저력 뽐낸다…연내 20개 오리지널 공개 ',
              thumbnail_url:
                'http://image.inews24.com/200x150/face/image_gisa/thumbnail/202103/1614729572765_1_101338.jpg',
              url: 'http://www.inews24.com/view/1348417',
            }}
          /> */
}
