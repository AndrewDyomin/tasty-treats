import './scroll-to-top';
import svg from '../images/sprite.svg';
import axios from 'axios';
import Notiflix from 'notiflix';
import { UnsplashAPI } from './api';
// import {showLoader, hideLoader } from './loader';
// import { createRecipesCards } from './recipes-list'


const heroPicture = document.querySelector('.fav-hero-pic');
const categoryRecipeList = document.querySelector('.fav-category-recipe-list')
const favoriteRecipesList = document.querySelector('.fav-resipes-list');
const noFavoriteRecipesMessage = document.querySelector('.fav-no-recipes-content');
const categoryFilters = document.querySelector('.category-btn'); 

const localStorageKey = "favorites"

//----------------------------------------------------------------------------------------------


displayFavoriteResipes(localStorageKey); //favorites - це ім'я ключа на localStorage, куди додаватимуться позначені рецепти 
console.log(localStorage.getItem(localStorageKey));
function displayFavoriteResipes(key) {
    if (localStorage.getItem(key) === null) {
        
        noFavoriteRecipesMessage.classList.remove('is-hidden');
        
    }
    
    noFavoriteRecipesMessage.classList.add('is-hidden')
    
    createFavoriteRecipesCards(JSON.parse(localStorage.getItem(key)));
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


function createFavoriteRecipesCards(recipes) {
    console.log(recipes);
    if (recipes === null) {
        displayResizeHandler();
        categoryFilters.classList.add('is-hidden');
        noFavoriteRecipesMessage.classList.remove('is-hidden');
        return;
    }

    const recipeCategories = recipes.flatMap(recipe => recipe.category)
        .filter((category, index, array) => array.indexOf(category) === index);
    console.log(recipeCategories);
    
    

    for (const category of recipeCategories) {
        const categoryBtn = `<button type="button" class="category-btn">${category}</button>`;
        categoryRecipeList.insertAdjacentHTML('beforeend', categoryBtn);
    }

    favoriteRecipesList.innerHTML = '';

    for (const recipe of recipes) {
        const recipeCard = `<li class="fav-recipes-list-item">
                      
        <div class="recipe-card-gradient"></div>      
        <div class="fav-recipe-card">
         <span  class="add-to-favorite-checkbox" role="checkbox" aria-checked="true">  
        <svg class="favorite-icon">
                <use href="${svg}#icon-heart"></use>
              </svg> 
        </span> 
            <img src="${recipe.preview}" alt="${recipe.description}" loading="lazy" />
            <p class="fav-recipe-card-title">${recipe.title}</p>
            <p class="fav-recipe-card-description">${recipe.description}</p>
            <button type="button" class="fav-recipe-card-button" name="${recipe._id}" data-modal-recipe-open>See recipe</button>
        </div>      
        </li>`;
        favoriteRecipesList.insertAdjacentHTML('beforeend', recipeCard);
    }
}
    




