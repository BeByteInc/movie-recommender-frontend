import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../styles';
import {ww} from '../helpers';
import {CARD_POSTER_URL} from '../../resources';
import { CardProps } from '../types';

export const MovieCard = ({item, index}: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.voteContainer}>
        <Text style={styles.voteText}>{item.vote_average?.toFixed(1)}</Text>
      </View>
      <Image
        source={{uri: CARD_POSTER_URL + item.poster_path}}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 20,
    flex: 1,
  },
  voteContainer: {
    zIndex: 2,
    position: 'absolute',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    bottom: 40,
    right: 10,
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  voteText: {
    fontSize: ww(0.035),
    color: COLORS.secondary,
    fontFamily: FONTS.extraBold,
  },
  image: {width: ww(0.75), height: '92%', borderRadius: 20},
  title: {
    color: COLORS.secondary,
    fontSize: ww(0.035),
    fontFamily: FONTS.extraBold,
  },
});
