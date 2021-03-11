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
import ItemModal from '~/common/molecule/ItemModal';

const HomeList = React.memo(({toggleModal, navigation}) => {
  const {state} = useContext(AppDataContext);
  useEffect(() => {
    console.log(navigation);
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
            data={state?.data_news}
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

const HomeScene = ({navigation}) => {
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
      <HomeList toggleModal={toggleModal} navigation={navigation} />
      {modalState.isVisible ? (
        <BlurView
          style={styles.blur_container}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor="white"></BlurView>
      ) : (
        <></>
      )}
      <ItemModal modalState={modalState} toggleModal={toggleModal} />
    </>
  );
};

const styles = StyleSheet.create({
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
