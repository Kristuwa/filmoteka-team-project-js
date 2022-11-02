export const refs = {
  pagination: document.querySelector('.pagination__list'),
  watchedBtn: document.querySelector('.btn__watched'),
  queueBtn: document.querySelector('.btn__queue'),
  filmListRef: document.querySelector('.card-list'),
  toWatchBtn: document.querySelector('.film-card-addToWatched'),
  toQueueBtn: document.querySelector('.film-card-addToQueue'),
  modalBackdrop: document.querySelector('.modalbackdrop-film'),
  modalFilmBtnClose: document.querySelector('.film-card-close'),
  modalFilm: document.querySelector('.modal-film'),
  modalCard: document.querySelector('.film-card'),
  libraryListButtons: document.querySelector('.btn__list'),
  playBtn: document.querySelector('.trailer-btn'),
  closeModalSvg: document.querySelector('.film-card-close-svg'),
  upward: document.querySelector('.upward'),
};

// Елементи форми фільтра
export const filterItem = {
  filterForm: document.querySelector('#filter-form'),
  genreForm: document.querySelector('#genreForm'),
  yearForm: document.querySelector('#yearForm'),
  resetButton: document.querySelector('#button__reset'),
};