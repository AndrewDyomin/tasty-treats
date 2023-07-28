import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';
import throttle from 'lodash.throttle'
import svg from '../images/sprite.svg';
import { heardleRecipeById } from './modal-recipe';

const unsplashApi = new UnsplashAPI();
const recipesListEl = document.querySelector('.resipes-list');

//Open Modal
recipesListEl.addEventListener('click', openModalBtn);

function openModalBtn(e) {
  const btnRecipesList = 'recipe-card-button';
  const id = e.target.name;
  if (e.target.className === btnRecipesList) {
    heardleRecipeById(id);
  }
}


//константы
let NUMB_PAGE_IN_MENU = 3;

function createRecipesCards (data) {
    try {
        recipesListEl.innerHTML = '';
        for (const recipe of data.results) {
            const markup = 
            `<li class="recipes-list-item">        
                <svg class="favorite-icon" name="${recipe._id}">
                  <use id="iconUse" href="${svg}#icon-heart"></use>
                </svg>
              <div class="recipe-card">
                <img src="${recipe.preview}" alt="${recipe.description}" loading="lazy" />
                <p class="recipe-card-title">${recipe.title}</p>
                <p class="recipe-card-description">${recipe.description}</p>
                <button type="button" class="recipe-card-button" name="${recipe._id}" data-modal-recipte-open>See recipe</button>
              </div>
            </li>`;
            recipesListEl.insertAdjacentHTML("beforeend", markup);
          }
    } catch (err) {
        Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
    }
}

let currentTotalPages = null;

async function reloadRecipesList () {
  unsplashApi.endpoint = '/recipes';
  const { data } = await unsplashApi.fetchRecipes();
  currentTotalPages = data.totalPages;
  createRecipesCards(data);
  return data;
}

reloadRecipesList();

// Изменение отображения количества рецептов в зависимости от ширина вьюпорта
window.addEventListener('resize', throttle(changeNumberRecipe, 1000));

function changeNumberRecipe () {
    let currentWidth = window.innerWidth;
    if (currentWidth <= 767) {
        NUMB_PAGE_IN_MENU = 2;
        unsplashApi.itemsPerPage = 6;
        reloadRecipesList();
    } else if (currentWidth >= 768 && currentWidth < 1280) {
        unsplashApi.itemsPerPage = 8;
        reloadRecipesList();
        NUMB_PAGE_IN_MENU = 3;
    } else {
        unsplashApi.itemsPerPage = 9;
        reloadRecipesList();
        NUMB_PAGE_IN_MENU = 3;
    }
    
    updatePagesNumber(null);
}

const refs = {
  pageNext: document.querySelector('.next-page'),
  pagePrev: document.querySelector('.preview-page'),
};
refs.pageNext.addEventListener('click', nextPage);
async function nextPage() {
  if (unsplashApi.currentPage + 1 > currentTotalPages) {
    return false;
  }

  unsplashApi.currentPage ++;
  const data = await reloadRecipesList();

  updatePagesNumber(data);

  updateSelectedPageNumber();
}

refs.pagePrev.addEventListener('click', prevPage);
async function prevPage() {
  if (unsplashApi.currentPage - 1 < 1) {
    return false;
  }

  unsplashApi.currentPage --;
  const data = await reloadRecipesList();

  updatePagesNumber(data);

  updateSelectedPageNumber();
}

function updatePagesNumber(data) {
  const listLastPages = 
    Array.from({ length: currentTotalPages || data.totalPages }, 
      (k, v) => {
        if (v % NUMB_PAGE_IN_MENU === 0) {
          return v + NUMB_PAGE_IN_MENU;
        }
      }).filter(e => (e === 0 || e));

  const lastPage = listLastPages.filter(
    (n) => (unsplashApi.currentPage >= n - (NUMB_PAGE_IN_MENU - 1) && unsplashApi.currentPage <= n)
  );
  
  if (lastPage.length === 0) {
    return false;
  }
  
  createNumberPage(data, lastPage[0] - (NUMB_PAGE_IN_MENU - 1));
}

export { createRecipesCards, reloadRecipesList };


const pageNumber = document.querySelector('.page-numbers');

// Создание разметки кнопок
let lastPageCurrentPagination = null;

async function loadButtonList () {
  unsplashApi.endpoint = '/recipes';
  const { data } = await unsplashApi.fetchRecipes();
  createNumberPage(data);
  pageNumber.firstElementChild.classList.add('current-page');
}
loadButtonList();

pageNumber.addEventListener('click', changePage);
function changePage(e) {
  const currentContent = e.target.textContent;
  if (currentContent !== '...') {
    unsplashApi.currentPage = Number(currentContent);
    
    updateSelectedPageNumber()
    
    reloadRecipesList();
  } else {
    const elTarget = e.target;
    if (elTarget.classList.contains('listNumbPrev')) {
      loadPrevNuberPage();
    }
    else if (elTarget.classList.contains('listNumbNext')) {
      loadNextNumberPage();
    }
  }
};

function createNumberPage(data, startPage) {
  const currentPage = startPage || Number(data.page);
  lastPageCurrentPagination = currentPage + 2;

  pageNumber.innerHTML = '';

  let listMarkup = '';

  if (currentPage > NUMB_PAGE_IN_MENU) {
    listMarkup += `
      <button class="pageBtn listNumbPrev" type="button">...</button>
      `
  }
  for (let i = currentPage; i <= currentPage + NUMB_PAGE_IN_MENU - 1; i++) {
    listMarkup += `
      <button class="pageBtn" type="button">${i}</button>
      `
  }
  listMarkup += `
      <button class="pageBtn listNumbNext" type="button">...</button>
      `

  pageNumber.insertAdjacentHTML("beforeend", listMarkup);
}

async function loadNextNumberPage() {
  const currentPage = Number(unsplashApi.currentPage);
  const lastPage = lastPageCurrentPagination || currentPage + 2;
  const dataRequest = await getRequest();
  createNumberPage(dataRequest, lastPage + 1);
}

async function loadPrevNuberPage() {
  const currentPage = Number(unsplashApi.currentPage);
  const lastPage = lastPageCurrentPagination - 2 || currentPage;
  const dataRequest = await getRequest();
  createNumberPage(dataRequest, lastPage - 3);
}

async function getRequest() {
  unsplashApi.endpoint = '/recipes';
  const { data } = await unsplashApi.fetchRecipes();
  return data;
}

const firstPage = document.querySelector('.to-start');
const lastPage = document.querySelector('.to-end');

firstPage.addEventListener('click', toFirstPage);
lastPage.addEventListener('click', toLastPage);

async function toFirstPage() {
  unsplashApi.currentPage = 1;
  const data = await reloadRecipesList();

  updatePagesNumber(data);

  updateSelectedPageNumber();
};
async function toLastPage() {
  unsplashApi.endpoint = '/recipes';
  const { data } = await unsplashApi.fetchRecipes();
  unsplashApi.currentPage = data.totalPages;

  const dataRecipesList = await reloadRecipesList();

  updatePagesNumber(dataRecipesList);

  updateSelectedPageNumber();
};

function updateSelectedPageNumber() {
  const listElPageBtn = document.querySelectorAll('.pageBtn');

  for (let el of listElPageBtn) {
    console.log(el.textContent, `${unsplashApi.currentPage}`);
    if (el.textContent === `${unsplashApi.currentPage}`) {
      el.classList.add('current-page');
    } else {
      el.classList.remove('current-page');
    }
  }
}