import { UnsplashAPI } from "./api";


let screenWidth = window.screen.width;

export default function loadNumberRecipe() {
    if (screenWidth <= 767) {
        return sixRecipe = new UnsplashAPI({
            itemsPerPage: 6,
        })
    } else if (screenWidth >= 768 && screenWidth <= 1139) {
        return heightRecipe = new UnsplashAPI({
            itemsPerPage: 8,
        })
    } else if (screenWidth >= 1140) {
        return nineRecipe = new UnsplashAPI({
            itemsPerPage: 9,
        })
    }
};
