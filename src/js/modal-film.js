import { QueryHandler } from './query_handler';
import { saveGenres } from './genres_storage';
import storage from './locale-storage-methods';
import { FILMS } from './render_trending';
// import {WACHED_KEY, QUEUE_KEY} from './locale-storage-methods'
const genres = saveGenres();
const modalFilmClick = document.querySelector('.card-list');
const modalBackdrop = document.querySelector('.modalbackdrop-film');
const modalFilm = document.querySelector('.modal-film');
const newFetch = new QueryHandler();
let btnTextWatched = '';
let btnTextQueue = '';
// let modalBackdropActive;
const WACHED_KEY = 'watchedVideoKey';
const QUEUE_KEY = 'queueVideoKey';

modalFilmClick.addEventListener('click', onModalOpenFilm);

export function onModalOpenFilm(e) {
  e.preventDefault();

  const id = Number(e.target.closest('li').dataset.id);
  const videoListWatched = storage.load(WACHED_KEY);
  console.log(videoListWatched);
  const videoListQueue = storage.load(QUEUE_KEY);
  btnTextQueue = buttonTextQueue(videoListQueue, id);
  btnTextWatched = buttonTextWatched(videoListWatched, id);

  modalBackdrop.classList.add('active');

  modalFilm.classList.add('active');
  document.body.classList.add('is-hidden');

  modalBackdropActive = document.querySelector('.modalbackdrop-film.active');
  modalBackdropActive.addEventListener('click', onModalFilmClose);

  const filmsData = storage.load(FILMS);
  const filmData = filmsData.filter(film => film.id === id);
  console.log(filmData);

  const markup = createMarkupModal(filmData[0]);

  return (modalFilm.innerHTML = markup);
}

export function onModalFilmClose(e) {
  //   const closeBtn = e.target.closest('.film-card-close');
  //   console.log(closeBtn);
  if (e.target.closest('.film-card-close')) {
    modalBackdrop.classList.remove('active');
    modalFilm.classList.remove('active');
    document.body.classList.remove('is-hidden');
  }
}

function createMarkupModal({
  title,
  poster_path,
  vote_average,
  vote_count,
  overview,
  popularity,
  original_title,
  genre_ids,
}) {
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
  let genresString;
  const genresArray = [];

  const selectedGenres = genre_ids.map(id => {
    return genres.filter(idGenre => idGenre.id === id);
  });
  selectedGenres.map(genre => genresArray.push(genre.name));
  if (genresArray.length > 0 && genresArray.length <= 3) {
    genresString = genresArray.join(', ');
  } else {
    genresString = `${genresArray[0]}, ${genresArray[1]}, other`;
  }

  return `<div class="film-card">
	<button type="button" class="film-card-close" autofocus>
	  x<svg class="film-card-close-svg" width="14" height="14">
		 <use href="./images/icons.svg#icon-close"></use>
	  </svg>
	</button>
	<img src="${IMAGE_URL}${poster_path}" alt="film-poster" />
	<table>
	  <tbody>
		 <tr>
			<th class='film-card__title'>${title}</th>
		 </tr>
		 <tr>
			<td>Vote / Votes</td>
			<td>${vote_average} / ${vote_count}</td>
		 </tr>
		 <tr>
			<td>Popularity</td>
			<td>${popularity}</td>
		 </tr>
		 <tr>
			<td>Original Title</td>
			<td>${original_title}</td>
		 </tr>
		 <tr>
			<td>Genre</td>
			<td>${genresString}</td>
		 </tr>
		 <tr>
			<td>About</td>
		 </tr>
		 <tr>
			<td class='film-card__text'>
			  ${overview}
			</td>
		 </tr>
		 <tr>
			<td>
			  <button type="button" class="film-card-addToWatched">
				${btnTextWatched}
			  </button>
			</td>
			<td>
			  <button type="button" class="film-card-addToQueue">
			  ${btnTextQueue}
			  </button>
			</td>
		 </tr>
	  </tbody>
	</table>
	</div>`;
}

function buttonTextWatched(videoList, currentVideoId) {
  if (null || videoList.length === 0) {
    return 'Add to watched';
  }
  for (let i = 0; i < videoList.length; i += 1) {
    if (videoList[i].id === currentVideoId) {
      console.log(videoList[i].id);

      return 'Remove from watched';
    }

    return 'Add to watched';
  }
}

function buttonTextQueue(videoList, currentVideoId) {
  if (null || videoList.length === 0) {
    return 'Add to queue';
  }
  for (let i = 0; i < videoList.length; i += 1) {
    if (videoList[i].id === currentVideoId) {
      console.log(videoList[i].id);

      return 'Remove from queue';
    }

    return 'Add to queue';
  }
}
