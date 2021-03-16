import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import moment from 'moment';
import 'moment/locale/ko';
import {useCallback} from 'react';

const moment = require('moment');
moment.locale('ko');

const AppDataContext = React.createContext(null);

const DATA_KEY = {
  APPDATA: '@APPDATA',
  BOOKMARK_DATA: '@BOOKMARK',
};

const data_uri =
  'https://raw.githubusercontent.com/winterlood/cherrypick_it/main/output.json';

const AppDataProvider = ({children}) => {
  const [state, setState] = useState();

  const getServerData = async () => {
    const restData = await axios
      .get(data_uri)
      .then((response) => response?.data);
    return restData;
  };

  const getLocalData = async () => {
    var value = await AsyncStorage.getItem(`${DATA_KEY.APPDATA}`);
    value = value ? JSON.parse(value) : 'NO-DATA';
    return value;
  };

  const isNewData = async (local_data) => {
    var raw_date = local_data.date.split('.')[0];
    var year = raw_date.substring(0, 4);
    var month = raw_date.substring(5, 7);
    var day = raw_date.substring(8, 10);
    var hour = raw_date.substring(11, 13);
    var minute = raw_date.substring(14, 16);
    var second = raw_date.substring(17, 19);
    var next_update_moment = moment(
      `${year}-${month}-${day} ${hour}:${minute}:${second}`,
      'YYYY-MM-DD HH:mm:ss',
    ).add('6', 'hours');
    console.log(
      'NEXT UPDATE IS : ',
      next_update_moment.format('YYYY-MM-DD HH:mm:ss'),
    );
    console.log('NOW TIME IS : ', moment().format('YYYY-MM-DD HH:mm:ss'));
    return moment().isAfter(next_update_moment, 'hours');
  };

  const canUpdateData = async () => {
    var local_data = await getLocalData();
    if (local_data === 'NO-DATA') {
      return true;
    } else {
      var isNewDataFlag = await isNewData(local_data);
      if (isNewDataFlag) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkIsBookmark = async (data) => {
    if (data) {
      // 1. 구독 리스트 불러오기
      var subsribe_list = [];
      await AsyncStorage.getItem(DATA_KEY.BOOKMARK_DATA, (error, result) => {
        subsribe_list = result !== null ? JSON.parse(result) : 'NO_DATA';
      });

      if (subsribe_list === 'NO_DATA') return data;

      const res_data = data?.map((it) => {
        if (
          subsribe_list?.findIndex((list_it) => list_it.url === it.url) !== -1
        ) {
          return {
            ...it,
            bookmark: true,
          };
        } else {
          return {...it, bookmark: false};
        }
      });
      return res_data;
    }
    return [];
  };

  const getKoreanUpdateTime = (time_string) => {
    var raw_date = time_string.split('.')[0];
    var year = raw_date.substring(0, 4);
    var month = raw_date.substring(5, 7);
    var day = raw_date.substring(8, 10);
    var hour = raw_date.substring(11, 13);
    var minute = raw_date.substring(14, 16);
    var second = raw_date.substring(17, 19);
    return moment(
      `${year}-${month}-${day} ${hour}:${minute}:${second}`,
      'YYYY-MM-DD HH:mm:ss',
    ).fromNow();
  };

  const insertRandomAd = (data) => {
    var data_clone = data?.slice();
    var min = Math.ceil(3);
    var max = Math.floor(7);
    var random_ad_count = Math.floor(Math.random() * (max - min)) + min;

    for (var i = 0; i < random_ad_count; i++) {
      var data_length = data_clone.length;

      var cur_min = Math.ceil(0);
      var cur_max = Math.floor(data_length);
      var cur_random_idx =
        Math.floor(Math.random() * (cur_max - cur_min)) + cur_min;

      var prev_elm =
        prev_elm !== 0 ? data_clone[cur_random_idx - 1] : {type: 'NONE'};
      var next_elm =
        prev_elm !== data_length
          ? data_clone[cur_random_idx + 1]
          : {type: 'NONE'};

      if (prev_elm.type === 'AD' || next_elm.type === 'AD') {
        i -= 1;
      } else {
        data_clone.splice(cur_random_idx, 0, {site: `AD_${i}`, type: 'AD'});
      }
    }
    return data_clone;
  };

  const initApp = async () => {
    console.log('=========================================');
    try {
      const canUpdate = await canUpdateData();
      if (canUpdate) {
        console.log('✅  UPDATE IS AVAILABLE');
        const data = await getServerData();
        console.log('DATE : ', data.date);
        console.log('TOTAL COUNT : ', data.count_total);
        console.log('NEWS COUNT  : ', data.count_news);
        console.log('COLUMNS COUNT  : ', data.count_column);

        const res_data_news = await checkIsBookmark(data.data_news);
        const res_data_column = await checkIsBookmark(data.data_column);
        var last_update_time = getKoreanUpdateTime(data.date);

        const storage_data = {
          ...data,
          data_news: res_data_news,
          data_column: res_data_column,
          last_update_time: last_update_time,
        };
        AsyncStorage.setItem(
          `${DATA_KEY.APPDATA}`,
          JSON.stringify(storage_data),
        );

        const include_ad_news = insertRandomAd(res_data_news);
        const include_ad_column = insertRandomAd(res_data_column);
        const res_data = {
          ...data,
          data_news: include_ad_news,
          data_column: include_ad_column,
          last_update_time: last_update_time,
        };
        setState(res_data);
      } else {
        console.log('🚫  UPDATE NOT NEED');
        const data = await getLocalData();
        console.log('DATE : ', data.date);
        console.log('TOTAL COUNT : ', data.count_total);
        console.log('NEWS COUNT  : ', data.count_news);
        console.log('COLUMNS COUNT  : ', data.count_column);

        const res_data_news = await checkIsBookmark(data.data_news);
        const res_data_column = await checkIsBookmark(data.data_column);
        var last_update_time = getKoreanUpdateTime(data.date);

        const storage_data = {
          ...data,
          data_news: res_data_news,
          data_column: res_data_column,
          last_update_time: last_update_time,
        };
        AsyncStorage.setItem(
          `${DATA_KEY.APPDATA}`,
          JSON.stringify(storage_data),
        );

        const include_ad_news = insertRandomAd(res_data_news);
        const include_ad_column = insertRandomAd(res_data_column);
        const res_data = {
          ...data,
          data_news: include_ad_news,
          data_column: include_ad_column,
          last_update_time: last_update_time,
        };
        setState(res_data);
      }
    } catch (e) {
      console.log(e);
      AsyncStorage.removeItem(`${DATA_KEY.APPDATA}`);
    }
  };

  useEffect(() => {
    initApp();
  }, []);

  // ACTIONS
  const itemAction = useCallback(
    async (actionType, target_item) => {
      switch (actionType) {
        case 'BOOKMARK': {
          console.log(actionType);
          console.log(target_item.url);
          console.log(target_item.type);
          // 1. 구독 리스트 불러오기
          var bookmark_list = [];
          await AsyncStorage.getItem(
            DATA_KEY.BOOKMARK_DATA,
            (error, result) => {
              bookmark_list = result !== null ? JSON.parse(result) : [];
            },
          );

          // 2. STORAGE 반영
          var target_index = bookmark_list.findIndex(
            (it) => it.url === target_item.url,
          );
          if (target_index !== -1) {
            // 2-1. 구독중인 아이템 -> 구독 리스트 제거
            console.log('REMOVE ACTION');
            bookmark_list.splice(parseInt(target_index), 1);
          } else {
            // 2-2. 구독아닌 아이템 -> 구독 리스트 추가
            console.log('ADD ACTION');
            bookmark_list.push(target_item);
          }
          await AsyncStorage.setItem(
            DATA_KEY.BOOKMARK_DATA,
            JSON.stringify(bookmark_list),
          );

          // 3. STATE 반영 (TOGGLE)
          var origin_state_list =
            target_item.type === 'TYPE_NEWS'
              ? state.data_news
              : state.data_column;

          var new_state_list = origin_state_list.slice().map((it) => {
            if (it.url === target_item.url) {
              return {...it, bookmark: !it.bookmark};
            } else {
              return it;
            }
          });

          if (target_item.type === 'TYPE_NEWS') {
            setState({
              ...state,
              data_news: new_state_list,
            });
          } else {
            setState({
              ...state,
              data_column: new_state_list,
            });
          }
        }
        default:
          return;
      }
    },
    [state],
  );

  // SELECTORS
  const getCarouselData = useCallback(() => {
    // HOME SCENE USE
    // STATE 변경시 -> 재평가
    if (state) {
      var carousel_data = [];
      var image_able_news = state?.data_news
        ?.filter((it) => it.thumbnail_url)
        ?.slice(3, 6);
      var image_able_column = state?.data_column
        ?.filter((it) => it.thumbnail_url)
        ?.slice(3, 6);

      var length = Math.max(image_able_news?.length, image_able_column?.length);
      for (var i = 0; i < length; i++) {
        if (image_able_news[i] !== undefined) {
          carousel_data.push(image_able_news[i]);
        }
        if (image_able_column[i] !== undefined) {
          carousel_data.push(image_able_column[i]);
        }
      }

      // return carousel_data.sort(() => Math.random() - 0.5);
      return carousel_data;
    } else {
      return [];
    }
  }, [state]);
  const getHomeNewsData = useCallback(() => {
    // HOME SCENE USE
    // STATE 변경시 -> 재평가
    if (state) {
      var news_data = [];
      news_data = state?.data_news
        ?.filter((it) => it.type !== 'AD')
        ?.slice(0, 3);
      return news_data;
    } else {
      return [];
    }
  }, [state]);
  const getHomeColumnData = useCallback(() => {
    // HOME SCENE USE
    // STATE 변경시 -> 재평가
    if (state) {
      var column_data = [];
      column_data = state?.data_column
        ?.filter((it) => it.type !== 'AD')
        ?.slice(0, 3);
      return column_data;
    } else {
      return [];
    }
  }, [state]);

  const getBookmarkedNewsData = useCallback(() => {
    // BOOKMARK SCENE USE
    // STATE 변경시 -> 재평가
    if (state) {
      var news_data = [];
      news_data = state?.data_news?.filter((it) => it.bookmark)?.slice();
      return news_data;
    } else {
      return [];
    }
  }, [state]);

  const getBookmarkedColumnData = useCallback(() => {
    // BOOKMARK SCENE USE
    // STATE 변경시 -> 재평가
    if (state) {
      var column_data = [];
      column_data = state?.data_column?.filter((it) => it.bookmark)?.slice();
      return column_data;
    } else {
      return [];
    }
  }, [state]);

  const store = {
    state,
    getCarouselData,
    getHomeNewsData,
    getHomeColumnData,
    getBookmarkedNewsData,
    getBookmarkedColumnData,
    itemAction,
  };
  return (
    <AppDataContext.Provider value={store}>{children}</AppDataContext.Provider>
  );
};
export {AppDataProvider, AppDataContext};
