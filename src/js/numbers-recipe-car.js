import { createRecipesCards, reloadRecipesList } from './recipes-list'

// window.matchMedia('(min-width: 1200px)').addEventListener('change', e => {
//     if (!e.matches) return;
//     mobileMenu.classList.remove('is-open');
//     openMenuBtn.setAttribute('aria-expanded', false);
//     bodyScrollLock.enableBodyScroll(document.body);
//   });

window.matchMedia('(max-width: 767px)').addEventListener('change', e => {
    for (let i = 0; i <= 6; i++) {
        createRecipesCards();
    }
});
window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    for (let i = 0; i <= 8; i++) {
        createRecipesCards();
    }
});
window.matchMedia('(min-width: 1140px)').addEventListener('change', e => {
    for (let i = 0; i <= 9; i++) {
        createRecipesCards();
    }
});