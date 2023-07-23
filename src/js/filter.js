import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';

const unsplashApi = new UnsplashAPI();
const _ = require('lodash');
const searchInputEl = document.querySelector('.search-input');
const searchIconEl = document.querySelector('.search-icon');
const filterFormEl = document.querySelector('.filter-form');
const recipesListEl = document.querySelector('.resipes-list');

function searchInputChangeHandler(e) {
    e.preventDefault();

    if (searchInputEl.value !== '') {
        searchInputEl.classList.add('search-input-active');
        searchIconEl.classList.add('search-icon-active');
        searchRecipes();
    } else {
        searchInputEl.classList.remove('search-input-active');
        searchIconEl.classList.remove('search-icon-active');
    }
};

const searchRecipes = async () => {
    try {
        const params = ;
        const { data } = await unsplashApi.fetchRecipes(params);
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

searchInputEl.addEventListener('input', _.debounce(searchInputChangeHandler, 300));
filterFormEl.addEventListener('submit', searchInputChangeHandler);