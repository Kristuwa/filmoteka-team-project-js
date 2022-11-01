import { WATCHED_KEY, QUEUE_KEY, FILMS } from './localStorageKeys';
import storage from './locale-storage-methods';
import { ref } from 'firebase/database';
import { createCardMarkupLibrary } from './card-markup-library';
import { refs } from './refs';
import { Pagination } from './pagination';

const paginationLibrary = new Pagination();

refs.watchedBtn.addEventListener('click', event => onWachedLibBtnClick(event));
refs.queueBtn.addEventListener('click', event => onQueueLibBtnClick(event));
refs.pagination.addEventListener('click', onChangePageInLibraryClick);

export function onWachedLibBtnClick(event) {
  refs.modalFilmBtnClose.removeEventListener('click', onRenderNewListQueue);
  refs.modalBackdrop.removeEventListener(
    'click',
    onBackdropClickRerenderingQueue
  );
  document.removeEventListener('keydown', onEscBtnPressRerenderingQueue);

  refs.modalFilmBtnClose.addEventListener('click', onRenderNewListWatched);
  refs.modalBackdrop.addEventListener(
    'click',
    onBackdropClickRerenderingWatched
  );
  document.addEventListener('keydown', onEscBtnPressRerenderingWatched);

  const storageData = storage.load(WATCHED_KEY);

  if (storageData) {
    paginationLibrary.lastQuery = WATCHED_KEY;
    addPagination(storageData);
    renderMarkupFilmsByLibrary(storageData);
  } else {
    console.log('wached storage is empty');
  }
}

export function onQueueLibBtnClick(event) {
  refs.modalFilmBtnClose.removeEventListener('click', onRenderNewListWatched);
  refs.modalBackdrop.removeEventListener(
    'click',
    onBackdropClickRerenderingWatched
  );
  document.removeEventListener('keydown', onEscBtnPressRerenderingWatched);

  refs.modalFilmBtnClose.addEventListener('click', onRenderNewListQueue);
  refs.modalBackdrop.addEventListener('click', onBackdropClickRerenderingQueue);
  document.addEventListener('keydown', onEscBtnPressRerenderingQueue);

  //   let storageArray = [];
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
  paginationLibrary.calculateTotalPages(storageData.length);
  if (paginationLibrary.page > paginationLibrary.totalPages) {
    paginationLibrary.decrementPage();
  }

  renderMarkupFilmsByLibrary(storageData);
  paginationLibrary.renderMarkup();
}

export function onRenderNewListWatched() {
  const storageData = storage.load(WATCHED_KEY);
  paginationLibrary.calculateTotalPages(storageData.length);
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

  refs.filmListRef.innerHTML = storageArray
    .map(createCardMarkupLibrary)
    .join('');
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
  if (e.target === refs.modalBackdrop) {
    onRenderNewListWatched();
  }
}

function onEscBtnPressRerenderingQueue(e) {
  if (e.code === 'Escape') {
    onRenderNewListQueue();
  }
}

function onBackdropClickRerenderingQueue(e) {
  if (e.target === refs.modalBackdrop) {
    onRenderNewListQueue();
  }
}
