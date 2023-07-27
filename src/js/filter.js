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
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
};

function clearFilters() {
    searchInputEl.value = null;
    unsplashApi.searchQuerry = null;
    unsplashApi.queryTime = null;
    unsplashApi.queryArea = null;
    unsplashApi.queryIngredient = null;
    reloadRecipesList();
}

function createRecipesTimeOptions () {
    try {
        for (let time = 5; time <= 120; time += 5) {
            const markup = `<option value="${time}">${time} min</option>`;
            timeSelectorEl.insertAdjacentHTML("beforeend", markup);
          }
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
}

createRecipesTimeOptions ();

function createRecipesIngredientOptions (data) {
    try {
        for (const option of data) {
            const markup = `<option value="${option._id}">${option.name}</option>`;
            ingredientSelectorEl.insertAdjacentHTML("beforeend", markup);
          }
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
}

async function fetchRecipesIngredientOptions () {
    unsplashApi.endpoint = '/ingredients';
    let { data } = await unsplashApi.fetchRecipes();
    createRecipesIngredientOptions(data);
};

fetchRecipesIngredientOptions();

function createRecipesAreaOptions (data) {
    try {
        for (const option of data) {
            const markup = `<option value="${option.name}">${option.name}</option>`;
            areaSelectorEl.insertAdjacentHTML("beforeend", markup);
          }
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
}

async function fetchRecipesAreaOptions () {
    unsplashApi.endpoint = '/areas';
    let { data } = await unsplashApi.fetchRecipes();
    createRecipesAreaOptions(data);
};

fetchRecipesAreaOptions();

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


