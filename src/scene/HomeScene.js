import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';

// STYLE GUIDE
import {STYLE_TYPHO} from '~/util/StyleGuide';

// common
import PaddingView from '~/common/layout/PaddingView';
import PageHeader from '~/common/molecule/PageHeader';
import NewsCarousel from '~/common/molecule/NewsCarousel';

const HomeScene = () => {
  return (
    <>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <PaddingView>
              <PageHeader title={'LOREM'} />
              <Text style={styles.scetion_carousel__header_main}>
                Trending Topics
              </Text>
            </PaddingView>
            <NewsCarousel />
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scetion_carousel__header_main: {
    paddingVertical: 15,
    ...STYLE_TYPHO.SECTION_HEADER_MAIN,
  },
});

export default HomeScene;
