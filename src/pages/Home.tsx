import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-elements';
import { ALL_GENRES } from '../../resources';
import {
  useLoadingState,
  useMovieStore,
  useTokenState,
  useUserStore,
} from '../../store';
import {CategorySlider, RecommendMovieCard} from '../components';
import CustomHeader from '../components/CustomHeader';
import SearchBarWithIcon from '../components/SearchBarWithIcon';
import {wh, ww} from '../helpers';
import {addCategory} from '../helpers/addCategory';
import { filterMovieList } from '../helpers/filterMovieList';
import {getRecommended, getTopRatedMovies} from '../services';
import {COLORS, FONTS, STYLES} from '../styles';
import {Movie} from '../types';

type Props = {};

export const Home = (props: Props) => {
  const favorites = useMovieStore(state => state.favorites);
  const addFavorite = useMovieStore(state => state.addFavorite);
  const setLoading = useLoadingState(state => state.setLoading);
  const user = useUserStore(state => state.user);
  const [genres,setGenres] = useState<string[]>(ALL_GENRES);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [filteredList, setFilteredList] = useState<Movie[]>([]);

  useEffect(() => {
    getMovieList();
  }, []);

  useEffect(() => {
    if (selectedCategory.length > 0) {
        let filters = filterMovieList(movieList,selectedCategory);
        setFilteredList(filters.list.slice(0,5));
        setGenres(filters.genres.sort());
    } else {
      setGenres(ALL_GENRES);
      setFilteredList(movieList.slice(0,5));
    }
  }, [selectedCategory]);

  const getMovieList = async () => {
    try {
      const movieList = await getRecommended(user.user_id);
      setMovieList(movieList?.data.item_list.movie_list);
      setFilteredList(movieList?.data.item_list.movie_list.slice(0,5));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={STYLES.mainContainer}>
      <CustomHeader title={"Welcome " + user.username} info='Here is some movie advices for you.'/>
      <View style={styles.categorySection}>
        <CategorySlider
          onPressCategory={(selected: string) =>
            setSelectedCategory(addCategory(selected, selectedCategory))
          }
          selected={selectedCategory}
          genres={genres}
        />
      </View>
      <View style={styles.bodySection}>
        <RecommendMovieCard item={filteredList} width={ww(1)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categorySection: {
    flex: 1.2,
    marginTop: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodySection: {
    flex: 12,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
