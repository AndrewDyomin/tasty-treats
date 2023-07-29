export const refs = {
    recipeList: document.querySelector('.resipes-list'),
    LOCALSTORAGE_KEY: "listOfFavoriteRecipe",
}

let data = {};
let dataLocalStorage = localStorage.getItem("listOfFavoriteRecipe")
let listOfLocal = JSON.parse(dataLocalStorage);

refs.recipeList.addEventListener('click', clickOnSvg);

// Добавление в localstorage

function clickOnSvg(e) {
    const btnSvg = e.target;
    if (btnSvg.id !== 'iconUse') {
        return;
    }
    if (data[btnSvg.closest("li").id] !== btnSvg.closest("li").id) {
        data[btnSvg.closest("li").id] = btnSvg.closest("li").id;
        addDataToLocalStorage();
    }

    if (btnSvg.style.fill !== "rgb(248, 248, 248)") {
        btnSvg.style.fill = "#f8f8f8";
    } else {
        btnSvg.style.fill = "none";
    }
};


function addDataToLocalStorage() {
    if (!listOfLocal) {
        localStorage.setItem(refs.LOCALSTORAGE_KEY, JSON.stringify(data));
    } else {
        data = listOfLocal;
        localStorage.setItem(refs.LOCALSTORAGE_KEY, JSON.stringify(data));
    }
}

// С Модального Окна
const addToFavoriteBtn = document.querySelector('.add-favorite-btn')
addToFavoriteBtn.addEventListener('click', heandleClickBtnAd )

function heandleClickBtnAd(e){
    data[e.target.name] = e.target.name;
    localStorage.setItem(refs.LOCALSTORAGE_KEY, JSON.stringify(data));
    addDataToLocalStorage() 
}

