import axios from "axios";

export class UnsplashAPI {

currentPage = 1;
itemsPerPage = 6;    
#BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
endpoint = '';

async fetchRecipes() {
  return await axios.get(`${this.#BASE_URL}${this.endpoint}`, {
    params: {
      page: this.currentPage,
      limit: this.itemsPerPage,
      title: this.searchQuerry,
      time: this.queryTime,
      area: this.queryArea,
      ingredient: this.queryIngredient,
    },
  });
  }
}
