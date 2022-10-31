export const genreArray = (genre_names: string) => {
    var splitted = genre_names.split("|", 3);
    return splitted;
}