import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Movie} from '../types';
import {CARD_POSTER_URL} from '../../resources';
import {COLORS, FONTS} from '../styles';
import {ww} from '../helpers';
import {Footer} from '.';

type Props = {
  list: Movie[];
  width: number;
  numColumns: number;
  isLoading?: boolean;
  loadMore?: () => void;
};

const GridMovieCard = ({
  list,
  width,
  numColumns,
  isLoading,
  loadMore,
}: Props) => {
  const newList = list.length % 2 !== 0 ? [...list, {id: null}] : list;
  return (
    <FlatList
      data={newList}
      onEndReachedThreshold={0.2}
      removeClippedSubviews={false}
      ListFooterComponent={() => Footer(isLoading)}
      onEndReached={loadMore && loadMore}
      renderItem={({item}) => (
        <>
          {item.id !== null ? (
            <View style={styles.container}>
              <Image
                style={{
                  ...styles.imageThumbnail,
                  width: width,
                  height: width * 1.5,
                }}
                source={{uri: CARD_POSTER_URL + item.poster_path}}
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
            </View>
          ) : (
            <View style={styles.container}/>
          )}
        </>
      )}
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
