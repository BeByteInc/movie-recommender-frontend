import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useLoadingState, useMovieStore } from '../../store'
import { getTopRatedMovies } from '../services'
import { STYLES } from '../styles'

type Props = {}

export const Home = (props: Props) => {
  const favorites = useMovieStore((state => state.favorites))
  const setLoading = useLoadingState((state => state.setLoading))
  const addFavorite = useMovieStore((state => state.addFavorite))

  useEffect(() => {
    getMovieList()
  },[])

  const getMovieList = async () => {
    const movieList = await getTopRatedMovies(1);
    setLoading(false);
    console.log("movieList",movieList)
  }
  
  return (
    <View style={STYLES.mainContainer}>
      <Text>Home</Text>
      <Text>{favorites.length}</Text>
    </View>
  )
}