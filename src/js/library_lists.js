import { WACHED_KEY, QUEUE_KEY } from './add_to_list';
import storage from './locale-storage-methods';
import { createCardMarkup } from './card_markup';
import { FILMS } from './render_trending';
import { ref } from 'firebase/database';
import { modalFilmBtnClose, modalBackdrop } from './modal-film';
import { createCardMarkupLibrary } from './card-markup-library';
import { refs } from "./refs";
import { Pagination } from "./pagination";


const paginationLibrary = new Pagination();
// слухач подій на кнопку
refs.watchedBtn.addEventListener('click', event => onWachedLibBtnClick(event));
refs.queueBtn.addEventListener('click', event => onQueueLibBtnClick(event));
refs.pagination.addEventListener('click', onChangePageInLibraryClick);

// Функція рендерить фільми із localstorage watchedVideoKey і перезаписує films
export function onWachedLibBtnClick(event) {
  modalFilmBtnClose.removeEventListener('click', onRenderNewListQueue);
  modalBackdrop.removeEventListener('click', onBackdropClickRerenderingQueue);
  document.removeEventListener('keydown', onEscBtnPressRerenderingQueue);

  modalFilmBtnClose.addEventListener('click', onRenderNewListWatched);
  modalBackdrop.addEventListener('click', onBackdropClickRerenderingWatched);
  document.addEventListener('keydown', onEscBtnPressRerenderingWatched);

  const storageData = storage.load(WACHED_KEY);

  // якщо в localstorage є дані, то записуємо їх в масив
  if (storageData) {

    paginationLibrary.lastQuery = WACHED_KEY;
    addPagination(storageData);
    renderMarkupFilmsByLibrary(storageData);

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
    paginationLibrary.lastQuery = QUEUE_KEY;
    addPagination(storageData);
    renderMarkupFilmsByLibrary(storageData);
  } else {
    console.log('wached storage is empty');
  }
}

export function onRenderNewListQueue() {
  const storageData = storage.load(QUEUE_KEY);
  paginationLibrary.calculateTotalPages(storageData.length)
  if (paginationLibrary.page > paginationLibrary.totalPages) {
    paginationLibrary.decrementPage();
  }
  
  renderMarkupFilmsByLibrary(storageData);
  paginationLibrary.renderMarkup();
}

export function onRenderNewListWatched() {
  const storageData = storage.load(WACHED_KEY);
  paginationLibrary.calculateTotalPages(storageData.length)
  if (paginationLibrary.page > paginationLibrary.totalPages) {
    paginationLibrary.decrementPage();
  }

  renderMarkupFilmsByLibrary(storageData);
  paginationLibrary.renderMarkup();
}

function addPagination(data) {
  paginationLibrary.resetPage();
  paginationLibrary.calculateFilmsOnPage();
  paginationLibrary.calculateTotalPages(data.length);
  paginationLibrary.renderMarkup();
}

function renderMarkupFilmsByLibrary(data) {
  refs.filmListRef.innerHTML = '';

  let start = (paginationLibrary.page - 1) * paginationLibrary.filmsOnPage;
  let end = start + paginationLibrary.filmsOnPage;
  const storageArray = data.slice(start, end);

  storage.remove(FILMS);
  storage.save(FILMS, storageArray);

  refs.filmListRef.innerHTML = storageArray.map(createCardMarkup).join('');
  paginationLibrary.renderMarkup();
}

export function onChangePageInLibraryClick(e) {
  if (e.target.nodeName === 'UL') {
    return;
  }
  if (e.target.className === 'btn__next') {
    paginationLibrary.incrementPage();
  }
  if (e.target.className === 'btn__prev') {
    paginationLibrary.decrementPage();
  }
  if (e.target.className === 'dots') {
    return;
  }
  if (e.target.className === 'num') {
    paginationLibrary.page = Number(e.target.textContent);
  }
  const storageData = storage.load(paginationLibrary.lastQuery);
  renderMarkupFilmsByLibrary(storageData);
  
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
