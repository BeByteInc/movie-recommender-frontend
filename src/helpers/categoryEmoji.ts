export const categoryEmoji = (category:string) => {
    return category === "Drama" ? "π­" : category === "Crime" ? "β οΈ" : category === "Action" ? "π₯" : category === "Thriller" ? "π±" 
    : category === "Science Fiction" ? "π¦Έπ»ββοΈ" : category === "Recommend" ? "β" : category === "Adventure" ? "πββοΈ" 
    : category === "Comedy" ? "π€£" : category === "Romance" ? "π" : category === "Fantasy" ? "β¨" : category === "Mystery" ? "π" 
    : category === "History" ? "π" : category === "War" ? "βοΈ" :  category === "Western" ? "π€ " : category === "Animation" ? "πΎ"
    : category === "Family" ? "πͺ" : category === "Music" ? "π΅" : category === "Horror" ? "π" : category === "Documentary" ? "ποΈ"
    : "πΊ"
}