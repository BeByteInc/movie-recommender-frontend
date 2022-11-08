export const addCategory = (selected:string,array:string[]) => {
   const index = array.findIndex((item) => {
        return item === selected;
    })

    const recommendIndex = array.findIndex((item) => {
        return item === "Recommend";
    })

    if (selected === "Recommend") {
        return ["Recommend"];
    }
    else if (recommendIndex !== -1 && index === -1) {
        array.splice(recommendIndex,1);
        return [...array,selected];
    }
    else if (index === -1) {
        return [...array,selected];
    } 
    else if (array.length > 1) {
        array.splice(index,1);
        return [...array];
    } 
    else {
        return array;
    }
}