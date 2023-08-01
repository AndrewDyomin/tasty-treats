import { createRecipesCards, reloadRecipesList } from './recipes-list';
import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';
import { forEach } from 'lodash';

const unsplashApi = new UnsplashAPI();
const categoriesContainerEl = document.getElementById('categories');
const allCatBtnEl = document.querySelector('.categorBt');

function createCategoriesList (data) {
  try {
    categoriesContainerEl.innerHTML = '';
    const categoryList = document.createElement('ul');
      for (const category of data) {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = category.name;
        button.classList.add('category-button');
        listItem.appendChild(button);
        categoryList.appendChild(listItem);

        button.addEventListener('click', async () => { 
          button.classList.toggle('active');

        if (button.classList.contains('active')) {
          unsplashApi.endpoint = `/recipes?category=${button.textContent}`;
          const { data } = await unsplashApi.fetchRecipes();
          createRecipesCards(data);
        } else {
          unsplashApi.endpoint = `/recipes`;
          const { data } = await unsplashApi.fetchRecipes();
          createRecipesCards(data);
        }
      });

      categoriesContainerEl.appendChild(categoryList);
      }
  } catch (err) {
      Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
  }
}

async function fetchCategoriesList () {
  unsplashApi.endpoint = '/categories';
  const { data } = await unsplashApi.fetchRecipes();
  createCategoriesList(data);
}

fetchCategoriesList();

function allCatBtnClickHandler () {
  reloadRecipesList();
};

allCatBtnEl.addEventListener('click', allCatBtnClickHandler);
