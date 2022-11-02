import axios from 'axios';
import { MOVIEDB_KEY } from './query_handler';
import storage from './locale-storage-methods';
import { createCardMarkup } from './card_markup';
import { refs } from './refs';
import { filterItem } from './refs';
import { renderMarkupTrending } from './render_trending'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Pagination } from './pagination';


const BASE_URL = 'https://api.themoviedb.org/3/'

// Слухачі подій
filterItem.genreForm.addEventListener('input', eventGenre);
filterItem.yearForm.addEventListener('input', eventYear);
filterItem.resetButton.addEventListener('click', onResetSearch);


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

  if (evt) {
    formSearch.genre = evt.target.value;
    // console.log('genre id:', evt.target.value);
    formSearch.page = 1;

    await getSearchForm(formSearch.genre, formSearch.year, formSearch.page)
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

  // якщо евент не пустий, то беремо значення з форми
  if (evt) {
    formSearch.year = Number(evt.target.value);
    formSearch.page = 1;

    await getSearchForm(formSearch.genre, formSearch.year, formSearch.page)
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
  page = '',
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
  const url = `${BASE_URL}${formSearch.discover}/movie?api_key=${MOVIEDB_KEY}&sort_by=popularity.desc${formSearch.genre}${formSearch.year}&include_adult=false&page=${page}`
   // Перевірка рядка запиту
  // console.log(url);

  // Запит
  const fetchCard = await axios.get(url);
  // Записуємо результат запиту у localstorage
  storage.save('resultFilterItems', fetchCard.data.results)
//  Записуємо загальну кількість результатів
  storage.save('totalItems', fetchCard.data.total_pages);
// Записуємо кількість за один запит
  storage.save('itemsPerPage', fetchCard.data.results.length);
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

  filterItem.genreForm.options.selectedIndex = 0;
  filterItem.yearForm.options.selectedIndex = 0;
  formSearch.genre = '';
  formSearch.year = '';
  formSearch.page = 1;
  refs.filmListRef.innerHTML = '';
  renderMarkupTrending()
}
createSelectOptions();

