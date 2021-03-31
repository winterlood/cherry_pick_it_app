import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, TouchableOpacity, View, Text, Linking} from 'react-native';
import axios from 'axios';

// STORES
import {AppDataContext} from '~/store/AppDataStore';

// Icons
import Icon_Feather from 'react-native-vector-icons/Feather';
import {STYLE_COLOR} from '../../util/StyleGuide';

const ProviderItem = ({item}) => {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(item.source)}
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgb(250,250,250)',
        backgroundColor: 'rgb(245,245,245)',
        marginBottom: 10,
        borderRadius: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontFamily: 'AppleB',
            fontSize: 14,
            marginRight: 5,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontFamily: 'AppleL',
            fontSize: 10,
          }}>
          {item.type} SITE
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            textDecorationLine: 'underline',
            fontFamily: 'AppleL',
            fontSize: 18,
            marginRight: 5,
          }}>
          {item.source}
        </Text>
        <Icon_Feather name="external-link" style={{fontSize: 15}} />
      </View>
    </TouchableOpacity>
  );
};

const InfoModal = ({modalState, toggleModal}) => {
  const {getContentProviderData} = useContext(AppDataContext);

  const getKorType = () => {
    return modalState.type === 'NEWS' ? '뉴스' : '칼럼';
  };
  return (
    <Modal isVisible={modalState.isVisible}>
      <View style={styles.container}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.header__text}>{getKorType()} 공급자 정보</Text>
          <Text style={styles.header__label}>
            {getKorType()} 게시자의 유효한 연락처 정보
          </Text>
          <Text style={styles.header__label}>
            클릭시 해당 사이트로 바로 이동합니다.
          </Text>
          <Text style={styles.header__label}>
            정보에 문제가 있다고 판단될 시 king199777@gmail.com으로 문의
            부탁드립니다.
          </Text>
        </View>
        {modalState.type === 'NEWS'
          ? getContentProviderData()?.news?.map((it, idx) => (
              <ProviderItem key={`NEWS_${idx}`} item={it} />
            ))
          : getContentProviderData()?.column?.map((it, idx) => (
              <ProviderItem key={`COLUMN_${idx}`} item={it} />
            ))}
        <TouchableOpacity
          onPress={() => toggleModal()}
          style={styles.bottom_btn}>
          <Text style={styles.bottom_btn__text}>닫기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  header__text: {
    fontFamily: 'AppleB',
    fontSize: 20,
    marginBottom: 5,
  },
  header__label: {
    fontFamily: 'AppleL',
    fontSize: 12,
  },
  bottom_btn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: STYLE_COLOR.PRIMARY,
  },
  bottom_btn__text: {
    fontFamily: 'AppleEB',
    color: 'white',
    textAlign: 'center',
  },
});

export default InfoModal;
