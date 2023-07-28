import axios from 'axios';
import { heardleRecipeById } from './modal-recipe';
export const popularRecipList = document.querySelector('.popular-recipes-list');

const BASE_URL =
  'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

//Open Modal 
popularRecipList.addEventListener('click', openModalRecipe);

function openModalRecipe(e) {
  if (e.target.nodeName !== 'UL') {
    const id = e.target.closest('li').id;
    heardleRecipeById(id);
  } 
} 

export async function getPopularRecip() {
  try {
    const response = await axios.get(BASE_URL);
    const markUp = createMarkUp(response.data);
    if (popularRecipList) {
      popularRecipList.innerHTML = markUp;
    }
  } catch (error) {
    console.error(error);
  }
}

getPopularRecip();

function createMarkUp(data) {
  return data
    .map(({ preview, title, description, _id }) => {
      const MAX_LENGTH = 80;
      let trimmedDescription =
        description.length > MAX_LENGTH
          ? description.substring(0, MAX_LENGTH - 3) + '...'
          : description;

      return `<li class="recip-item" id="${_id}">
          <img class="recip-img" src="${preview}" alt="${title}" width="64"/>
          <div class="recip-content">
            <h3 class="recip-heading">${title}</h3>
            <p class="recip-short-descr">${trimmedDescription}</p>
          </div>
        </li>`;
    })
    .join('');
}