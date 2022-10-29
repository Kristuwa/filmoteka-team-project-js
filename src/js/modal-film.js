import { saveGenres } from './genres_storage';
import storage from './locale-storage-methods';
import { FILMS } from './render_trending';
//  _______________________________________
// import { onAddToList } from './add_to_list';
export let filmData = {};
export let id = 0;
//  _______________________________________

// import {WACHED_KEY, QUEUE_KEY} from './locale-storage-methods'
//Ищем по селектору все єлементы, с которыми работаем
const genres = saveGenres();
const modalFilmList = document.querySelector('.card-list');
console.log(modalFilmList);
const modalBackdrop = document.querySelector('.modalbackdrop-film');
const modalFilm = document.querySelector('.modal-film');
const btnTextWatched = document.querySelector('.film-card-addToWatched');
const btnTextQueue = document.querySelector('.film-card-addToQueue');
const modalFilmBtnClose = document.querySelector('.film-card-close');
const modalCard = document.querySelector('.film-card');

const WACHED_KEY = 'watchedVideoKey';
const QUEUE_KEY = 'queueVideoKey';

//Вешаем события на галерею для открытия модального окна
modalFilmList.addEventListener('click', onModalOpenFilm);

//Пишем функцию, для открытия модального окна
export function onModalOpenFilm(e) {
  e.preventDefault();
  //   clearModal();
  //Вытягиваем id из карточки из атрибута data-id
  const id = Number(e.target.closest('li').dataset.id);
  //Проверяем localStorage на наличие массива с данными
  const videoListWatched = storage.load(WACHED_KEY)
    ? storage.load(WACHED_KEY)
    : [];
  const videoListQueue = storage.load(QUEUE_KEY) ? storage.load(QUEUE_KEY) : [];
  //В зависимости от проверки: есть ли в localStorage фильмы с таким id , меняем текст на кнопках Whatched Queued

  btnTextWatched.textContent = buttonText(
    videoListWatched,
    id,
    'add to Watched',
    'remove from Watched'
  );
  btnTextQueue.textContent = buttonText(
    videoListQueue,
    id,
    'add to queue',
    'remove from queue'
  );
  //Так как модалка скрыта, то добавляем класс active для ее отображения и body-is-hidden,чтоб зафиксировать body
  modalBackdrop.classList.add('active');
  modalFilm.classList.add('active');
  document.body.classList.add('body-is-hidden');
  //Вешаем события на кнопку close, Esc, backdrop
  modalFilmBtnClose.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscBtnPress);
  modalBackdrop.addEventListener('click', onBackdropClick);
		// const modalBackdropActive = document.querySelector('.modalbackdrop-film.active');
  // modalBackdropActive.addEventListener('click', onAddToList);
  //   modalBackdropActive.addEventListener('click', onModalFilmClose);
  //Ищем фильм именно с таким id как в карточке как в hero
  const filmsData = storage.load(FILMS);
  const filmData = filmsData.filter(film => film.id === id);
  console.log(filmData);
  //возращаем его разметку на модалку
  return modalCard.insertAdjacentHTML(
    'afterbegin',
    createMarkupModal(filmData[0])
  );
}

//Функция закрытия модалки
function closeModal() {
  //Убираем классы, для скрытия модалки
  modalBackdrop.classList.remove('active');
  modalFilm.classList.remove('active');
  document.body.classList.remove('body-is-hidden');
  //Снимаем обработчики событий
  modalFilmBtnClose.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onEscBtnPress);
  modalBackdrop.removeEventListener('click', onBackdropClick);
  // modalBackdropActive.removeEventListener('click', onAddToList);
}

export function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

export function onBackdropClick(e) {
  if (e.target === modalBackdrop) {
    closeModal();
  }
}
//Функция создания разметки
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

  let genresString = '';
  const genresArray = [];
  const selectedGenres = genre_ids.map(id => {
    return genres.filter(idGenre => idGenre.id === id);
  });
  selectedGenres.map(genre => genresArray.push(genre.name));
  if (genresArray.length > 0 && genresArray.length <= 3) {
    genresString = genresArray.join('');
  } else if (genresArray.length === 0) {
    return '';
  } else {
    genresString = `${genresArray[0]}, ${genresArray[1]}, other`;
  }

  console.log(genresString);

  return `<div class="film-info" data-id='${id}'>
  <img srcset="${IMAGE_URL}${poster_path}" src="${IMAGE_URL}${poster_path}" alt="film-poster" class="film-info__poster" />
  <div class="flex-wrapper">
  <h2 class="film-info__title">${title}</h2>
  <table class="film-info__table">
		<tbody>
		  <tr>
		  <td class="film-info__param">Vote / Votes</td>
		  <td class="film-info__data">
			 <span class="film-info__vote">${vote_average}</span> / ${vote_count}
		  </td>
			</tr>
		  <tr>
		  <td class="film-info__param">Popularity</td>
		  <td class="film-info__data">${popularity}</td>
			  </tr>
		  <tr>
		  <td class="film-info__param">Original Title</td>
      <td class="film-info__data-up">${original_title}</td>
		  </tr>
		  <tr>
		  <td class="film-info__param">Genre</td>
         <td class="film-info__data">${genresString}</td>
			  </tr>
		
		</tbody>
	 </table>
	 <p class="film-info__about">About</p>
	 <p class="film-info__desc">
	 ${overview}
	 </p>
	 </div></div> `;
}
//Функция рендера надписи на кнопке при открытии модалки
function buttonText(videoList, currentVideoId, textAdd, textRemove) {
  if (videoList?.length > 0) {
    for (let i = 0; i < videoList.length; i += 1) {
      if (videoList[i].id === currentVideoId) {
        console.log(videoList[i].id);

        return textRemove;
      }
    }
  }
  return textAdd;
}

function clearModal() {
  //   modalFilmBtnClose.insertAdjacentHTML('afterend', '');
  modalCard.innerHTML = '';
}
