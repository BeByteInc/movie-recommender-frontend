import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS, FONTS, STYLES } from '../styles'
import ProgressHeader from '../components/ProgressHeader'
import SearchBarWithIcon from '../components/SearchBarWithIcon'
import { FlatList } from 'react-native-gesture-handler'
import { Movie } from '../types'
import { getTopRatedMovies } from '../services'
import { ww } from '../helpers'
import { Text } from 'react-native-elements'

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
    }, [page])

    const getMovieList = async () => {
        let list = await getTopRatedMovies(page)
        console.log("list",list);
        setMovieList(list?.data?.movie_list)

    }

    const renderMovieList = (({ item, index }: any) => {
        console.log("item", item);
        return (
            <View style={{width:ww(.9),alignSelf:"center",backgroundColor:COLORS.grayBg,margin:8}}>

            </View>
        )
    })
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.main }}>
            <ProgressHeader selectedFav={selectedFav} />

            <Text style={STYLES.text}>
                Choose at least 5 favorite movies 🎉
            </Text>
            <SearchBarWithIcon onChange={(text) => {
                console.log("onchange", text)
            }} />

            <View style={{height:.8,width:ww(.95),backgroundColor:COLORS.secondary, marginVertical:10,alignSelf:"center",borderRadius:12}}/>

            <FlatList
                data={movieList}
                contentContainerStyle={{marginTop:15}}
                renderItem={renderMovieList}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}
