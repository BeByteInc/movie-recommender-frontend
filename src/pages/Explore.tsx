import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, STYLES} from '../styles';
import CustomHeader from '../components/CustomHeader';
import SearchBarWithIcon from '../components/SearchBarWithIcon';
import {
  CategorySlider,
  GridMovieCard,
  NoRecord,
  RecommendMovieCard,
} from '../components';
import {ww} from '../helpers';
import {FilterProps, Movie} from '../types';
import {
  getTopRatedMovies,
  getTopRatedMoviesByGenre,
  searchAll,
} from '../services';
import {ALL_GENRES} from '../../resources';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

type Props = {};

export const Explore = (props: Props) => {
  const navigation = useNavigation();
  const genres:string[] = ALL_GENRES;
  const [filteredList, setFilteredList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterProps>({
    page: 1,
    search: '',
    genre: '',
  });

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      if (filter.search !== '') {
        let list = await searchAll(filter.search);
        setFilteredList(list);
      } else if (filter.genre !== '') {
        const response = await getTopRatedMoviesByGenre(
          filter.page,
          filter.genre,
        );
        setFilteredList([...filteredList, ...response]);
      } else {
        const response = await getTopRatedMovies(filter.page);
        setFilteredList([...filteredList, ...response]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && !isLoading && filter.search === '') {
      setIsLoading(true);
      setFilter({
        page: filter.page + 1,
        genre: '',
        search: '',
      });
    }
  };

  const debounce_search = _.debounce(function (text: string) {
    setFilter({
      page: 1,
      genre: '',
      search: text,
    });
  }, 1000);

  return (
    <View style={STYLES.mainContainer}>
      <CustomHeader title={'Explore'} info="Here you can explore all movies." />
      <SearchBarWithIcon
        onChange={text => {
          setLoading(true);
          if (text === '') {
            setFilteredList([]);
          }
          debounce_search(text);
        }}
      />
      <View style={styles.categorySection}>
        <CategorySlider
          onPressCategory={(selected: string) => {
            setLoading(true);
            setFilteredList([]);
            if (filter.genre === selected) {
              setFilter({
                page: 1,
                genre: '',
                search: '',
              });
            } else {
              setFilter({
                page: 1,
                genre: selected,
                search: '',
              });
            }
          }}
          selected={Array(filter.genre)}
          genres={genres}
        />
      </View>

      <View style={styles.gridContainer}>
        {loading ? (
          <ActivityIndicator
            animating={loading}
            size={'large'}
            color={COLORS.secondary}
          />
        ) : filteredList.length > 0 ? (
          <GridMovieCard
            list={filteredList}
            width={ww(0.45)}
            numColumns={2}
            onPress={(id) => {
              // @ts-ignore
              navigation.navigate('MovieDetail',{id:id});
            }}
            loadMore={loadMore}
            isLoading={isLoading}
          />
        ) : (
          <NoRecord />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 9,
    paddingTop: 10,
  },
  categorySection: {
    flex: 1,
  },
});
