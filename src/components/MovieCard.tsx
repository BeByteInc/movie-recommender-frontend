import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {COLORS, FONTS} from '../styles';
import {checkFav, ww} from '../helpers';
import {CARD_POSTER_URL} from '../../resources';
import {CardProps} from '../types';
import LikeButton from './LikeButton';
import {useMovieStore} from '../../store';

export const MovieCard = ({item, width}: CardProps) => {
  const favorites = useMovieStore(state => state.favorites);
  const removeFavorite = useMovieStore(state => state.removeFavorite);
  const addFavorite = useMovieStore(state => state.addFavorite);
  const isLiked = checkFav(item.id,favorites);

  const onFavPress = () => {
    if (isLiked) {
      removeFavorite(item?.id!!);
    } else {
      addFavorite(item!!);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position:"absolute",
          zIndex: 2,
          top: width * 0.08,
          right: width * 0.04,
        }}>
        <LikeButton isLiked={isLiked} onChecked={onFavPress} />
      </View>
      <View
        style={{
          ...styles.voteContainer,
          top:width * 0.83,
          right:15
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
    position: 'relative',
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
    alignSelf: "flex-end",
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
