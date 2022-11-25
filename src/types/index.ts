export interface Movie {
  id: number,
  original_title?: string,
  title: string,
  overview?: string,
  genre_names?: string,
  release_date?: Date,
  original_language?: string,
  poster_path?: string,
  backdrop_path?: string,
  vote_average?: number,
  vote_count?: number
}

export interface FavoriteState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  getFavorites: () => void;
  removeFavorite: (id: number) => void;
  addFavList: (movie: Movie[]) => void
}

export interface UserState {
  user: UserType;
  updateUser: (user: UserType) => void;
  getUser: () => void;
}

export interface SvgIconProps {
  color?:string,
  width?:number,
  height?:number,
}

export interface SetFavoriteServiceType {
  user_id:number,
  movie_ids:number[]
}

export interface LoginProps {
  onPressRegister: () => void;
  onPressLogin: (data:UserData) => void;
}

export interface RegisterProps {
  onPressRegister: (data:UserData) => void;
  onPressLogin: () => void;
}

export interface LoadingState {
  loading: boolean;
  setLoading: (state:boolean) => void;
}

export interface FilterProps {
  page: number;
  search: string;
  genre: string;
}

export interface RootStackParams {
  Home: undefined;
  Profile: undefined;
  Login:undefined;
  ChooseFav:undefined;
  Explore: undefined;
  FavoriteScreen: undefined;
  MovieDetail: { id:number } | undefined;
};

export interface RecommendMovieProps {
  item: Movie[];
  width: number;
}
export interface CardProps {
  item:Movie;
  index:number;
  width:number;
 }

export interface UserType {
  username:string;
  user_id:number;
  user_favorites:Movie[];
}

export interface TokenState {
  token: any;
  getToken: () => void;
  setToken: (token:string) => void;
}

export interface UserData {
  username?: string;
  email?:string;
  password?: string;
}

export interface CategorySliderProps {
  genres:string[],
  selected?:string[],
  onPressCategory: (selectedCategory:string) => void;
}


  
