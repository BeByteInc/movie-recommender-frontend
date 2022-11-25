import {FlatList, StyleSheet, View, Dimensions} from 'react-native';
import React, {memo, useMemo} from 'react';
import {Movie, RecommendMovieProps} from '../types';
import {MovieCard} from './MovieCard';
import {useMovieStore} from '../../store';
import {checkFav} from '../helpers';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;

export const RecommendMovieCard = ({item, width}: RecommendMovieProps) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={item}
        contentContainerStyle={{justifyContent: 'center'}}
        keyExtractor={item => item.id.toString()}
        snapToAlignment="center"
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item, index}) => (
          <MovieCard
            item={item}
            index={index}
            width={width}
          />
        )}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 20,
    flex: 1,
  },
});
