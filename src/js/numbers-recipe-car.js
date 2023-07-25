import { createRecipesCards, reloadRecipesList } from './recipes-list'

let screenWidth = window.screen.width
console.log(screenWidth);
function loadNumberRecipe() {
    if (screenWidth <= 767) {
        reloadRecipesList(6);
    } else if (screenWidth >= 768 && screenWidth <= 1139) {
        reloadRecipesList(8);
    } else if (screenWidth >= 1140) {
        reloadRecipesList(9);
    }
};
loadNumberRecipe();