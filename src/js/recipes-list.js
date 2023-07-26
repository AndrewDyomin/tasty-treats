import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';
import throttle from 'lodash.throttle'

const unsplashApi = new UnsplashAPI();
const recipesListEl = document.querySelector('.resipes-list');


function createRecipesCards (data) {
    try {
        recipesListEl.innerHTML = '';
        for (const recipe of data.results) {
            const markup = 
            `<li class="recipes-list-item">
              <svg class="favorite-icon">
                <use href="/src/images/sprite.svg#icon-heart"></use>
              </svg>
              <div class="recipe-card">
                <img src="${recipe.preview}" alt="${recipe.description}" loading="lazy" />
                <p class="recipe-card-title">${recipe.title}</p>
                <p class="recipe-card-description">${recipe.description}</p>
                <button type="button" class="recipe-card-button data-modal-recipte-open">See recipe</button>
              </div>
            </li>`;
            recipesListEl.insertAdjacentHTML("beforeend", markup);
          }
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
}

async function reloadRecipesList () {
  unsplashApi.endpoint = '/recipes';
  const { data } = await unsplashApi.fetchRecipes();
  console.log(data)
  createRecipesCards(data);
}

reloadRecipesList();

window.addEventListener('resize', throttle(changeNumberRecipe, 300));

function changeNumberRecipe () {
    let currentWidth = window.innerWidth;
    if (currentWidth <= 767) {
        unsplashApi.itemsPerPage = 6;
        reloadRecipesList();
    } else if (currentWidth >= 768 && currentWidth < 1140) {
        unsplashApi.itemsPerPage = 8;
        reloadRecipesList();
    } else {
        unsplashApi.itemsPerPage = 9;
        reloadRecipesList();
    }
}

window.addEventListener('resize', function () {
    let currentWidth = window.innerWidth;
    if (currentWidth <= 767) {
        unsplashApi.itemsPerPage = 6;
        reloadRecipesList();
    } else if (currentWidth >= 768 && currentWidth < 1140) {
        unsplashApi.itemsPerPage = 8;
        reloadRecipesList();
    } else {
        unsplashApi.itemsPerPage = 9;
        reloadRecipesList();
    }
});


const refs = {
  pageNext: document.querySelector('.next-page'),
  pagePrev: document.querySelector('.preview-page'),
};
refs.pageNext.addEventListener('click', nextPage);
function nextPage() {
  unsplashApi.currentPage ++;
  reloadRecipesList();
}

refs.pagePrev.addEventListener('click', prevPage);
function prevPage() {
  unsplashApi.currentPage --;
  reloadRecipesList();
}

export { createRecipesCards, reloadRecipesList };