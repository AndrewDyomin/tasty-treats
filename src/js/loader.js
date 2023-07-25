export function showLoader() {
  const preloader = document.querySelector('.preloader');
  preloader.style.display = 'block';
}

export function hideLoader() {
  const preloader = document.querySelector('.preloader');
  window.setTimeout(function () {
    preloader.style.display = 'none';
  }, 1500);
}
