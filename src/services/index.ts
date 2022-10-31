import axios from "axios"
import { API_URL } from "../../resources"


const getMovieById = async (id:number) => {
  try {
    let result = axios.get(API_URL+"/get_movie_by_id?id="+id)
    return result;
  } catch (error) {
    console.log(error)
  }
}

const getTopRatedMovies = async (page:number) => {
  try {
    let result = await axios.get(API_URL+"/get_top_rated_movies?page="+page)
    return result.data.movie_list;
  } catch (error) {
    return [];
  }
}

const getTopRatedMoviesByGenre = async (page:number,genreName:string) => {
  try {
    let result = axios.get(API_URL+"/get_top_rated_movies_by_genre_name?page="+page+"&genre_name="+genreName)
    return result;
  } catch (error) {
    console.log(error)
  }
}

const searchAll = async (input:string) => {
  try {
    let result = await axios.get(API_URL+"/search_by_title_all_data?key="+input)
    return result.data.movie_list;
  } catch (error) {
    return [];
  }
}

const searchWithGenre = async (input:string,genre:string) => {
  try {
    let result = axios.get(API_URL+"/search_by_title_with_genre?key="+input+"&genre="+genre)
    return result;
  } catch (error) {
    console.log(error)
  }
}


export {
  getMovieById,
  getTopRatedMovies,
  getTopRatedMoviesByGenre,
  searchWithGenre,
  searchAll
}