import { QueryHandler } from './query_handler';
import { saveGenres } from './genres_storage';
console.log(saveGenres());
const genres = saveGenres();
// console.log(saveGenres().than(data => console.log(data)));
const modalFilmClick = document.querySelector('.card-list');
const modalBackdrop = document.querySelector('.modalbackdrop-film');
const modalFilm = document.querySelector('.modal-film');

let modalBackdropActive;
console.log(modalBackdropActive);
// const modalFilmBtnClose = document.querySelector('.film-card-close');
const newFetch = new QueryHandler();

console.log(modalFilmClick);

modalFilmClick.addEventListener('click', onModalOpenFilm);

export function onModalOpenFilm(e) {
  e.preventDefault();
  if (e.target.nodeName === 'a') return;
  modalBackdrop.classList.add('active');
  modalBackdropActive = document.querySelector('.modalbackdrop-film.active');

  modalBackdropActive.addEventListener('click', onModalFilmClose);
  document.addEventListener('keydown', onEscBtnPress);
  modalBackdrop.addEventListener('click', onBackdropClick);
  modalFilm.classList.add('active');
  document.body.classList.add('is-hidden');

  const id = Number(e.target.closest('li').dataset.id);
  newFetch.movieId = id;
  console.log(id);
  return newFetch.fetchQueryResultsForMovieInfo().then(data => {
    console.log(data);

    const markup = createMarkupModal(data);

    //  closeBtn.addEventListener('click', onModalFilmClose);
    return (modalFilm.innerHTML = markup);
  });
}
function closeModal() {
	modalBackdrop.classList.remove('active');
    modalFilm.classList.remove('active');
    document.body.classList.remove('is-hidden');
};

export function onModalFilmClose(e) {
  if (e.target.closest('.film-card-close')) {
    closeModal()
  }
};

export function onEscBtnPress(e) {
	if (e.code === 'Escape') {
	  closeModal();
	}
  };
  
  export function onBackdropClick(e) {
	if (e.target === modalBackdrop) {
		closeModal();
	}
  };

function createMarkupModal({
  title,
  backdrop_path,
  vote_average,
  vote_count,
  overview,
  popularity,
  original_title,
  genres,
}) {
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
  let genresString;
  const genresArray = [];
  console.log(genres);
  const selectedGenres = genres.map(id => {
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
	<img src="${IMAGE_URL}${backdrop_path}" alt="film-poster" />
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
				 Add to watched
			  </button>
			</td>
			<td>
			  <button type="button" class="film-card-addToQueue">
				 Add to queue
			  </button>
			</td>
		 </tr>
	  </tbody>
	</table>
	</div>`;
}
