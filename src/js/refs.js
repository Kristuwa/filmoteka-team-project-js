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
  openModalBtn: document.querySelector('.footer-item'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
  listCard: document.querySelector('.team-list'),
  card: document.querySelector('.card-team'),
  searchForm: document.querySelector('#search-form'),
  searchBtnBox: document.querySelector('.search-btn__box'),
  searchFormInput: document.querySelector('.search-form__input'),
  info: document.querySelector('.search-form__info'),
};

// Елементи форми фільтра
export const filterItem = {
  filterForm: document.querySelector('#filter-form'),
  genreForm: document.querySelector('#genreForm'),
  yearForm: document.querySelector('#yearForm'),
  resetButton: document.querySelector('#button__reset'),
};