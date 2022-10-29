import { QueryHandler } from './query_handler';
import { saveGenres } from './genres_storage';
import storage from './locale-storage-methods';
import { FILMS } from './render_trending';
//  _______________________________________
import { onAddToWatch } from './add_to_list';
export let filmData = {};
//  _______________________________________


// import {WACHED_KEY, QUEUE_KEY} from './locale-storage-methods'
const genres = saveGenres();
const modalFilmClick = document.querySelector('.card-list');
const modalBackdrop = document.querySelector('.modalbackdrop-film');
const modalFilm = document.querySelector('.modal-film');
const newFetch = new QueryHandler();

// let modalBackdropActive;
const WACHED_KEY = 'watchedVideoKey';
const QUEUE_KEY = 'queueVideoKey';

modalFilmClick.addEventListener('click', onModalOpenFilm);

export function onModalOpenFilm(e) {
  e.preventDefault();

	const id = Number(e.target.closest('li').dataset.id);
	console.log(id);
  const videoListWatched = storage.load(WACHED_KEY)
    ? storage.load(WACHED_KEY)
    : [];

  const videoListQueue = storage.load(QUEUE_KEY) ? storage.load(QUEUE_KEY) : [];
  document.querySelector('.film-card-addToQueue').textContent = buttonTextQueue(
    videoListQueue,
    id
  );
  document.querySelector('.film-card-addToWatched').textContent =
    buttonTextWatched(videoListWatched, id);

  modalBackdrop.classList.add('active');

  modalFilm.classList.add('active');
  document.body.classList.add('body-is-hidden');

  modalBackdropActive = document.querySelector('.modalbackdrop-film.active');
  modalBackdropActive.addEventListener('click', onModalFilmClose);

  const filmsData = storage.load(FILMS);
  filmData = filmsData.filter(film => film.id === id);
  console.log(filmData);

	// _______________________________
			modalBackdropActive.addEventListener('click', onAddToWatch);
			
// _______________________________
  return modalFilm.insertAdjacentHTML(
    'afterbegin',
    createMarkupModal(filmData[0])
  );
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
  id,
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

  return `<div class="film-card" data-id='${id}'>
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
		
	  </tbody>
	</table>
	</div>`;
}

function buttonTextWatched(videoList, currentVideoId) {
  if (videoList?.length > 0) {
    for (let i = 0; i < videoList.length; i += 1) {
      if (videoList[i].id === currentVideoId) {
        console.log(videoList[i].id);

        return 'Remove from watched';
      }
    }
  }
  return 'Add to watched';
}

function buttonTextQueue(videoList, currentVideoId) {
  if (videoList?.length > 0) {
    for (let i = 0; i < videoList.length; i += 1) {
      if (videoList[i].id === currentVideoId) {
        console.log(videoList[i].id);

        return 'Remove from queue';
      }
      return 'Add to queue';
    }
  }
  return 'Add to queue';
}

// currentVideoId = Number(e.target.closest('div').dataset.id);
