import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Platform,
  ToastAndroid,
  AlertIOS,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

// STYLE GUIDE
import {STYLE_COLOR, STYLE_TYPHO, STYLE_COMMON} from '~/util/StyleGuide';

// STORES
import {AppDataContext} from '~/store/AppDataStore';

// COMMON
import PaddingView from '~/common/layout/PaddingView';
import PageHeader from '~/common/molecule/PageHeader';
import NewsCarousel from '~/common/molecule/NewsCarousel';
import NewsItem from '~/common/molecule/NewsItem';
import ItemModal from '~/common/molecule/ItemModal';

// ICONS
import Icon_Foundation from 'react-native-vector-icons/Foundation';

const HomeCarousel = ({toggleModal}) => {
  const {state, getCarouselData} = useContext(AppDataContext);

  return (
    <>
      <PaddingView>
        <PageHeader scene={'HOME'} />
        <TouchableOpacity
          onPress={() => {
            if (Platform.OS === 'android') {
              ToastAndroid.show(
                '6 시간 마다 업데이트 됩니다 조금만 기다려주세요.',
                ToastAndroid.SHORT,
              );
            } else {
              AlertIOS.alert('6 시간 마다 업데이트 합니다.');
            }
          }}
          style={styles.section__header__alert}>
          <Text style={styles.section__header__alert_icon}>
            마지막 업데이트 : {state?.last_update_time}
          </Text>
          <Icon_Foundation
            style={styles.section__header__alert_text}
            name="refresh"
          />
        </TouchableOpacity>
        <View style={styles.section__header}>
          <Text style={styles.section__header_top__main_text}>트렌드</Text>
          <Text style={styles.section__header_sub}>
            체리픽의 실시간 추천 소식입니다
          </Text>
        </View>
      </PaddingView>
      {getCarouselData() ? (
        <NewsCarousel data={getCarouselData()} toggleModal={toggleModal} />
      ) : (
        <></>
      )}
    </>
  );
};

const RenderFeed = ({nowSelect, news, columns, toggleModal}) => {
  return (
    <>
      {nowSelect === 'NEWS' ? (
        <>
          {news?.map((it, idx) => (
            <NewsItem key={`NEWS_${idx}`} item={it} toggleModal={toggleModal} />
          ))}
        </>
      ) : (
        <>
          {columns?.map((it, idx) => (
            <NewsItem
              key={`COLUMN_${idx}`}
              item={it}
              toggleModal={toggleModal}
            />
          ))}
        </>
      )}
    </>
  );
};

const PureHomeCarousel = React.memo(HomeCarousel);

const HomeFeed = ({toggleModal, navigation}) => {
  const [nowSelect, setNowSelect] = useState('NEWS');
  const {getHomeNewsData, getHomeColumnData} = useContext(AppDataContext);
  const handleNowSelect = (type) => {
    if (nowSelect === type) return;
    setNowSelect(type);
  };
  const typeArr = [
    {eng: 'NEWS', kor: '뉴스'},
    {eng: 'COLUMN', kor: '칼럼'},
  ];

  return (
    <>
      <PaddingView>
        <View
          style={[
            styles.section__header,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <View>
            <View style={styles.section__header_top}>
              {typeArr?.map((it) => (
                <TouchableOpacity
                  key={it.eng}
                  onPress={() => handleNowSelect(it.eng)}
                  style={[
                    styles.section__header_top_main_wrapper,
                    nowSelect === it.eng
                      ? styles.section__header_top_main_wrapper_on
                      : styles.section__header_top_main_wrapper_off,
                  ]}>
                  <Text
                    style={[
                      styles.section__header_top__main_text,
                      nowSelect === it.eng
                        ? styles.section__header_top__main_text_on
                        : styles.scetion__header_top__main_text_off,
                    ]}>
                    {it.kor}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (nowSelect === 'NEWS') {
                navigation.navigate('List', {
                  screen: '뉴스',
                });
              } else {
                navigation.navigate('List', {
                  screen: '칼럼',
                });
              }
            }}
            style={styles.section__header_side}>
            <View
              style={[
                nowSelect === 'NEWS'
                  ? {backgroundColor: STYLE_COLOR.SECONDARY}
                  : {backgroundColor: STYLE_COLOR.THIRD},
                styles.section__header__side_btn,
              ]}>
              <Text style={styles.section__header__side_btn_text}>더 보기</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.section__header_sub}>
          북마크하지 않은 기사, 칼럼은 업데이트 시 없어질 수 있습니다
        </Text>
      </PaddingView>
      <RenderFeed
        nowSelect={nowSelect}
        news={getHomeNewsData()}
        columns={getHomeColumnData()}
        toggleModal={toggleModal}
      />
    </>
  );
};

const PureHomeFeed = React.memo(HomeFeed);

const HomeModal = ({modalState, toggleModal}) => {
  return (
    <>
      {modalState.isVisible ? (
        <BlurView
          style={styles.blur_container}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor="white"
        />
      ) : (
        <></>
      )}
      <ItemModal modalState={modalState} toggleModal={toggleModal} />
    </>
  );
};

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
  const memoizedToggleModal = useCallback(toggleModal, []);
  return (
    <ScrollView>
      <HomeModal modalState={modalState} toggleModal={toggleModal} />
      <PureHomeCarousel toggleModal={memoizedToggleModal} />
      <PureHomeFeed toggleModal={memoizedToggleModal} navigation={navigation} />
      <View style={{height: 80}} />
    </ScrollView>
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
  section__header__alert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: STYLE_COLOR.PRIMARY_BACKGROUND,
    borderRadius: 5,
  },
  section__header__alert_icon: {
    ...STYLE_TYPHO.PAGE_ALERT__ICON,
  },
  section__header__alert_text: {
    ...STYLE_TYPHO.PAGE_ALERT__TEXT,
  },
  section__header_side: {
    flex: 1,
    alignItems: 'flex-end',
  },
  section__header__side_btn: {
    ...STYLE_COMMON.SHADOW,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  section__header__side_btn_text: {
    ...STYLE_TYPHO.SECTION_SIDE_TEXT,
  },
  section__header_top: {
    flexDirection: 'row',
  },
  section__header_top_main_wrapper: {
    marginRight: 15,
  },
  section__header_top__main_text: {
    ...STYLE_TYPHO.SECTION_HEADER_MAIN,
    marginBottom: 5,
  },
  section__header_top__main_text_on: {
    color: 'black',
  },
  scetion__header_top__main_text_off: {
    color: STYLE_COLOR.DEFAULT,
  },
  section__header_sub: {
    ...STYLE_TYPHO.SECTION_HEADER_SUB,
  },
});

export default HomeScene;
