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
  recipeMarkup: document.querySelector('.recipe-markup'),
  body: document.querySelector('body'),
};

// refs.openModalRecipeBtn.addEventListener('click', heardleRecipeById);
refs.openModalRecipeBtn.addEventListener('click', heardleRecipeById);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden-modal');
  refs.modal.classList.contains('is-hidden-modal')
    ? refs.body.classList.remove('block-scroll')
    : refs.body.classList.add('block-scroll');
}

async function heardleRecipeById(e) {
  const click = e.target;
  const btnRecipesList = 'recipe-card-button';
  const btnFavorites = 'fav-recipe-card-button';
  const id = click.name;
  console.log(id);
  if (click.className !== btnRecipesList) {
    return;
  } else {
    toggleModal();
  }
  unsplashApi.endpoint = `/recipes/${id}`;
  const { data } = await unsplashApi.fetchRecipes();
  refs.recipeMarkup.innerHTML = markup(data);
}

function markup(data) {
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
