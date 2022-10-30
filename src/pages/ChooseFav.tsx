import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../styles'
import ProgressHeader from '../components/ProgressHeader'
import SearchBarWithIcon from '../components/SearchBarWithIcon'
import { FlatList } from 'react-native-gesture-handler'
import { Movie } from '../types'
import { getTopRatedMovies } from '../services'

type Props = {}

export const ChooseFav = (props: Props) => {
    const navigation = useNavigation();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [searchedMovieList, setSearchedMovieList] = useState<Movie[]>([]);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState(1);
    const [selectedFav, setSelectedFav] = useState<number>(5);

    useEffect(() => {
        getMovieList()
    }, [])

    const getMovieList = async () => {
        try {
            let list = await getTopRatedMovies(page)
            setMovieList(list?.data)
        }
        catch (e) {
            console.log("error", e)
        }

    }

    const renderMovieList = (({ item, index }: any) => {
        console.log("item", item);
        return (
            <View>

            </View>
        )
    })
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.main }}>
            <ProgressHeader selectedFav={selectedFav} />
            <SearchBarWithIcon onChange={(text) => {
                console.log("onchange", text)
            }} />

            <FlatList
                data={movieList}
                renderItem={renderMovieList}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}
