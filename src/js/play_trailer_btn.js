import * as basicLightbox from 'basiclightbox';
import { TRAILER_KEY } from './localStorageKeys';
import { refs } from './refs';
import { QueryHandler } from './query_handler';
export { openModalTrailer };

const queryHandler = new QueryHandler();

// const modalTrailer = document.querySelector('.position');

refs.playBtn.addEventListener('click', openModalTrailer);
// refs.sliderBtn.addEventListener('click', openSliderTrailer);

function openModalTrailer(e) {
  const getTrailerKey = localStorage.getItem(TRAILER_KEY);
  const { key } = JSON.parse(getTrailerKey);

  refs.closeModalSvg.classList.add('hidden-btn-close-modal');

  const instance = basicLightbox.create(`
  <div class="close-btn-trailer"></div>
  <iframe  width="660" height="415" src='https://www.youtube.com/embed/${key}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
  instance.show();

  const closeBtnTrailer = document.querySelector('.close-btn-trailer');
  closeBtnTrailer.addEventListener('click', () => {
    instance.close();
    refs.closeModalSvg.classList.remove('hidden-btn-close-modal');
  });
}

export function openSliderTrailer(refsBtnTrailer) {
  refsBtnTrailer.forEach(el => {
    el.addEventListener('click', e => {
      queryHandler.fetchQueryResultsForVideo(e.target.dataset.id);
      showSliderTrailer();
    });
  });
}

function showSliderTrailer() {
  const getTrailerKey = localStorage.getItem(TRAILER_KEY);
  const { key } = JSON.parse(getTrailerKey);

  const instance = basicLightbox.create(`
  <div class="close-btn-trailer"></div>
  <iframe  width="660" height="415" src='https://www.youtube.com/embed/${key}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
  instance.show();

  const closeBtnTrailer = document.querySelector('.close-btn-trailer');
  closeBtnTrailer.addEventListener('click', () => {
    instance.close();
  });
}
