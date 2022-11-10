import { Movie } from "../types";
import { genreArray } from "./genreArray";

type Props = {
    list:Movie[],
    genres:string[]
}
export const filterMovieList = (list:Movie[],selectedGenres:string[]) => {
    const newObject:Props = {
        list:[],
        genres:[]
    }

    const newMovieList = list.filter(function (el)
    {
        let true_map:any = true;
        for (let index = 0; index < selectedGenres.length; index++) {
            const element = selectedGenres[index];
            true_map = true_map && el.genre_names?.includes(element) 
        }
        return true_map
    });

    newObject.list = newMovieList;

    let dict:any = {}
    for (let index = 0; index < newMovieList.length; index++) {
        const genre_names = newMovieList[index].genre_names;
        if (genre_names !== undefined) {
            const array = genreArray(genre_names)
            for (let index2 = 0; index2 < array.length; index2++) {
                const element = array[index2];
                dict[element] = 0
            }
        }
    }

    newObject.genres = Object.keys(dict)

    return newObject;
}