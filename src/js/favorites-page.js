import './scroll-to-top';
import axios from 'axios';
import Notiflix from 'notiflix';
import { UnsplashAPI } from './api';
// import {showLoader, hideLoader } from './loader';
// import { createRecipesCards } from './recipes-list'


const heroPicture = document.querySelector('.fav-hero-pic');
const categoryRecipeList = document.querySelector('.fav-category-recipe-list')
const favoriteRecipesList = document.querySelector('.fav-resipes-list');
const noFavoriteRecipesMessage = document.querySelector('.fav-no-recipes-content');
 

const localStorageKey = "favorites"

//----------------------------------------------------------------------------------------------
displayResizeHandler();

displayFavoriteResipes(localStorageKey); //favorites - це ім'я ключа на localStorage, куди додаватимуться позначені рецепти 

function displayFavoriteResipes(key) {
    if (localStorage.getItem(key) === "") {
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
            <svg class="favorite-heart-icon">
                <use href="/src/images/sprite.svg#icon-heart-checked"></use>
            </svg>                 
        <div class="recipe-card-gradient"></div>      
        <div class="fav-recipe-card">
            <img src="${recipe.preview}" alt="${recipe.description}" loading="lazy" />
            <p class="fav-recipe-card-title">${recipe.title}</p>
            <p class="fav-recipe-card-description">${recipe.description}</p>
            <button type="button" class="fav-recipe-card-button" name="${recipe._id}" data-modal-recipe-open>See recipe</button>
        </div>

        
        </li>`;
         
    
        //     const recipeCard = `<div class="recipe-card">
         
        //     <a class="recipe-card-link" href="#">
        //         <img class ="recipe-card-img" src="${recipes.preview}" alt="${recipes.description}" loading="lazy" />
            
        //     <div class="info">
        //         <h2 class="fav-recipe-title">${recipes.title}</h2>
        //         <p class="fav-recipe-descr">${recipes.description}</p>  
        //         <p class="fav-recipe-rating">Rating: ${recipes.rating}</p>
                        
        //     </div>

        //     <button type="button" class="add-to-favorite-btn">
        //     <svg class="favorite-icon">
        //                 <use href="./images/sprite.svg#icon-heart-checked"></use>
        //             </svg>
        //     </button>
        //     </a>
        // </div>`;
        favoriteRecipesList.insertAdjacentHTML('beforeend', recipeCard);
    }
}

      


