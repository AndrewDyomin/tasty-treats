import { UnsplashAPI } from "./api";

const refs = {
    filterForm: document.querySelector('.filter-form'),
    coockingTime: document.querySelector('.time'),
    countryArea: document.querySelector('.area'),
    ingredients: document.querySelector('.ingredients'),
    resetBtn: document.querySelector('.rst-btn'),
};

refs.filterForm.addEventListener('select', searchRecipe);
refs.resetBtn.addEventListener('click', resetFilters);

function searchRecipe() {
    const searchParams = new UnsplashAPI({
        time: refs.coockingTime.value,
        area: refs.countryArea.value,
        ingredient: refs.ingredients.value
    })
}
function resetFilters() {
    refs.coockingTime.value = '10';
    refs.countryArea.value = 'french';
    refs.ingredients.value = 'cabbage';
};

