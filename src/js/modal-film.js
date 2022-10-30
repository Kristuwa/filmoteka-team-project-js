import { GENRES, saveGenres } from './genres_storage';
import storage from './locale-storage-methods';
import { FILMS } from './render_trending';
import { createStringOfGenresForCard } from './genres_storage';
import { WACHED_KEY, QUEUE_KEY } from './add_to_list';
import {
  onButtonAddToListWatched,
  onButtonAddToListQueue,
} from './add_to_list';
import PerfectScrollbar from 'perfect-scrollbar';
//Ищем по селектору все єлементы, с которыми работаем
const modalFilmList = document.querySelector('.card-list');
const modalBackdrop = document.querySelector('.modalbackdrop-film');
const modalFilm = document.querySelector('.modal-film');
const btnTextWatched = document.querySelector('.film-card-addToWatched');
const btnTextQueue = document.querySelector('.film-card-addToQueue');
const modalFilmBtnClose = document.querySelector('.film-card-close');
const modalCard = document.querySelector('.film-card');
const refs = {
  modalFilmList: document.querySelector('.card-list'),
  toWatchBtn: document.querySelector('.film-card-addToWatched'),
  toQueueBtn: document.querySelector('.film-card-addToQueue'),
};
//Вешаем события на галерею для открытия модального окна
modalFilmList.addEventListener('click', event => {
  onModalOpenFilm(event);
  new PerfectScrollbar('.film-info__desc');
});
export let id;
export let filmData = [];
//Пишем функцию, для открытия модального окна
export function onModalOpenFilm(e) {
  e.preventDefault();
  clearModal();

  //Вытягиваем id из карточки из атрибута data-id
  id = Number(e.target.closest('li').dataset.id);

  //Проверяем localStorage на наличие массива с данными
  const videoListWatched = storage.load(WACHED_KEY)
    ? storage.load(WACHED_KEY)
    : [];
  const videoListQueue = storage.load(QUEUE_KEY) ? storage.load(QUEUE_KEY) : [];

  //В зависимости от проверки: есть ли в localStorage фильмы с таким id , меняем текст на кнопках Whatched Queued
  btnTextWatched.textContent = buttonText(
    videoListWatched,
    id,
    'add to watched',
    'remove from watched'
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
  refs.toWatchBtn.addEventListener('click', onButtonAddToListWatched);
  refs.toQueueBtn.addEventListener('click', onButtonAddToListQueue);
  //Ищем фильм именно с таким id как в карточке как в hero
  const filmsData = storage.load(FILMS);
  filmData = filmsData.filter(film => film.id === id);

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
  poster_path = 'https://play-lh.googleusercontent.com/IO3niAyss5tFXAQP176P0Jk5rg_A_hfKPNqzC4gb15WjLPjo5I-f7oIZ9Dqxw2wPBAg',
  genre_ids = '',
  vote_average,
  vote_count,
  overview,
  popularity,
  original_title,
}) {
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
  const voteCount = vote_count.toFixed(0);
  const voteAverage = vote_average.toFixed(1);
  const popular = popularity.toFixed(1);
  const genresStorage = storage.load(GENRES);
  const genresString = createStringOfGenresForCard(genre_ids, genresStorage);

  return `<div class="film-info" data-id='${id}'>
  <img srcset="${IMAGE_URL}${poster_path}" src="${IMAGE_URL}${poster_path}" alt="film-poster" class="film-info__poster"/>
  <div class="flex-wrapper">
  <h2 class="film-info__title">${title}</h2>
  <table class="film-info__table">
		<tbody>
		  <tr>
		  <td class="film-info__param">Vote / Votes</td>
		  <td><span class="film-info__vote">${voteAverage}</span> / ${voteCount}
		  </td>
			</tr>
			<tr class="spacer"></tr>
			<tr>
		  <td class="film-info__param">Popularity</td>
		  <td>${popular}</td>
			  </tr>
			  <tr class="spacer"></tr>
		  <tr>
		  <td class="film-info__param">Original Title</td>
      <td class="film-info__data-up">${original_title}</td>
		  </tr>
		  <tr class="spacer"></tr>
		  <tr>
		  <td class="film-info__param">Genre</td>
         <td>${genresString}</td>
			  </tr>
		
		</tbody>
	 </table>
	 <p class="film-info__about">About</p>
	 <p class="film-info__desc">
	 ${overview}
	 </p>
	 </div></div> `;
}
new PerfectScrollbar('.modal-film');
//Функция рендера надписи на кнопке при открытии модалки
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
  modalCard.innerHTML = '';
}

//  <video poster="${poster_path}" width="640" controls>
// <source src="https://www.youtube.com/watch?v=${key}.webm" type="video/webm" />
// <source src="https://www.youtube.com/watch?v=${key}.mp4" type="video/mp4" />
// <source src="https://www.youtube.com/watch?v=${key}.ogg" type="video/ogg" />
//   </video>;
