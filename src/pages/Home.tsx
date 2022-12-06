import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {ALL_GENRES} from '../../resources';
import {useLoadingState, useMovieStore, useUserStore} from '../../store';
import {CategorySlider, MovieCard, Paginator} from '../components';
import CustomHeader from '../components/CustomHeader';
import {ww} from '../helpers';
import {addCategory} from '../helpers/addCategory';
import {filterMovieList} from '../helpers/filterMovieList';
import {getRecommended} from '../services';
import {STYLES} from '../styles';
import {Movie} from '../types';

type Props = {};

export const Home = (props: Props) => {
  const navigation = useNavigation();
  const setLoading = useLoadingState(state => state.setLoading);
  const user = useUserStore(state => state.user);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [genres, setGenres] = useState<string[]>(ALL_GENRES);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [filteredList, setFilteredList] = useState<Movie[]>([]);

  useEffect(() => {
    getMovieList();
  }, []);

  useEffect(() => {
    if (selectedCategory.length > 0) {
      let filters = filterMovieList(movieList, selectedCategory);
      setFilteredList(filters.list.slice(0, 5));
      setGenres(filters.genres.sort());
    } else {
      setGenres(ALL_GENRES);
      setFilteredList(movieList.slice(0, 5));
    }
  }, [selectedCategory]);

  const getMovieList = async () => {
      try {
        const movieList = await getRecommended(user.user_id);
        setMovieList(movieList?.data.item_list.movie_list);
        setFilteredList(movieList?.data.item_list.movie_list.slice(0, 5));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
  };

  return (
    <View style={STYLES.mainContainer}>
      <CustomHeader
        title={'Welcome ' + user.username}
        info="Here is some movie advices for you."
      />
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
        <View style={styles.container}>
          <Animated.FlatList
            data={filteredList}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            contentContainerStyle={{justifyContent: 'center'}}
            keyExtractor={item => item.id.toString()}
            snapToAlignment="center"
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  //@ts-ignore
                  navigation.navigate('MovieDetail', {id: item.id});
                }}>
                <MovieCard item={item} width={ww(1)} />
              </TouchableOpacity>
            )}
          />
          <View style={styles.paginatorStyle}>
            <Paginator
              data={filteredList}
              scrollX={scrollX}
              screenWidth={ww(1) - 40}
            />
          </View>
        </View>
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
  container: {
    justifyContent: 'space-evenly',
    position: 'relative',
    alignItems: 'center',
    marginHorizontal: 20,
    flex: 1,
  },
  paginatorStyle: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
