import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';

const unsplashApi = new UnsplashAPI();
let itemsPerPage = 6;
let currentPage = 1;
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

async function reloadRecipesList (itemsPerPage) {
  let requestParams = `/recipes?page=${currentPage}&limit=${itemsPerPage}`;
  const { data } = await unsplashApi.fetchRecipes(requestParams);
  console.log(data)
  createRecipesCards(data);
}

// reloadRecipesList();

const refs = {
  pageNext: document.querySelector('.next-page'),
  pagePrev: document.querySelector('.preview-page'),
};
refs.pageNext.addEventListener('click', nextPage);
function nextPage() {
  currentPage+=1;
  reloadRecipesList();
}

export { createRecipesCards, reloadRecipesList };