import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

const PageHeader = ({title}) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default PageHeader;
