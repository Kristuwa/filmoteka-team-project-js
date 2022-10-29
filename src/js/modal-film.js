import { QueryHandler } from './query_handler';
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
const modalFilmClick = document.querySelector('.card-list');
const modalBackdrop = document.querySelector('.modalbackdrop-film');
const modalFilm = document.querySelector('.modal-film');
const btnTextWatched = document.querySelector('.film-card-addToWatched');
const btnTextQueue = document.querySelector('.film-card-addToQueue');
const newFetch = new QueryHandler();
const modalFilmBtnClose = document.querySelector('.film-card-close');
const WACHED_KEY = 'watchedVideoKey';
const QUEUE_KEY = 'queueVideoKey';

//Вешаем события на галерею для открытия модального окна
modalFilmClick.addEventListener('click', onModalOpenFilm);

//Пишем функцию, для открытия модального окна
export function onModalOpenFilm(e) {
  e.preventDefault();
  //Проверяем, если кликнули не по ссылке, то выходим
  if (e.target.nodeName != 'A') {
    return;
  }
  //Вытягиваем id из карточки из атрибута data-id
  id = Number(e.target.closest('li').dataset.id);
  console.log(id);
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
  filmData = filmsData.filter(film => film.id === id);
  console.log(filmData);
  //возращаем его разметку на модалку
  return modalFilm.insertAdjacentHTML(
    'afterbegin',
    createMarkupModal(filmData[0])
  );
}

//Функция закрытия модалки
function closeModal() {
  //Убираем классы, для скрытия модалки
  modalBackdrop.classList.remove('active');
  modalFilm.classList.remove('active');
  document.body.classList.remove('is-hidden');
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
//Функция рендера надписи на кнопке при открытии модалки
export function buttonText(videoList, currentVideoId, textAdd, textRemove) {
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
