import axios from "axios"
import { API_URL } from "../../resources"
import { SetFavoriteServiceType, UserData } from "../types"

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';


const register = async (data:UserData) => {
  try {
    let result = await axios.post("/register",data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
const login = async (data:UserData) => {
  try {
    let result = await axios.post("/login",data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
const getMovieById = async (id:number) => {
  try {
    let result = await axios.get("/get_movie_by_id?id="+id)
    return result.data.item_list;
  } catch (error) {
    console.log(error)
  }
}

const getRecommended = async (id?:number) => {
  try {
    let result = await axios.get("/recommend?user_id="+id);
    return result;
  } catch (error) {
    console.log(error)
  }
}

const setUserFavorites = async (data:SetFavoriteServiceType) => {
  try {
    let result = await axios.post("/set_user_favorites",data)
    return result.status;
  } catch (error) {
    console.log(error)
  }
}

const getTopRatedMovies = async (page:number) => {
  try {
    let result = await axios.get("/get_top_rated_movies?page="+page)
    return result.data.item_list.movie_list;
  } catch (error) {
    console.log(axios)
    return [];
  }
}

const getTopRatedMoviesByGenre = async (page:number,genreName:string) => {
  try {
    let result = await axios.get("/get_top_rated_movies_by_genre_name?page="+page+"&genre_name="+genreName)
    return result.data.item_list.movie_list;
  } catch (error) {
    console.log(error)
  }
}

const searchAll = async (input:string) => {
  try {
    let result = await axios.get("/search_by_title_all_data?search_key="+input)
    return result.data.item_list.movie_list;
  } catch (error) {
    console.log(error)
    return [];
  }
}

const searchWithGenre = async (input:string,genre:string) => {
  try {
    let result = axios.get("/search_by_title_with_genre?search_key="+input+"&genre="+genre)
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
  searchAll,
  setUserFavorites,
  register,
  login,
  getRecommended
}