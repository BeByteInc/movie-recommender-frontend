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
import {useLoadingState, useMovieStore} from '../../store';
import {CategorySlider, RecommendMovieCard} from '../components';
import SearchBarWithIcon from '../components/SearchBarWithIcon';
import {wh, ww} from '../helpers';
import {addCategory} from '../helpers/addCategory';
import {getTopRatedMovies} from '../services';
import {COLORS, FONTS, STYLES} from '../styles';
import { Movie } from '../types';

type Props = {};

export const Home = (props: Props) => {
  const favorites = useMovieStore(state => state.favorites);
  const setLoading = useLoadingState(state => state.setLoading);
  const addFavorite = useMovieStore(state => state.addFavorite);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [movieList,setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    try {
      const movieList = await getTopRatedMovies(1);
      console.log("movieList",movieList);
      setMovieList(movieList);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={STYLES.mainContainer}>
      <View style={styles.headerSection}>
        <View>
          <Text style={{...styles.titleText, color: COLORS.grey}}>
            Welcome User 👋
          </Text>
          <Text style={styles.titleText}>
            Here is some movie advices for you.
          </Text>
        </View>
        <View style={styles.circleAvatarContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3940/3940403.png',
            }}
            style={styles.circleAvatar}
          />
        </View>
      </View>
      <View style={styles.categorySection}>
        <CategorySlider
          onPressCategory={(selected: string) => setSelectedCategory(addCategory(selected,selectedCategory))}
          selected={selectedCategory}
          genres={'Horror|Action|Drama|Comedy|Science Fiction'}
        />
      </View>
      <View style={styles.bodySection}>
            <RecommendMovieCard item={movieList}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    flex: 2,
    marginTop: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
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
    paddingHorizontal:10
  },
  titleText: {
    color: COLORS.white,
    fontSize: ww(0.032),
    marginVertical: 2,
    fontFamily: FONTS.medium,
  },
  circleAvatar: {
    height: wh(0.065),
    width: wh(0.065),
    borderRadius: 50,
  },
  circleAvatarContainer: {
    position: 'absolute',
    borderRadius: 50,
    height: wh(0.065),
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    width: wh(0.065),
    right: 10,
    top: 15,
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
});
