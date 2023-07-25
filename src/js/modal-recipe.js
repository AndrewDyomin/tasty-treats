import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';

const unsplashApi = new UnsplashAPI();
const refs = {
  modal: document.querySelector('[data-modal-recipe]'),
  openModalRecipeBtn: document.querySelector('[data-modal-recipte-open]'),
  closeModalBtn: document.querySelector('js-modal-close'),
  addToFavoriteBtn: document.querySelector('add-favorite-btn'),
  ratingBtn: document.querySelector('rating-btn'),
};

openModalRecipeBtn.addEventListener('click', heardleRecipeById);
closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

async function heardleRecipeById() {}

function markup(data) {
  const ingredients = data.map(({ ingredients }) => {
    return `<li><span class="ingredients-name">${ingredients.name}</span><span class="ingredients-measure">${ingredients.measure}</span></li>`;
  });

  const tags = data.map(({ tags }) => {
    return `<li>${tags}</li>`;
  });

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
        <ul class="modal-tags">;${tags}</ul>
        <p>${instructions}</p>
        `;
    })
    .join('');
}
