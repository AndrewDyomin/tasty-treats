
const refs = {
    recipeList: document.querySelector('.resipes-list'),
    LOCALSTORAGE_KEY: "listOfFavoriteRecipe",
}

const listOfFavoriteRecipe = {};

refs.recipeList.addEventListener('click', clickOnSvg);

function clickOnSvg(e) {
    const btnSvg = e.target;
    if (btnSvg.id !== 'iconUse') {
        return;
    }
    console.log('Done!');
    console.log(btnSvg.closest("li"))
    if (btnSvg.style.fill !== "rgb(248, 248, 248)") {
        return btnSvg.style.fill = "#f8f8f8";
    } else {
        return btnSvg.style.fill = "none";
    }
}

function addDataToLocalStorage() {
    localStorage.setItem(refs.LOCALSTORAGE_KEY, JSON.stringify(refs.LOCALSTORAGE_KEY));
}