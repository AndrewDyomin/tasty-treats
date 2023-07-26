import axios from "axios";

export class UnsplashAPI {

#BASE_URL = 'https://tasty-treats-backend.p.goit.global/api'
endpoint = '';
currentPage = 1;
itemsPerPage = 9;
time;
area;
ingredient;


  
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
