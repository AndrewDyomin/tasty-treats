import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import axios from 'axios';

const apiUrl = 'https://tasty-treats-backend.p.goit.global/api/events';
const refs = {
  swiper: document.querySelector('.swiper-wrapper'),
  loader: document.querySelector('.loader'),
  body: document.querySelector('body'),
};

createSlider();

async function createSlider() {
  try {
    const markup = await generateIventsMarkup();
    addIventsInSlick(markup);

    const swiper = new Swiper('.swiper', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 6000,
      },
    });

    swiper.scrollbar?.scrollTo(0, 0, 0);

    refs.loader.style.display = 'none';
  } catch (error) {
    console.error('Error creating slider:', error);
    refs.loader.style.display = 'none';
  }
}

async function fetchEventsData() {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching events data:', error);
  }
}

async function generateIventsMarkup() {
  refs.loader.classList.remove('visible');

  try {
    const ivents = await fetchEventsData();
    refs.loader.classList.add('visible');

    return ivents.reduce((markup, ivent) => markup + createMarkup(ivent), '');
  } catch (error) {
    console.error('Error generating events markup:', error);
    return '';
  }
}

function createMarkup(ivent) {
  const { name, previewUrl, area } = ivent.topic;
  const cookName = ivent.cook.name;
  const cookImgUrl = ivent.cook.imgUrl;
  return `<div class="swiper-slide">
    <div class="slide-item">
      <img
        class="slider-cook"
        src="${cookImgUrl}"
        alt="${cookName}"
      />
      <div class="slide-ivent-box">
        <img
          class="slider-ivent"
          src="${previewUrl}"
          alt=""
        />
        <div class="ivent-info-box">
        <p class="ivent-title">${name}</p>
        <p class="ivent-country">${area}</p>
        </div>
      </div>
      <div
        class="dish-box"
        style="
          background-image: url('${previewUrl}');
        ">
        </div>
    </div>
  </div>`;
}

function addIventsInSlick(markup) {
  refs.swiper.innerHTML = markup;
}