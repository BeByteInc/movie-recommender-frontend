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

export interface SvgIconProps {
  color?:string,
  width?:number,
  height?:number,
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

export interface RecommendMovieProps {
  item: Movie[];
}
export interface CardProps {
  item:Movie,
  index:number
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
  genres:string,
  selected?:string[],
  onPressCategory: (selectedCategory:string) => void;
}


  
