const refs = {
    recipeList: document.querySelector('.resipes-list'),
    LOCALSTORAGE_KEY: "listOfFavoriteRecipe",
}

const data = {};

refs.recipeList.addEventListener('click', clickOnSvg);



function clickOnSvg(e) {
    const btnSvg = e.target;
    if (btnSvg.id !== 'iconUse') {
        return;
    }
    console.log('Done!', btnSvg);
    console.log(btnSvg.closest("li").id);
    data[btnSvg.closest("li").id] = btnSvg.closest("li").id;
    addDataToLocalStorage();
    if (btnSvg.style.fill !== "rgb(248, 248, 248)") {
        return btnSvg.style.fill = "#f8f8f8";
        
    } else {
        return btnSvg.style.fill = "none";
    }
}

function addDataToLocalStorage() {
    localStorage.setItem(refs.LOCALSTORAGE_KEY, JSON.stringify(data));
}