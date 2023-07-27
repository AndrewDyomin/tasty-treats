import { UnsplashAPI } from './api';
import Notiflix from 'notiflix';
import { showLoader, hideLoader } from './loader';

const unsplashApi = new UnsplashAPI();
const refs = {
  modal: document.querySelector('[data-modal-recipe]'),
  openModalRecipeBtn: document.querySelector('.resipes-list'),
  closeModalBtn: document.querySelector('.js-modal-close'),
  addToFavoriteBtn: document.querySelector('.add-favorite-btn'),
  ratingBtn: document.querySelector('.rating-btn'),
  recipeMarkup: document.querySelector('.recipe-markup'),
  body: document.querySelector('body'),
  backdrop: document.querySelector('js-backdrop'),
};

refs.openModalRecipeBtn.addEventListener('click', heardleRecipeById);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.modal.addEventListener('click', handleBackdropClick);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden-modal');
  refs.modal.classList.contains('is-hidden-modal')
    ? refs.body.classList.remove('block-scroll')
    : refs.body.classList.add('block-scroll');
  window.removeEventListener('keydown', handleEscKeyPress);
}

async function heardleRecipeById(e) {
  const click = e.target;
  const btnRecipesList = 'recipe-card-button';
  const btnFavorites = 'fav-recipe-card-button';
  const id = click.name;
  showLoader();
  if (click.className !== btnRecipesList) {
    return;
  } else {
    toggleModal();
  }
  window.addEventListener('keydown', handleEscKeyPress);
  try {
    unsplashApi.endpoint = `/recipes/${id}`;
    const { data } = await unsplashApi.fetchRecipes();
    if (window.matchMedia('(min-width: 720px)').matches) {
      refs.recipeMarkup.innerHTML = markupTab(data);
    } else {
      refs.recipeMarkup.innerHTML = markupMob(data);
    }
    hideLoader();
  } catch {
    Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
  }
}

function markupMob(data) {
  const ingredients = data.ingredients
    .map(ingredient => {
      return `<li class="modal-recipte-list"><span class="modal-recipte-list-ingr">${ingredient.name}</span><span class="modal-recipte-list-measure">${ingredient.measure}</span></li>`;
    })
    .join('');

  const tags = data.tags
    .map(tag => {
      return `<li class="modal-recipe-tags-list">#${tag}</li>`;
    })
    .join('');

  return `
        <iframe
        class="modal-recipe-video"
        width="295"
        height="295"
        src="${data.youtube}"
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture;
         web-share" allowfullscreen>
         </iframe>
        <h1 class="modal-recipe-title">${data.title}</h1>
        <div class="recipe-rating-time">
          <p>${data.rating}</p>
          <p>${data.time}</p>
        </div>
        <ul class="modal-recipe-ingredients">${ingredients}</ul>
        <ul class="modal-recipe-tags">${tags}</ul>
        <p class="modal-recipe-text">${data.instructions}</p>
        `;
}

function markupTab(data) {
  const ingredients = data.ingredients
    .map(ingredient => {
      return `<li class="modal-recipte-list"><span class="modal-recipte-list-ingr">${ingredient.name}</span><span class="modal-recipte-list-measure">${ingredient.measure}</span></li>`;
    })
    .join('');

  const tags = data.tags
    .map(tag => {
      return `<li class="modal-recipe-tags-list">#${tag}</li>`;
    })
    .join('');

  return `
        <h1 class="modal-recipe-title">${data.title}</h1>
        <iframe
        class="modal-recipe-video"
        width="295"
        height="295"
        src="${data.youtube}"
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture;
         web-share" allowfullscreen>
        </iframe>
        <div class="modal-recipe-tags-rating">
          <ul class="modal-recipe-tags">${tags}</ul>
          <div class="recipe-rating-time">
            <p>${data.rating}</p>
            <p>${data.time}</p>
          </div>
        </div>
        <ul class="modal-recipe-ingredients">${ingredients}</ul>
        <p class="modal-recipe-text">${data.instructions}</p>
        `;
}

function handleBackdropClick(e) {
  if (e.currentTarget === e.target) {
    toggleModal();
  }
}

function handleEscKeyPress(e) {
  const ESC_KEY = 'Escape';
  if (e.code === ESC_KEY) {
    toggleModal();
  }
}
