import { UnsplashAPI } from "./api";
import Notiflix from "notiflix";
import svg from "../images/sprite.svg"

const unsplashApi = new UnsplashAPI;
const dataFromLocalStorage = localStorage.getItem("listOfFavoriteRecipe")
const listOfFavItems = JSON.parse(dataFromLocalStorage);
const favList = document.querySelector('.fav-resipes-list');

function download() {
    for (let item in listOfFavItems) {
        reloadRecipesList(item);
    };
};
download();

async function reloadRecipesList (item) {
    unsplashApi.endpoint = `/recipes/${item}`;
    const { data } = await unsplashApi.fetchRecipes();
    console.log(data);
    createRecipesCards(data);
};

function createRecipesCards (data) {
    try {
            const markup = 
            `<li class="recipes-list-item">        
                <svg class="favorite-icon">
                  <use id="iconUse" href="${svg}#icon-heart"></use>
                </svg>
              <div class="recipe-card">
                <img src="${data.preview}" alt="${data.description}" loading="lazy" />
                <p class="recipe-card-title">${data.title}</p>
                <p class="recipe-card-description">${data.description}</p>
                <button type="button" class="recipe-card-button" name="${data._id}" data-modal-recipte-open>See recipe</button>
              </div>
            </li>`;
            favList.insertAdjacentHTML("beforeend", markup);
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
}