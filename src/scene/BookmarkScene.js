import React, {useState, useContext, useCallback} from 'react';
import {StyleSheet, FlatList, SafeAreaView, View} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// COMMON
import PaddingView from '~/common/layout/PaddingView';
import PageHeader from '~/common/molecule/PageHeader';

// STORES
import {AppDataContext} from '~/store/AppDataStore';

// COMMON
import NewsItem from '~/common/molecule/NewsItem';
import ItemModal from '~/common/molecule/ItemModal';

// STYLE GUIDE
import {STYLE_TYPHO} from '~/util/StyleGuide';

const Tab = createMaterialTopTabNavigator();
const ItemList = ({type}) => {
  const {state, getBookmarkedNewsData, getBookmarkedColumnData} = useContext(
    AppDataContext,
  );
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
      <FlatList
        data={
          state
            ? type === 'NEWS'
              ? getBookmarkedNewsData()
              : getBookmarkedColumnData()
            : undefined
        }
        renderItem={({item}) => (
          <NewsItem item={item} toggleModal={memoizedToggleModal} />
        )}
        keyExtractor={(item, idx) => `${type}_${idx}`}
        ListFooterComponent={() => <View style={{height: 60}}></View>}
      />
    </>
  );
};

const NewsScene = () => {
  return <ItemList type={'NEWS'} />;
};
function ColumnScene() {
  return <ItemList type={'COLUMN'} />;
}
const BookmarkScene = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <PaddingView style={{marginBottom: 10}}>
        <PageHeader scene={'BOOKMARK'} />
      </PaddingView>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            height: 45,
            paddingHorizontal: '10%',
            backgroundColor: 'rgb(235,235,235)',
            elevation: 10,
          },
          indicatorStyle: {
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
        <Tab.Screen name="뉴스" component={NewsScene} />
        <Tab.Screen name="칼럼" component={ColumnScene} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BookmarkScene;
