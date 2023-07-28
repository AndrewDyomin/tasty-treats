import { UnsplashAPI } from "./api";
import Notiflix from "notiflix";
import svg from "../images/sprite.svg"

const unsplashApi = new UnsplashAPI;
const dataFromLocalStorage = localStorage.getItem("listOfFavoriteRecipe")
const listOfFavItems = JSON.parse(dataFromLocalStorage);
const favList = document.querySelector('.fav-resipes-list');
const noFavoriteRecipesMessage = document.querySelector('.fav-no-recipes-content');
const heroPicture = document.querySelector('.fav-hero-pic');

function download() {
  if (listOfFavItems === null) {
    displayResizeHandler();
    noFavoriteRecipesMessage.classList.remove('is-hidden');  
    return;
}
  noFavoriteRecipesMessage.classList.add('is-hidden');
  
    for (let item in listOfFavItems) {
        reloadRecipesList(item);
    };
};
download();

async function reloadRecipesList (item) {
    unsplashApi.endpoint = `/recipes/${item}`;
  const { data } = await unsplashApi.fetchRecipes();
  
    createRecipesCards(data);
};

function createRecipesCards (data) {
    try {
            const markup = 
            `<li class="fav-recipes-list-item"">
            <div class="recipe-card-gradient"></div>
                <svg class="favorite-icon">
                  <use id="iconUse" href="${svg}#icon-heart"></use>
                </svg>
              <div class="fav-recipe-card">
                <img src="${data.preview}" alt="${data.description}" loading="lazy" />
                <p class="fav-recipe-card-title">${data.title}</p>
                <p class="fav-recipe-card-description">${data.description}</p>
                <button type="button" class="fav-recipe-card-button" name="${data._id}" data-modal-recipte-open>See recipe</button>
              </div>
            </li>`;
            favList.insertAdjacentHTML("beforeend", markup);
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
}

function displayResizeHandler() {
    if (window.innerWidth < 768) {
        heroPicture.style.display = "none";
    }
    else heroPicture.style.display = "";

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {            
            heroPicture.style.display = "none";
        }
        else heroPicture.style.display = "";
    })
}