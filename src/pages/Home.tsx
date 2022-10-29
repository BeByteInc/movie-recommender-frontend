import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { useMovieStore } from '../../store'
import { getTopRatedMovies } from '../services'

type Props = {}

export const Home = (props: Props) => {
  const favorites = useMovieStore((state => state.favorites))
  const addFavorite = useMovieStore((state => state.addFavorite))

  useEffect(() => {
    getMovieList()
  },[])

  const getMovieList = async () => {
    const movieList = await getTopRatedMovies(1);
    console.log("movieList",movieList)
  }
  
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity style={{backgroundColor:"red"}} onPress={() => {
        console.log("basmadan önce favorites",favorites);
        addFavorite({
          "id": 0,
          "original_title": "string",
          "title": "string",
          "overview": "string",
          "genre_names": "string",
          "release_date": new Date("2022-10-29T15:23:29.893Z"),
          "original_language": "string",
          "poster_path": "string",
          "backdrop_path": "string",
          "vote_average": 0,
          "vote_count": 0
        })
      }}>
        <Text>Press</Text>
      </TouchableOpacity>
      <Text>{favorites.length}</Text>
    </View>
  )
}