const scrollToTopBtnEl = document.querySelector('.btn-up');
scrollToTopBtnEl.addEventListener('click', scrollToTop);

function scrollShowBtnToTop() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    scrollY > 350
      ? scrollToTopBtnEl.classList.remove('btn-up_hide')
      : scrollToTopBtnEl.classList.add('btn-up_hide');
  });
}

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

scrollShowBtnToTop()