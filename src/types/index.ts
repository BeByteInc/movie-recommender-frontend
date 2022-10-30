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
  }