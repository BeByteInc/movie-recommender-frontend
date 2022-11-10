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
import {Movie} from '../types';
import {
  getTopRatedMovies,
  getTopRatedMoviesByGenre,
  searchAll,
} from '../services';
import {ALL_GENRES} from '../../resources';
import _ from 'lodash';

type Props = {};

export const Explore = (props: Props) => {
  const [filteredList, setFilteredList] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<string[]>(ALL_GENRES);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  useEffect(() => {
    if (!filter) {
      getMovieList();
    } else {
      getFilteredList();
    }
  }, [filter, page]);

  useEffect(() => {
    if (search) {
      getSearchedList();
      setPage(1);
    } else if (filter) {
      getFilteredList();
    } else {
      getMovieList();
    }
  }, [search]);

  const getSearchedList = async () => {
    let list = await searchAll(search);
    console.log(list);
    setFilteredList(list);
  };

  const getMovieList = async () => {
    try {
      const response = await getTopRatedMovies(page);
      setFilteredList([...filteredList,...response]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const getFilteredList = async () => {
    try {
      const response = await getTopRatedMoviesByGenre(page, filter);
      console.log(response);
      setFilteredList([...filteredList,...response]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && !isLoading && !search) {
      setIsLoading(true);
      setPage(prev => {
        return prev + 1;
      });
    }
  };

  const debounce_search = _.debounce(function (text: string) {
    setSearch(text);
  }, 1000);

  return (
    <View style={STYLES.mainContainer}>
      <CustomHeader title={'Explore'} info="Here you can explore all movies." />
      <SearchBarWithIcon onChange={debounce_search} />
      <View style={styles.categorySection}>
        <CategorySlider
          onPressCategory={(selected: string) => {
            setPage(1);
            setFilteredList([]);
            setLoading(true);
            if (filter === selected) {
              setFilter('');
            } else {
              setFilter(selected);
            }
          }}
          selected={Array(filter)}
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
          <GridMovieCard list={filteredList} width={ww(0.45)} numColumns={2} loadMore={loadMore} isLoading={isLoading}/>
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
