import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';

const AppDataContext = React.createContext(null);

const DATA_KEY = {
  APPDATA: '@APPDATA',
};

const data_uri =
  'https://raw.githubusercontent.com/winterlood/cherrypick_it/main/news.json';

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
    console.log(local_data.date);
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

  const initApp = async () => {
    console.log('=========================================');
    const canUpdate = await canUpdateData();
    if (canUpdate) {
      console.log('✅  UPDATE IS AVAILABLE');
      const data = await getServerData();
      console.log('DATE : ', data.date);
      console.log('DATA : ', data.data.length);
      setState({...data});
      AsyncStorage.setItem(`${DATA_KEY.APPDATA}`, JSON.stringify(data));
    } else {
      console.log('🚫  UPDATE NOT NEED');
      data = await getLocalData();
      console.log('DATE : ', data.date);
      console.log('DATA : ', data.data.length);
      setState({...data});
      AsyncStorage.setItem(`${DATA_KEY.APPDATA}`, JSON.stringify(data));
    }
  };

  useEffect(() => {
    initApp();
  }, []);

  const store = {
    state,
  };
  return (
    <AppDataContext.Provider value={store}>{children}</AppDataContext.Provider>
  );
};
export {AppDataProvider, AppDataContext};
