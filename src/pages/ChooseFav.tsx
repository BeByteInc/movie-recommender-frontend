import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, STYLES} from '../styles';
import ProgressHeader from '../components/ProgressHeader';
import SearchBarWithIcon from '../components/SearchBarWithIcon';
import {FlatList} from 'react-native-gesture-handler';
import {Movie} from '../types';
import {getTopRatedMovies, searchAll, setUserFavorites} from '../services';
import {checkFav, genreArray, wh, ww} from '../helpers';
import {POSTER_URL} from '../../resources';
import _ from 'lodash';
import {Footer, Loader} from '../components';
import LikeButton from '../components/LikeButton';
import {useLoadingState, useMovieStore, useUserStore} from '../../store';
import {getFavoriteIds} from '../helpers/getFavoriteIds';

type Props = {};

export const ChooseFav = (props: Props) => {
  const loading = useLoadingState(state => state.loading);
  const setLoading = useLoadingState(state => state.setLoading);
  const addFavList = useMovieStore(state => state.addFavList);
  const user = useUserStore(state => state.user);
  const updateUser = useUserStore(state => state.updateUser);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [searchedMovieList, setSearchedMovieList] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFav, setSelectedFav] = useState<Movie[]>([]);
  const [selectedLength, setSelectedLength] = useState<number>(0);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    getMovieList();
  }, [page]);

  useEffect(() => {
    if (search) {
      setSearchLoading(true);
      getSearchedList();
    }
  }, [search]);

  const debounce_search = _.debounce(function (text: string) {
    setSearch(text);
    setSearchLoading(false);
  }, 1000);

  const next = async () => {
    setLoading(true);
    try {
      let status = await setUserFavorites({
        user_id: user.user_id,
        movie_ids: getFavoriteIds(selectedFav),
      });
      if (status === 200) {
        addFavList(selectedFav);
        updateUser({username:user.username,user_id:user.user_id,user_favorites:selectedFav});
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false), 500;
      });
    }
  };

  const onFavPress = (item: Movie) => {
    const newArr = selectedFav;
    const index = newArr.findIndex(object => {
      return object.id === item.id;
    });
    if (index !== -1) {
      newArr.splice(index, 1);
    } else {
      newArr.push(item);
    }
    setSelectedFav(() => {
      return newArr;
    });
    setSelectedLength(newArr.length);
  };

  const getSearchedList = async () => {
    let list = await searchAll(search);
    setSearchedMovieList(list);
    setIsLoading(false);
  };

  const getMovieList = async () => {
    let list = await getTopRatedMovies(page);
    setMovieList([...movieList, ...list]);
    setIsLoading(false);
    setLoading(false);
  };

  const loadMore = () => {
    if (!searchLoading && !loading && !isLoading && !search) {
      setIsLoading(true);
      setPage(prev => {
        return prev + 1;
      });
    }
  };

  const renderMovieList = ({item, index}: any) => {
    return (
      <View
        key={`${item.id}--${index}`}
        style={{
          width: ww(0.8),
          alignSelf: 'center',
          backgroundColor: COLORS.grayBg,
          margin: 8,
          borderRadius: 20,
          shadowColor: COLORS.grey,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.65,
          position: 'relative',
          elevation: 3,
        }}>
        <ImageBackground
          source={{
            uri: POSTER_URL + item.poster_path,
          }}
          resizeMode={'cover'}
          imageStyle={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
          style={{width: '100%', height: wh(0.27)}}>
          <LikeButton
            isLiked={checkFav(item.id, selectedFav)}
            onChecked={() => onFavPress(item)}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              padding: 5,
            }}>
            {genreArray(item.genre_names).map((genre: any) => (
              <View
                key={genre}
                style={{
                  backgroundColor: COLORS.secondary,
                  padding: 4,
                  paddingHorizontal: 5,
                  margin: 2,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.semiBold,
                    fontSize: ww(0.027),
                  }}>
                  {genre}
                </Text>
              </View>
            ))}
          </ScrollView>
        </ImageBackground>

        <View style={{padding: 8}}>
          <Text numberOfLines={2} style={STYLES.movieCardTitle}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.main}}>
      <ProgressHeader selectedFav={selectedLength} next={next} />
      <Loader loading={loading} />
      <Text style={STYLES.text}>Choose at least 5 favorite movies 🎉</Text>
      <SearchBarWithIcon onChange={debounce_search} />

      <View
        style={{
          height: 0.8,
          width: ww(0.95),
          backgroundColor: COLORS.secondary,
          marginVertical: 10,
          alignSelf: 'center',
          borderRadius: 12,
        }}
      />

      <FlatList
        data={!search ? movieList : searchedMovieList}
        contentContainerStyle={{paddingVertical: 10}}
        onEndReachedThreshold={0.2}
        removeClippedSubviews={false}
        ListFooterComponent={() => Footer(isLoading)}
        onEndReached={loadMore}
        renderItem={renderMovieList}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
