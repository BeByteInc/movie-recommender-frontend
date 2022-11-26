import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, STYLES} from '../styles';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {getMovieById} from '../services';
import {Loader} from '../components';
import {Movie} from '../types';
import {DETAIL_POSTER_URL} from '../../resources';
import {Icon} from 'react-native-elements';
import {checkFav, genreArray, ww} from '../helpers';
import LikeButton from '../components/LikeButton';
import {useMovieStore} from '../../store';
import moment from 'moment';

type Props = {
  id: number;
  // @ts-ignore
  route?: RouteProp;
};

const MovieDetail = ({id, route}: Props) => {
  const navigation = useNavigation();
  const favorites = useMovieStore(state => state.favorites);
  const removeFavorite = useMovieStore(state => state.removeFavorite);
  const addFavorite = useMovieStore(state => state.addFavorite);
  const [movieData, setMovieData] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);
  const isLiked = checkFav(movieData?.id!!, favorites);

  const onFavPress = () => {
    if (isLiked) {
      removeFavorite(movieData?.id!!);
    } else {
      addFavorite(movieData!!);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await getMovieById(route.params.id);
      setMovieData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={STYLES.mainContainer}>
      <ScrollView>
        <Loader loading={loading} />
        <View style={{height: ww(1), width: ww(1)}}>
          <ImageBackground
            blurRadius={0.7}
            style={{flex: 1, position: 'relative'}}
            source={{
              uri: DETAIL_POSTER_URL + movieData?.poster_path,
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#18181a',
                alignItems: 'center',
                justifyContent: 'center',
                top: 30,
                left: 15,
                width: ww(0.13),
                height: ww(0.13),
                backgroundColor: COLORS.grayBg,
                borderRadius: 50,
              }}
              onPress={() => navigation.goBack()}>
              <Icon
                name={'chevron-left'}
                size={30}
                color={COLORS.white}
                tvParallaxProperties={undefined}
              />
            </TouchableOpacity>

            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                bottom: 10,
                left: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  padding: 5,
                  backgroundColor: COLORS.secondary,
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    letterSpacing: 1.5,
                    color: COLORS.grayBg,
                  }}>
                  HD
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  letterSpacing: 0.2,
                  marginLeft: 5,
                  color: COLORS.white,
                }}>
                {' '}
                4K
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                right: 10,
                bottom: 10,
                padding: 5,
              }}>
              {genreArray(movieData?.genre_names || '').map(
                (genre: any, index: number) => (
                  <>
                    {index <= 2 ? (
                      <View
                        key={genre}
                        style={{
                          backgroundColor: COLORS.secondary,
                          padding: 7,
                          paddingHorizontal: 7,
                          marginHorizontal: 2,
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: COLORS.white,
                            letterSpacing: 0.5,
                            fontFamily: FONTS.bold,
                            fontSize: ww(0.027),
                          }}>
                          {genre}
                        </Text>
                      </View>
                    ) : (
                      <></>
                    )}
                  </>
                ),
              )}
            </View>
          </ImageBackground>
        </View>
        <View style={{flex: 1, padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: COLORS.secondary,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: ww(0.035),
                    color: COLORS.grayBg,
                    fontFamily: FONTS.bold,
                  }}>
                  IMDB {movieData?.vote_average?.toFixed(1)}/
                </Text>
                <Text style={{fontFamily: FONTS.semiBold, color: 'grey'}}>
                  10
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: ww(0.035),
                  marginLeft: 5,
                  color: 'grey',
                  textAlign: 'center',
                }}>
                {movieData?.vote_count}
              </Text>
            </View>
            <LikeButton isLiked={isLiked} onChecked={onFavPress} />
          </View>
          <View style={{marginTop: 20}}>
            <Text style={STYLES.title}>{movieData?.title}</Text>
            <Text style={STYLES.contentText}>
              {moment(movieData?.release_date).format('YYYY')} •{' '}
              {movieData?.genre_names?.replaceAll('|', ' - ')}
            </Text>
            {movieData?.title !== movieData?.original_title && (
              <Text style={{...STYLES.contentText}}>
                Original Title: {movieData?.original_title}
              </Text>
            )}
            <View style={{flexDirection: 'row'}}>
              <Text style={{...STYLES.contentText}}>Original Language: </Text>
              <Text style={{...STYLES.contentText, textTransform: 'uppercase'}}>
                {movieData?.original_language}
              </Text>
            </View>
            <Text style={{...STYLES.contentText}}>
              Overview: {movieData?.overview}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MovieDetail;
