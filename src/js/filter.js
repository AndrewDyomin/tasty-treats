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
const resetBtn = document.querySelector('.rst-btn');

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
    try {
        const { data } = await unsplashApi.fetchRecipes();
        createRecipesCards(data);
        console.log(data)
    
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
};

function clearFilters() {
    searchInputEl.value = null;
    timeSelectorEl.value = '10';
    areaSelectorEl.value = 'french';
    ingredientSelectorEl.value = 'cabbage';
    unsplashApi.searchQuerry = null;
    unsplashApi.queryTime = null;
    unsplashApi.queryArea = null;
    unsplashApi.queryIngredient = null;
    reloadRecipesList();
}

searchInputEl.addEventListener('input', _.debounce(searchInputChangeHandler, 300));
filterFormEl.addEventListener('submit', searchInputChangeHandler);
timeSelectorEl.addEventListener('change', () => {
    unsplashApi.queryTime = timeSelectorEl.value
    searchRecipes();
});
areaSelectorEl.addEventListener('change', () => {
    unsplashApi.queryArea = areaSelectorEl.value
    searchRecipes();
});
ingredientSelectorEl.addEventListener('change', () => {
    unsplashApi.queryIngredient = ingredientSelectorEl.value
    searchRecipes();
});
resetBtn.addEventListener('click', clearFilters);


