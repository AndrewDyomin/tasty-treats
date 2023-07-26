import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';
import openModalRecipeBtn from './recipes-list';

const unsplashApi = new UnsplashAPI();
const refs = {
  modal: document.querySelector('[data-modal-recipe]'),
  openModalRecipeBtn: document.querySelector('.resipes-list'),
  closeModalBtn: document.querySelector('.js-modal-close'),
  addToFavoriteBtn: document.querySelector('.add-favorite-btn'),
  ratingBtn: document.querySelector('.rating-btn'),
};

// refs.openModalRecipeBtn.addEventListener('click', heardleRecipeById);
refs.openModalRecipeBtn.addEventListener('click', heardleRecipeById);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden-modal');
}

async function heardleRecipeById(e) {
  const click = e.target;
  const btn = 'recipe-card-button';
  if (click.className !== btn) {
    return;
  } else {
    toggleModal();
  }

    let requestParams = `/recipes/6462a8f74c3d0ddd288980d4`;
    const { data } = await unsplashApi.fetchRecipes(requestParams);
    markup(data);
}

function markup(data) {
  const ingredients = data
    .map(({ ingredients }) => {
      return `<li><span class="ingredients-name">${ingredients.name}</span><span class="ingredients-measure">${ingredients.measure}</span></li>`;
    })
    .join('');

  const tags = data
    .map(({ tags }) => {
      return `<li>${tags}</li>`;
    })
    .join('');

  return data
    .map(({ title, time, instructions, youtube, rating }) => {
      return `
        <iframe width="295" height="295"
        src="${youtube}>
        </iframe>
        <h1>${title}</h1>
        <div class="rating-time">
            <p>${rating}</p>
            <p>${time}</p>
        </div>
        <ul class="modal-ingredients">${ingredients}</ul>
        <ul class="modal-tags">${tags}</ul>
        <p>${instructions}</p>
        `;
    })
    .join('');
}
