import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Movie} from '../types';
import {CARD_POSTER_URL} from '../../resources';
import {COLORS, FONTS} from '../styles';
import {checkFav, ww} from '../helpers';
import {FastImages, Footer} from '.';
import LikeButton from './LikeButton';
import {useMovieStore} from '../../store';

type Props = {
  list: Movie[];
  width: number;
  numColumns: number;
  isLoading?: boolean;
  loadMore?: () => void;
  onPress: (id: number) => void;
};

const GridMovieCard = ({
  list,
  width,
  numColumns,
  isLoading,
  loadMore,
  onPress,
}: Props) => {
  const newList = list.length % 2 !== 0 ? [...list, {id: null}] : list;
  const favorites = useMovieStore(state => state.favorites);
  const removeFavorite = useMovieStore(state => state.removeFavorite);
  const addFavorite = useMovieStore(state => state.addFavorite);

  const onFavPress = (item: Movie, isLiked: boolean) => {
    if (isLiked) {
      removeFavorite(item?.id!!);
    } else {
      addFavorite(item!!);
    }
  };
  return (
    <FlatList
      data={newList}
      onEndReachedThreshold={0.2}
      removeClippedSubviews={false}
      ListFooterComponent={() => Footer(isLoading)}
      onEndReached={loadMore}
      renderItem={({item}) => {
        const isLiked = item.id ? checkFav(item?.id, favorites) : false;
        return (
          <>
            {item.id !== null ? (
              <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item.id)}>
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: width * 0.04,
                    right: width * 0.04,
                  }}>
                  <LikeButton
                    isLiked={isLiked}
                    onChecked={() => onFavPress(item, isLiked)}
                  />
                </View>

                <FastImages
                  source={CARD_POSTER_URL + item.poster_path}
                  style={{
                    ...styles.imageThumbnail,
                    width: width,
                    height: width * 1.5,
                  }}
                />

                <View
                  style={{
                    ...styles.voteContainer,
                    bottom: width * 0.35,
                    right: width * 0.05,
                  }}>
                  <Text style={styles.voteText}>
                    {item.vote_average?.toFixed(1)}
                  </Text>
                </View>

                <Text
                  numberOfLines={1}
                  style={{...styles.movieTitle, width: width - 5}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.container} />
            )}
          </>
        );
      }}
      //Setting the number of column
      numColumns={numColumns}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default GridMovieCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  movieTitle: {
    fontSize: ww(0.03),
    fontFamily: FONTS.semiBold,
    paddingVertical: ww(0.05),
    color: COLORS.grey,
    textAlign: 'center',
  },
  voteContainer: {
    zIndex: 2,
    position: 'absolute',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  voteText: {
    fontSize: ww(0.028),
    color: COLORS.secondary,
    fontFamily: FONTS.extraBold,
  },
});
