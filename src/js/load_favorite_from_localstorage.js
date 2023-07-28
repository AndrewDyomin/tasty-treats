import { UnsplashAPI } from "./api";
import Notiflix from "notiflix";

import './theme-switcher';
import './mob-menu';
import svg from "../images/sprite.svg"
import {heardleRecipeById} from './modal-recipe'

const unsplashApi = new UnsplashAPI;
const dataFromLocalStorage = localStorage.getItem("listOfFavoriteRecipe")
const listOfFavItems = JSON.parse(dataFromLocalStorage);
const favList = document.querySelector('.fav-resipes-list');
const newDataStorage = {};
const LOCALSTORAGE_KEY = "listOfFavoriteRecipe";
const noFavoriteRecipesMessage = document.querySelector('.fav-no-recipes-content');
const heroPicture = document.querySelector('.fav-hero-pic');

//Open Modal
favList.addEventListener('click', openModalBtn);

function openModalBtn(e) {
  const btnRecipesBtn = 'fav-recipe-card-button';
  const id = e.target.name;
  if (e.target.className === btnRecipesBtn) {
    heardleRecipeById(id);
  }
}

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
            `<li class="fav-recipes-list-item" id="${data._id}">
            <div class="recipe-card-gradient"></div>
                <svg class="favorite-icon" >
                  <use id="iconUse" fill="#f8f8f8"; href="${svg}#icon-heart"></use>
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

favList.addEventListener('click', removeFavRecipe);

function removeFavRecipe(e) {
  const iconBtn = e.target;
  if (iconBtn.id !== 'iconUse') {
        return;
    }
  const recipeId = e.target.closest("li").id;
  for (let item in listOfFavItems) {
    if (item !== recipeId) {
      newDataStorage[item] = item;
    }
  }
  iconBtn.style.fill = "none";
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newDataStorage));
  location.reload();
  
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