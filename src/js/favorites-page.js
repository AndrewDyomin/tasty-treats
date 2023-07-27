import './scroll-to-top';
import svg from '../images/sprite.svg';
// import './modal-recipe';
import './mob-menu';

const heroPicture = document.querySelector('.fav-hero-pic');
const categoryRecipeList = document.querySelector('.fav-category-recipe-list')
const favoriteRecipesList = document.querySelector('.fav-resipes-list');
const noFavoriteRecipesMessage = document.querySelector('.fav-no-recipes-content');
const categoryAllFilters = document.querySelector('.all-category-btn'); 


const localStorageKey = "favorites"

//----------------------------------------------------------------------------------------------


displayFavoriteResipes(localStorageKey); //favorites - це ім'я ключа на localStorage, куди додаватимуться позначені рецепти
filterRecipesByCategoryBtn();



function filterRecipesByCategoryBtn() {
    const categoryFilters = document.querySelectorAll('.category-btn'); 
    const dataFromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey))

    for (const filter of categoryFilters) {
    
        filter.addEventListener('click', (event) => {     
            const filteredRecipes = dataFromLocalStorage.filter(recipe => recipe.category === event.target.textContent);
            createFavoriteRecipesCards(filteredRecipes);

            if (event.target.textContent === "All categories") {
                createFavoriteRecipesCards(dataFromLocalStorage);    
            }
        })
    }
}

function displayFavoriteResipes(key) {

    if (localStorage.getItem(key) === null) {        
        noFavoriteRecipesMessage.classList.remove('is-hidden');        
    }
    
    noFavoriteRecipesMessage.classList.add('is-hidden')

    createFavoriteRecipesCategories(JSON.parse(localStorage.getItem(key)));
    createFavoriteRecipesCards(JSON.parse(localStorage.getItem(key)));
}


function displayResizeHandler() {
    if (window.innerWidth < 768) {
        heroPicture.style.display = "none";
    }
    else heroPicture.style.display = "";

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {            
            heroPicture.style.display = "none";
        }
        else heroPicture.style.display = "";
    })
}

function createFavoriteRecipesCategories(recipes) { 
    if (recipes === null) {
        displayResizeHandler();
        categoryAllFilters.classList.add('is-hidden');
        noFavoriteRecipesMessage.classList.remove('is-hidden');
        return;
    }

     const recipeCategories = recipes.flatMap(recipe => recipe.category)
        .filter((category, index, array) => array.indexOf(category) === index);
          
    for (const category of recipeCategories) {
        const categoryBtn = `<button type="button" class="category-btn">${category}</button>`;
        categoryRecipeList.insertAdjacentHTML('beforeend', categoryBtn);
    }
}

function createFavoriteRecipesCards(recipes) {
    if (recipes === null) {
        displayResizeHandler();
        categoryAllFilters.classList.add('is-hidden');
        noFavoriteRecipesMessage.classList.remove('is-hidden');
        return;
    }   

    favoriteRecipesList.innerHTML = '';

    for (const recipe of recipes) {
        const recipeCard = `<li class="fav-recipes-list-item">
                      
        <div class="recipe-card-gradient"></div>      
        <div class="fav-recipe-card">
         <span  class="add-to-favorite-checkbox" role="checkbox" aria-checked="true">  
        <svg class="favorite-icon">
                <use href="${svg}#icon-heart"></use>
              </svg> 
        </span> 
            <img src="${recipe.preview}" alt="${recipe.description}" loading="lazy" />
            <p class="fav-recipe-card-title">${recipe.title}</p>
            <p class="fav-recipe-card-description">${recipe.description}</p>
            <button type="button" class="fav-recipe-card-button" name="${recipe._id}" data-modal-recipe-open>See recipe</button>
        </div>      
        </li>`;
        favoriteRecipesList.insertAdjacentHTML('beforeend', recipeCard);
    }
}
    






