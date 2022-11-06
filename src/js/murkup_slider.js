import Glide from '@glidejs/glide';
import { QueryHandler } from './query_handler';
import { refs } from './refs';
import { openSliderTrailer } from './play_trailer_btn';

const glider = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 2000,
  hoverpause: true,
  bound: true,
});

const queryHandler = new QueryHandler();

export async function getTrendForSlider() {
  try {
    const { results } = await queryHandler.fetchQueryResultsForTrending();

    createMarkupSlider(results);
  } catch (error) {
    console.log(error);
  }
}

function createMarkupSlider(results) {
  // const { title, poster_path, release_date, genre_ids, id } = data;
  const markup = results
    .map(({ title, poster_path, id }) => {
      let imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      return /*html*/ `
    <li class="film-slider__item">
   
      <img
        class="film-slider__img"
        src="${imageUrl}"
        alt="${title}"
        data-id="${id}"
		  width="143.25"
		  height ="214.8"
      />
   
        <button data-id="${id}" class="trailer-btn-slider" type="button">
        <p data-id="${id}">Watch trailer</p>
</button>
    </li>

  `;
    })
    .join('');

  refs.slider.innerHTML = markup;

  glider.mount();

  openSliderTrailer(document.querySelectorAll('.trailer-btn-slider'));
}

// function openSliderTrailer(e) {
//   console.log(e.currentTarget);
// }
