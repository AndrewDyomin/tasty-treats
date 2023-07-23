import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';

const unsplashApi = new UnsplashAPI();
const recipesListEl = document.querySelector('.resipes-list');


async function createRecipesCards () {
    try {
        const { data } = await unsplashApi.fetchRecipes();
      console.log(data);
        for (const recipe of data.results) {
            const markup = 
            `<li class="recipes-list-item">
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