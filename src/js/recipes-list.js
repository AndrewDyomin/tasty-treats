import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';

const unsplashApi = new UnsplashAPI();
let itemsPerPage = null;
let currentPage = null;
const recipesListEl = document.querySelector('.resipes-list');


export default async function createRecipesCards () {
    try {
        const { data } = await unsplashApi.fetchRecipes();
      console.log(data);
      itemsPerPage = data.page;
      currentPage = data.perPage;
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
                <button type="button" class="recipe-card-button">See recipe</button>
              </div>
            </li>`;
            recipesListEl.insertAdjacentHTML("beforeend", markup);
          }
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
}

createRecipesCards()

const refs = {
  pageNext: document.querySelector('.next-page'),
  pagePrev: document.querySelector('.preview-page'),
};
refs.pageNext.addEventListener('click', nextPage);
function nextPage() {
  itemsPerPage++;
  
}