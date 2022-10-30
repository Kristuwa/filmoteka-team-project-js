import { genresStorage } from './render_trending';
import { createStringOfGenresForCard } from './genres_storage';

export function createCardMarkup(data) {
  const {
    title,
    poster_path = 'https://play-lh.googleusercontent.com/IO3niAyss5tFXAQP176P0Jk5rg_A_hfKPNqzC4gb15WjLPjo5I-f7oIZ9Dqxw2wPBAg',
    release_date = '',
    genre_ids = '',
    id,
  } = data;
  const date = release_date.slice(0, 4);

  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

  const cardGenres = createStringOfGenresForCard(genre_ids, genresStorage);

  return `
    <li class="card" data-id="${id}">
    <a class="link card-film-link" href="#" aria-label="${title}">
    <img class="card__poster" data-id="${id}" src="${IMAGE_URL}${poster_path}" alt="film poster" height="634"  width="395"/>
    <b class="card__film-name">${title}</b>
    <p class="card__description">${cardGenres}<span class="film-year">${date}</span>
    </p>
    </a>
    </li>`;
}
