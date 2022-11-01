import { WACHED_KEY, QUEUE_KEY } from './add_to_list';
import storage from './locale-storage-methods';
import { createCardMarkup } from './card_markup';
import { FILMS } from './render_trending';
import { ref } from 'firebase/database';
import { modalFilmBtnClose, modalBackdrop } from './modal-film';
import { createCardMarkupLibrary } from './card-markup-library';

const refs = {
  watchedBtn: document.querySelector('.btn__watched'),
  queueBtn: document.querySelector('.btn__queue'),
  filmListRef: document.querySelector('.card-list'),
};
// слухач подій на кнопку
refs.watchedBtn.addEventListener('click', event => onWachedLibBtnClick(event));
refs.queueBtn.addEventListener('click', event => onQueueLibBtnClick(event));

// Функція рендерить фільми із localstorage watchedVideoKey і перезаписує films
export function onWachedLibBtnClick(event) {
  modalFilmBtnClose.removeEventListener('click', onRenderNewListQueue);
  modalBackdrop.removeEventListener('click', onBackdropClickRerenderingQueue);
  document.removeEventListener('keydown', onEscBtnPressRerenderingQueue);

  modalFilmBtnClose.addEventListener('click', onRenderNewListWatched);
  modalBackdrop.addEventListener('click', onBackdropClickRerenderingWatched);
  document.addEventListener('keydown', onEscBtnPressRerenderingWatched);

  let storageArray = [];
  const storageData = storage.load(WACHED_KEY);

  // якщо в localstorage є дані, то записуємо їх в масив
  if (storageData) {
    storageArray = storageData;
    console.log(storageArray);

    // Перезаписуємо films щоб модалка відкривалась
    storage.save(FILMS, storageArray);

    // Рендеримо розмітку
    const markup = storageArray.map(createCardMarkup).join('');
    refs.filmListRef.innerHTML = '';
    refs.filmListRef.innerHTML = markup;
  } else {
    console.log('wached storage is empty');
  }
}

// Функція рендерить фільми із localstorage queueVideoKey і перезаписує films
export function onQueueLibBtnClick(event) {
  modalFilmBtnClose.removeEventListener('click', onRenderNewListWatched);
  modalBackdrop.removeEventListener('click', onBackdropClickRerenderingWatched);
  document.removeEventListener('keydown', onEscBtnPressRerenderingWatched);

  modalFilmBtnClose.addEventListener('click', onRenderNewListQueue);
  modalBackdrop.addEventListener('click', onBackdropClickRerenderingQueue);
  document.addEventListener('keydown', onEscBtnPressRerenderingQueue);

  let storageArray = [];
  const storageData = storage.load(QUEUE_KEY);

  // якщо в localstorage є дані, то записуємо їх в масив
  if (storageData) {
    storageArray = storageData;
    // Перезаписуємо films щоб модалка відкривалась
    storage.save(FILMS, storageArray);
    // Рендеримо розмітку
    const markup = storageArray.map(createCardMarkup).join('');
    refs.filmListRef.innerHTML = markup;
  } else {
    console.log('wached storage is empty');
  }
}

export function onRenderNewListQueue() {
  refs.filmListRef.innerHTML = '';
  const queueList = storage.load(QUEUE_KEY);
  storage.save(FILMS, queueList);
  const newFilmsList = storage.load(FILMS);
  const markup = newFilmsList.map(createCardMarkup).join('');
  refs.filmListRef.innerHTML = markup;
}

export function onRenderNewListWatched() {
  refs.filmListRef.innerHTML = '';
  const queueList = storage.load(WACHED_KEY);
  storage.save(FILMS, queueList);
  const newFilmsList = storage.load(FILMS);
  const markup = newFilmsList.map(createCardMarkup).join('');
  refs.filmListRef.innerHTML = markup;
}

function onEscBtnPressRerenderingWatched(e) {
  if (e.code === 'Escape') {
    onRenderNewListWatched();
  }
}

function onBackdropClickRerenderingWatched(e) {
  if (e.target === modalBackdrop) {
    onRenderNewListWatched();
  }
}

function onEscBtnPressRerenderingQueue(e) {
  if (e.code === 'Escape') {
    onRenderNewListQueue();
  }
}

function onBackdropClickRerenderingQueue(e) {
  if (e.target === modalBackdrop) {
    onRenderNewListQueue();
  }
}
