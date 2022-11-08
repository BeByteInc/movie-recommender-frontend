export const categoryEmoji = (category:string) => {
    return category === "Drama" ? "🎭" : category === "Crime" ? "☠️" : category === "Action" ? "💥" : category === "Thriller" ? "😱" 
    : category === "Science Fiction" ? "🦸🏻‍♂️" : category === "Recommend" ? "✅" : category === "Adventure" ? "🏃‍♂️" 
    : category === "Comedy" ? "🤣" : category === "Romance" ? "💘" : category === "Fantasy" ? "✨" : category === "Mystery" ? "🔍" 
    : category === "History" ? "📜" : category === "War" ? "⚔️" :  category === "Western" ? "🤠" : category === "Animation" ? "👾"
    : category === "Family" ? "👪" : category === "Music" ? "🎵" : category === "Horror" ? "💀" : category === "Documentary" ? "🎞️"
    : "📺"
}