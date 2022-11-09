import {
  FlatList,
  StyleSheet,
  View,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import React from 'react';
import {CARD_POSTER_URL} from '../../resources';
import {ww} from '../helpers';
import {Icon, Text} from 'react-native-elements';
import {COLORS, FONTS, STYLES} from '../styles';
import { RecommendMovieProps } from '../types';
import { MovieCard } from './MovieCard';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

export const RecommendMovieCard = ({item}: RecommendMovieProps) => {
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
        renderItem={MovieCard}
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
