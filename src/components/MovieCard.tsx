import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../styles';
import {ww} from '../helpers';
import {CARD_POSTER_URL} from '../../resources';
import {CardProps} from '../types';

export const MovieCard = ({item, index, width}: CardProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.voteContainer,
          bottom: width * 0.18,
          right: width * 0.05,
        }}>
        <Text style={styles.voteText}>{item.vote_average?.toFixed(1)}</Text>
      </View>
      <Image
        source={{uri: CARD_POSTER_URL + item.poster_path}}
        style={{...styles.image, width: width * 0.75, height: width * 0.9}}
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
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  voteText: {
    fontSize: ww(0.035),
    color: COLORS.secondary,
    fontFamily: FONTS.extraBold,
  },
  image: {borderRadius: 20},
  title: {
    color: COLORS.secondary,
    fontSize: ww(0.035),
    fontFamily: FONTS.extraBold,
  },
});
