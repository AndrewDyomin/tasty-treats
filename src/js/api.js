import axios from "axios";

export class UnsplashAPI {

#BASE_URL = 'https://tasty-treats-backend.p.goit.global/api'
endpoint = '';
  currentPage = 1;
  itemsPerPage;
  time;
  area;
  ingredient;


  constructor({itemsPerPage, time, area, ingredient}) {
    this.itemsPerPage = itemsPerPage;
    this.time = time;
    this.area = area;
    this.ingredient = ingredient;
  };
  
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
