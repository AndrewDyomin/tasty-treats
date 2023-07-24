const heroPicture = document.querySelector('.fav-hero-pic');
const favoriteRecipesList = document.querySelector('.fav-resipes-list');
const noFavoriteRecipesMessage = document.querySelector('.fav-no-recipes-content');
// const displaySize = window.innerWidth;
console.log("heroPicture", heroPicture);
console.log(window);

displayResizeHandler()


function displayResizeHandler() {
    if (window.innerWidth < 768) {
        heroPicture.style.display = "none";
    }
    else heroPicture.style.display = "";

    window.addEventListener('resize', (event) => {
        if (window.innerWidth < 768) {
            // console.log("Mobile display!!!")
            heroPicture.style.display = "none";
        }
        else heroPicture.style.display = "";
    })
}


