const mobMenuBtn = document.querySelector('.mob-menu-btn');
const mobMenuCloseBtn = document.querySelector('.mob-menu-btn-close');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

mobMenuBtn.addEventListener('click', function() {
  mobileMenu.classList.toggle('open');
  body.classList.add('no-scroll');
});

mobMenuCloseBtn.addEventListener('click', function() {
  mobileMenu.classList.remove('open');
  body.classList.remove('no-scroll');
});

