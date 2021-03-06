import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// STORES
import {AppDataContext} from '~/store/AppDataStore';

// COMMON
import NewsItem from '~/common/molecule/NewsItem';
import ItemModal from '~/common/molecule/ItemModal';
import InfoModal from '~/common/molecule/InfoModal';
import PaddingView from '~/common/layout/PaddingView';
// ICONS
import Icon_Feather from 'react-native-vector-icons/Feather';

// STYLE GUIDE
import {STYLE_COLOR, STYLE_TYPHO, STYLE_COMMON} from '~/util/StyleGuide';

const Tab = createMaterialTopTabNavigator();

const TestITem = React.memo(({item}) => {
  useEffect(() => {
    console.log(item.headline);
  });
  return (
    <View style={{height: 100}}>
      <Text>{item.headline}</Text>
    </View>
  );
});

const ListComponent = React.memo(({type, memoizedToggleModal}) => {
  const {state, getItemProviderData} = useContext(AppDataContext);

  const MemoizedRenderItem = useCallback(
    ({item}) => (
      <TestITem
        target={item.source}
        item={{...item}}
        toggleModal={memoizedToggleModal}
      />
    ),
    [],
  );
  const MemoizedKeyExtractor = useCallback((item, idx) => `${type}_${idx}`, []);

  return (
    <FlatList
      // initialNumToRender={5}
      // windowSize={10}
      data={
        state
          ? type === 'NEWS'
            ? state.data_news
            : state.data_column
          : undefined
      }
      ListHeaderComponent={<InfoView type={type} />}
      renderItem={({item}) => (
        <TestITem item={{...item}} toggleModal={memoizedToggleModal} />
      )}
      keyExtractor={MemoizedKeyExtractor}
      ListFooterComponent={() => <View style={{height: 60}}></View>}
    />
  );
});

const ItemList = ({type}) => {
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
    <>
      <ItemModal modalState={modalState} toggleModal={toggleModal} />
      <ListComponent type={type} memoizedToggleModal={memoizedToggleModal} />
    </>
  );
};

const NewsScene = () => {
  return (
    <>
      <ItemList type={'NEWS'} />
    </>
  );
};
const ColumnScene = () => {
  return <>{/* <ItemList type={'COLUMN'} /> */}</>;
};

const InfoView = ({type}) => {
  const [modalState, setModalState] = useState({
    isVisible: false,
    type: 'NEWS',
  });
  const toggleModal = (type) => {
    if (modalState.isVisible) {
      setModalState({
        isVisible: false,
        type: 'NEWS',
      });
    } else {
      setModalState({
        isVisible: true,
        type: type,
      });
    }
  };
  return (
    <>
      <InfoModal modalState={modalState} toggleModal={toggleModal} />
      <PaddingView>
        <TouchableOpacity
          onPress={() => toggleModal(type)}
          style={styles.section__header__alert}>
          <Icon_Feather
            name="info"
            style={styles.section__header__alert_icon}
          />
          <Text style={styles.section__header__alert_icon}>
            {type === 'NEWS' ? '??????' : '??????'} ????????? ?????? ????????????
          </Text>
        </TouchableOpacity>
      </PaddingView>
    </>
  );
};
const ListScene = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            height: 45,
            paddingHorizontal: '10%',
            backgroundColor: 'rgb(240,240,240)',
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(230,230,230)',
            elevation: 0,
            marginHorizontal: 20,
          },
          indicatorStyle: {
            borderBottomWidth: 0,
            borderColor: 'white',
            backgroundColor: 'white',
            height: 0,
          },
          tabStyle: {},
          labelStyle: {
            fontFamily: 'AppleEB',
          },
          activeTintColor: 'red',
          inactiveTintColor: 'lightgray',
        }}>
        <Tab.Screen name="??????" component={NewsScene} />
        <Tab.Screen name="??????" component={ColumnScene} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section__header__alert: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: STYLE_COLOR.PRIMARY_BACKGROUND,
    borderRadius: 5,
  },
  section__header__alert_icon: {
    ...STYLE_TYPHO.PAGE_ALERT__ICON,
    marginRight: 10,
  },
  section__header__alert_text: {
    ...STYLE_TYPHO.PAGE_ALERT__TEXT,
  },
});

export default ListScene;
