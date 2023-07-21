import axios from "axios";

export class UnsplashAPI {
    
#BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

page = 1;
query = null;

async fetchRecipes() {
    return await axios.get(`${this.#BASE_URL}/recipes`, {
      params: {
        
      }
    });
  }
}