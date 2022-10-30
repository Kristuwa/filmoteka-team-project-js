import { genresStorage } from './render_trending';
import { createStringOfGenresForCard } from './genres_storage';

export function createCardMarkup(data) {
  const { title, poster_path, release_date, genre_ids, id } = data;

  let date = release_date;
  if (date===null) {
    date = '';
  } else {
    date = release_date.slice(0, 4);
  }

  let imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  if(poster_path === null){
     imageUrl = 'https://www.bworldonline.com/wp-content/uploads/2022/04/cinema02_14-01.jpg';
  }
  
  let cardGenres;
  if (genre_ids.length === 0) {
    cardGenres = 'No information';
  } else {
    cardGenres = createStringOfGenresForCard(genre_ids, genresStorage);
  }

  return `
    <li class="card" data-id="${id}">
    <a class="link card-film-link" href="#" aria-label="${title}">
    <img class="card__poster" data-id="${id}" src="${imageUrl}" height="574"  width="395"/>
    <b class="card__film-name">${title}</b>
    <p class="card__description">${cardGenres}<span class="film-year">${date}</span>
    </p>
    </a>
    </li>`;
}
