import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';

// STORES
import {AppDataContext} from '~/store/AppDataStore';

// COMMON
import NewsItem from '~/common/molecule/NewsItem';
import ItemModal from '~/common/molecule/ItemModal';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const ItemList = ({type}) => {
  const {state} = useContext(AppDataContext);
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
      <ItemModal modalState={modalState} toggleModal={toggleModal} />
      <FlatList
        data={
          state
            ? type === 'NEWS'
              ? state.data_news
              : state.data_column
            : undefined
        }
        renderItem={({item}) => (
          <NewsItem item={item} toggleModal={toggleModal} />
        )}
        keyExtractor={(item) => item.url}
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
        <Tab.Screen name="뉴스" component={NewsScene} />
        <Tab.Screen name="칼럼" component={ColumnScene} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ListScene;
