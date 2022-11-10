import { Movie } from "../types";

export const getFavoriteIds = (list:Movie[]) => {
    const newList:number[] = [];

    list.forEach((item) => {
        newList.push(item.id);
    })

    return newList;
}