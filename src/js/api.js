import axios from "axios";

export class UnsplashAPI {
    
#BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

async fetchRecipes(requestParams) {
  return await axios.get(`${this.#BASE_URL}${requestParams}`);
  }
}