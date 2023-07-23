
const searchInputEl = document.querySelector('.search-input');
const searchIconEl = document.querySelector('.search-icon');

function searchInputChangeHandler() {
    if (!searchInputEl.value) {
        searchIconEl.classList.add('search-icon-active');
        console.log('input changed')
    }
};

searchInputEl.addEventListener('change', searchInputChangeHandler);