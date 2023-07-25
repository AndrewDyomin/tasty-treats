import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';
import { createRecipesCards, reloadRecipesList } from './recipes-list'

const unsplashApi = new UnsplashAPI();
const _ = require('lodash');
const searchInputEl = document.querySelector('.search-input');
const timeSelectorEl = document.querySelector('#time');
const areaSelectorEl = document.querySelector('#area');
const ingredientSelectorEl = document.querySelector('#ingredients')
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
        reloadRecipesList()
    }
};

const searchRecipes = async () => {
    unsplashApi.endpoint = '/recipes';
    unsplashApi.searchQuerry = searchInputEl.value.trim();
    unsplashApi.queryTime = timeSelectorEl.value;
    unsplashApi.queryArea = areaSelectorEl.value;
    unsplashApi.queryIngredient = ingredientSelectorEl.value;
    console.log(searchInputEl.value);
    console.log(timeSelectorEl.value);
    console.log(areaSelectorEl.value);
    console.log(ingredientSelectorEl.value);
    try {
        const { data } = await unsplashApi.fetchRecipes();
      createRecipesCards(data);
      console.log(data)
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
}

filterFormEl.addEventListener('change', _.debounce(searchInputChangeHandler, 300));
filterFormEl.addEventListener('submit', searchInputChangeHandler);