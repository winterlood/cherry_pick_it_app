import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import AppRouter from '~/AppRouter';

// context
import {AppDataProvider} from '~/store/AppDataStore';

const App = () => {
  return (
    <AppDataProvider>
      <AppRouter />
    </AppDataProvider>
  );
};

export default App;
