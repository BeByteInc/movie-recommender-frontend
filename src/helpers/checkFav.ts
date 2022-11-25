import { View, Text } from 'react-native'
import React from 'react'
import { Movie } from '../types';
import { useMovieStore } from '../../store';

type Props = {
    id: number,
    arr: Movie[]
}


export function checkFav(id: number,arr:Movie[]) {

    if (arr.some(movie => movie.id === id)) {
        return true
    } else {
        return false;
    }
}

export default checkFav