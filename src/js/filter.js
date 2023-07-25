import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';
import { createRecipesCards, reloadRecipesList } from './recipes-list'

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
        reloadRecipesList()
    }
};

const searchRecipes = async () => {
    let endpoint = '/recipes';
    let currentPage = 1;
    let itemsPerPage = 6;
    let searchQuerry = searchInputEl.value.trim();
    let requestParams = `${endpoint}?page=${currentPage}&limit=${itemsPerPage}&title=${searchQuerry}`;
    try {
        const { data } = await unsplashApi.fetchRecipes(requestParams);
      createRecipesCards(data);
      console.log(data)
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
}

searchInputEl.addEventListener('input', _.debounce(searchInputChangeHandler, 300));
filterFormEl.addEventListener('submit', searchInputChangeHandler);