import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../components/CustomHeader';
import {COLORS, STYLES} from '../styles';
import {useMovieStore} from '../../store';
import {GridMovieCard, NoRecord} from '../components';
import {ww} from '../helpers';

type Props = {};

const FavoriteScreen = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const favorites = useMovieStore(state => state.favorites);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View style={STYLES.mainContainer}>
      <CustomHeader
        title="Favorites"
        info="Here you can edit your favorites."
      />

      <View style={styles.gridContainer}>
        {loading ? (
          <ActivityIndicator
            animating={loading}
            size={'large'}
            color={COLORS.secondary}
          />
        ) : favorites.length > 0 ? (
          <GridMovieCard list={favorites} width={ww(0.45)} numColumns={2} />
        ) : (
          <NoRecord />
        )}
      </View>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  gridContainer: {
    flex: 9,
    paddingTop: 10,
  },
});
