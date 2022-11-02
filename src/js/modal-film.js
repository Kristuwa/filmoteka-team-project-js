import {
  GENRES,
  FILMS,
  WATCHED_KEY,
  QUEUE_KEY,
  FILMS,
} from './localStorageKeys';
import storage from './locale-storage-methods';
import {
  onButtonAddToListWatched,
  onButtonAddToListQueue,
} from './add_to_list';
import PerfectScrollbar from 'perfect-scrollbar';
import { QueryHandler } from './query_handler';
import { refs } from './refs';

const queryHandler = new QueryHandler();

refs.filmListRef.addEventListener('click', event => {
  onModalOpenFilm(event);
  new PerfectScrollbar('.film-info__desc');
});

export let id;
export let filmData = [];
export function onModalOpenFilm(e) {
  e.preventDefault();
  clearModal();

  id = Number(e.target.closest('li').dataset.id);

  queryHandler.fetchQueryResultsForVideo(id);

  const videoListWatched = storage.load(WATCHED_KEY)
    ? storage.load(WATCHED_KEY)
    : [];
  const videoListQueue = storage.load(QUEUE_KEY) ? storage.load(QUEUE_KEY) : [];

  refs.toWatchBtn.textContent = buttonText(
    videoListWatched,
    id,
    'add to watched',
    'remove from watched'
  );
  refs.toQueueBtn.textContent = buttonText(
    videoListQueue,
    id,
    'add to queue',
    'remove from queue'
  );

  refs.modalBackdrop.classList.add('active');
  refs.modalFilm.classList.add('active');
  document.body.classList.add('body-is-hidden');

  refs.modalFilmBtnClose.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscBtnPress);
  refs.modalBackdrop.addEventListener('click', onBackdropClick);
  refs.toWatchBtn.addEventListener('click', onButtonAddToListWatched);
  refs.toQueueBtn.addEventListener('click', onButtonAddToListQueue);

  const filmsData = storage.load(FILMS);
  filmData = filmsData.filter(film => film.id === id);

  return refs.modalCard.insertAdjacentHTML(
    'afterbegin',
    createMarkupModal(filmData[0])
  );
}

export function closeModal() {
  refs.modalBackdrop.classList.remove('active');
  refs.modalFilm.classList.remove('active');
  document.body.classList.remove('body-is-hidden');

  refs.modalFilmBtnClose.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onEscBtnPress);
  refs.modalBackdrop.removeEventListener('click', onBackdropClick);
  refs.toWatchBtn.removeEventListener('click', onButtonAddToListWatched);
  refs.toQueueBtn.removeEventListener('click', onButtonAddToListQueue);
}

export function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

export function onBackdropClick(e) {
  if (e.target === refs.modalBackdrop) {
    closeModal();
  }
}

function createMarkupModal({
  title,
  id,
  poster_path,
  genre_ids,
  vote_average,
  vote_count,
  overview,
  popularity,
  original_title,
}) {
  const voteCount = vote_count.toFixed(0);
  const voteAverage = vote_average.toFixed(1);
  const popular = popularity.toFixed(1);
  const genresStorage = storage.load(GENRES);
  const about = overview === '' ? 'No information' : `${overview}`;
  let genresNameList = '';
  const genresArray = [];
  const selectedGenres = genre_ids.map(id => {
    return genresStorage.filter(idGenre => idGenre.id === id);
  });

  selectedGenres.map(genre => {
    genresArray.push(genre[0].name);
  });

  if (genre_ids.length === 0) {
    genresNameList = 'No information';
  } else {
    genresNameList = genresArray.join(', ');
  }

  let imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  if (poster_path === null) {
    imageUrl =
      'https://www.bworldonline.com/wp-content/uploads/2022/04/cinema02_14-01.jpg';
  }

  return `<div class="film-info" data-id='${id}'>
  <img srcset="${imageUrl}" src="${imageUrl}" alt="${title}" class="film-info__poster"/>
  <div class="flex-wrapper">
  <h2 class="film-info__title">${title}</h2>
  <table class="film-info__table">
		<tbody>
		  <tr>
		  <td class="film-info__param">Vote / Votes</td>
		  <td><span class="film-info__vote">${voteAverage}</span> / ${voteCount}
		  </td>
			</tr>
			<tr class="spacer"><td></td><td></td></tr>
			<tr>
		  <td class="film-info__param">Popularity</td>
		  <td>${popular}</td>
			  </tr>
			  <tr class="spacer"><td></td><td></td></tr>
		  <tr>
		  <td class="film-info__param">Original Title</td>
      <td class="film-info__data-up">${original_title}</td>
		  </tr>
		  <tr class="spacer"><td></td><td></td></tr>
		  <tr>
		  <td class="film-info__param">Genre</td>
         <td>${genresNameList}</td>
			  </tr>
		
		</tbody>
	 </table>
	 <p class="film-info__about">About</p>
	 <p class="film-info__desc">
	 ${about}
	 </p>
	 </div></div> `;
}

new PerfectScrollbar('.modal-film');

function buttonText(videoList, currentVideoId, textAdd, textRemove) {
  if (videoList?.length > 0) {
    for (let i = 0; i < videoList.length; i += 1) {
      if (videoList[i].id === currentVideoId) {
        return textRemove;
      }
    }
  }
  return textAdd;
}

function clearModal() {
  refs.modalCard.innerHTML = '';
}
