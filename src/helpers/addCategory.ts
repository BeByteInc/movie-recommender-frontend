export const addCategory = (selected:string,array:string[]) => {
   const index = array.findIndex((item) => {
        return item === selected;
    })

    if (index === -1) {
        return [...array,selected];
    } 
    else if (array.length > 1) {
        array.splice(index,1);
        return [...array];
    } else {
        return [];
    }
}