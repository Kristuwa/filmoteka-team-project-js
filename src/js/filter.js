import axios from 'axios';
import { MOVIEDB_KEY } from './query_handler';
import storage from './locale-storage-methods';
import {FILMS} from './localStorageKeys';
import { createCardMarkup } from './card_markup';
import { refs } from './refs';
import { filterItem } from './refs';
import { renderMarkupTrending, pagination, onChangePageClick} from './render_trending'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './modal-film';

const BASE_URL = 'https://api.themoviedb.org/3/'

// Слухачі подій

filterItem.genreForm.addEventListener('input', eventGenre);
filterItem.yearForm.addEventListener('input', eventYear);
filterItem.resetButton.addEventListener('click', onResetSearch);

refs.pagination.removeEventListener('click', onChangePageClick);
refs.pagination.addEventListener('click', onChangePageOfFilterClick);

// Змінні для запиту на бекенд
let formSearch = {
  year: '',
  genre: '',
  query: '',
  discover: `trending`,
  page: '',
};


//Пошук рендер фильму по жанру __________________________
async function eventGenre(evt) {
  evt.preventDefault();
  console.log(evt);
  if (evt.target.value !== formSearch.genre || !formSearch.genre) {
    pagination.resetPage();
  }

  if (evt) {
    formSearch.genre = evt.target.value;
    // console.log('genre id:', evt.target.value);
    // formSearch.page = 1;


    await getSearchForm(formSearch.genre, formSearch.year, pagination.page)
      .then(data => {


        if (data.results.length !== 0) {
          refs.filmListRef.innerHTML = '';
          // console.log('видаляємо фільми зі сторінки');
          const markup = data.results.map(createCardMarkup).join('');
          refs.filmListRef.innerHTML = markup;
          // console.log('create markup');
          
        } else {
         
          Notify.failure(`Nothing was found for your request`);
 
        }
      })
      .catch(error => console.log(error))

  }
}


// Пошук і рендер фільмів по роках __________________________
async function eventYear(evt) {
  evt.preventDefault();
  if (evt.target.value !== formSearch.year || !formSearch.year) {
    pagination.resetPage();
  }
  // якщо евент не пустий, то беремо значення з форми
  if (evt) {
    formSearch.year = Number(evt.target.value);
    // formSearch.page = 1;

    await getSearchForm(formSearch.genre, formSearch.year, pagination.page)
      .then(data => {

        if (data.results.length !== 0) {
          refs.filmListRef.innerHTML = '';
          // console.log('видаляємо фільми зі сторінки');
          const markup = data.results.map(createCardMarkup).join('');
          refs.filmListRef.innerHTML = markup;
          // console.log('create markup');
        } else {

          Notify.failure(`Nothing was found for your request`);
        };
      }).catch(error => console.log(error))
  };
};


// Запит на бекенд по жанру або року __________________________
export async function getSearchForm(
  genre = '',
  year = '',
  pageNumber = '',
  query = ''
) {

  // якщо значення фільтра не дорівнює Start або рік не дорінвює ''
  // то в запит підставляємо рік вибраний у формі
  formSearch.year =
    filterItem.yearForm.value !== 'start' || year !== ''
      ? `&primary_release_year=${filterItem.yearForm.value}`
      : '';
  
// ✅ якщо значення фільтра не дорівнює '' та не дорівнює start
// то в запит підставляємо значення вибране у формі
  formSearch.genre =
    genre !== '' && filterItem.genreForm.value !== 'start'
      ? `&with_genres=${filterItem.genreForm.value}`
      : '';
  // console.log(formSearch.genre);
  
  formSearch.query = `&query=${query}`;
  // console.log(query);
  // formSearch.page = page !== 0 || page !== '' ? `&page=${page}` : '';

  if (query === '') {
    formSearch.queryFetch = '';
    // console.log(formSearch);
  }
  if (query !== '' && genre === '') {
    formSearch.discover = 'search';
  }
  if (query === '' && genre !== '') {
    formSearch.discover = 'discover';
  }
  if (query === '' && year !== '') {
    formSearch.discover = 'discover';
  }
  const url = `${BASE_URL}${formSearch.discover}/movie?api_key=${MOVIEDB_KEY}&sort_by=popularity.desc${formSearch.genre}${formSearch.year}&include_adult=false&page=${pageNumber}`
   // Перевірка рядка запиту
  // console.log(url);

  // Запит
  const fetchCard = await axios.get(url);
  const { total_pages, page, results } = fetchCard.data;
  // Записуємо результат запиту у localstorage
  // storage.save('resultFilterItems', fetchCard.data.results)
  storage.save('films', results)
//  Записуємо загальну кількість результатів
  storage.save('totalItems', total_pages);
// Записуємо кількість за один запит
  storage.save('itemsPerPage', results.length);

  // Пагінація
  if (total_pages > 1) {
        pagination.totalPages = total_pages;
        pagination.page = page;
        pagination.fetch = page =>
          getSearchForm(formSearch.genre, formSearch.year, page);
        pagination.renderMarkup();
  }
  
  return fetchCard.data;
}


//Створення і рендер розмітки в select YEAR ___________________
function createSelectOptions() {
  let arrayYear = [];
  const date = new Date();

  for (let i = date.getFullYear(); i >= 1950; i -= 1) {
    arrayYear.push(
      `<option class = 'filter__form-years' value="${i}">${i}</option>`
    );
  }
  const elements = arrayYear.join('');
  filterItem.yearForm.insertAdjacentHTML('beforeend', elements);
};


// Скидання фільтру по кнопці reset
function onResetSearch(evt) {
  evt.preventDefault();
  pagination.resetPage();
  filterItem.genreForm.options.selectedIndex = 0;
  filterItem.yearForm.options.selectedIndex = 0;
  formSearch.genre = '';
  formSearch.year = '';
  formSearch.page = 1;
  refs.filmListRef.innerHTML = '';
  renderMarkupTrending()
}
createSelectOptions();

// Пагінація _________________________________________


export function onChangePageOfFilterClick(e) {
  if (e.target.nodeName === 'UL') {
    return;
  }
  if (e.target.className === 'btn__next') {
    pagination.incrementPage();
  }
  if (e.target.className === 'btn__prev') {
    pagination.decrementPage();
  }
  if (e.target.className === 'dots') {
    return;
  }
  if (e.target.className === 'num') {
    pagination.page = Number(e.target.textContent);
  }
  
  
  pagination
    .fetch(pagination.page)
    .then(({ results }) => {
      // console.log(results);
      // console.log(pagination.fetch);
      const markup = results.map(createCardMarkup).join('');
      storage.save(FILMS, results);
      refs.filmListRef.innerHTML = markup;
    })
    .catch(error => console.log(error));

  pagination.renderMarkup();
}
