// import { BASE_URL, KEY, API_URL } from './url';
import axios from 'axios';
import { MOVIEDB_KEY } from './query_handler';
import storage from './locale-storage-methods';
import { createCardMarkup } from './card_markup';
import { refs } from './refs';
import { Pagination } from './pagination';

// import { getAPI } from './popularRender';
// import { generateContent } from './createListItem';
// import { Loading, Notify } from 'notiflix';
// import Pagination from 'tui-pagination';
// import { poginationFilter } from './pagination';

const BASE_URL = 'https://api.themoviedb.org/3/'

// ✅ Елементи форми
// 🟨 Перенести у рефи
export const filterItem = {
  filterForm: document.querySelector('#filter-form'),
  genreForm: document.querySelector('#genreForm'),
  yearForm: document.querySelector('#yearForm'),

  resetButton: document.querySelector('#button__reset'),
  testButton: document.querySelector('#button__test'),
};



//✅ Змінні для запиту на бекенд
let formSearch = {
  year: '',
  genre: '',
  query: '',
  discover: `trending`,
  page: '',
};




//Пошук рендер фильму по жанру
async function eventGenre(evt) {
  evt.preventDefault();

  if (evt) {
    formSearch.genre = evt.target.value;
    console.log('genre id:', evt.target.value);
    formSearch.page = 1;

    await getSearchForm(formSearch.genre, formSearch.year, formSearch.page)
      .then(data => {


        if (data.results.length !== 0) {
          refs.filmListRef.innerHTML = '';
          console.log('видаляємо фільми зі сторінки');
          const markup = data.results.map(createCardMarkup).join('');
          refs.filmListRef.innerHTML = markup;
          console.log('create markup');
        } else {
         
          Notify.failure(`Nothing was found for your request`);
          // refs.list.innerHTML = ` <img src="${'https://cdn.dribbble.com/users/4266416/screenshots/8269080/media/69de53b0834d3b0c493f21d4ce773dfd.png'}"
          // alt="no movies found" class="no__found">`;
        }
      })
      .catch(error => console.log(error))
      // .finally(() => Loading.remove(2000));
    // poginationFilter(formSearch.genre, formSearch.year);
    // Notify.success(`We found ${JSON.parse(localStorage.getItem('firterItems'))} movies.`);
  }
}

// Запит на бекенд по жанру або року
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
  console.log(query);
  // formSearch.page = page !== 0 || page !== '' ? `&page=${page}` : '';

  if (query === '') {
    // formSearch.queryFetch = '';
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

// filterItem.testButton.addEventListener('click', getSearchForm)

filterItem.genreForm.addEventListener('input', eventGenre);
// filterItem.yearForm.addEventListener('input', eventYear);

// filterItem.resetButton.addEventListener('click', onResetSearch);


// Пагінація __________________________________________________
// export const pagination = new Pagination();
// refs.pagination.addEventListener('click', onChangePageClick);

// export function onChangePageClick(e) {
//   if (e.target.nodeName === 'UL') {
//     return;
//   }
//   if (e.target.className === 'btn__next') {
//     pagination.incrementPage();
//   }
//   if (e.target.className === 'btn__prev') {
//     pagination.decrementPage();
//   }
//   if (e.target.className === 'dots') {
//     return;
//   }
//   if (e.target.className === 'num') {
//     pagination.page = Number(e.target.textContent);
//   }

//   pagination
//     .fetch(pagination.page)
//     .then(({ results }) => {
//       // console.log(pagination.fetch);
//       const markup = results.map(createCardMarkup).join('');
//       methodsStorage.save(FILMS, results);
//       refs.filmListRef.innerHTML = markup;
//     })
//     .catch(error => console.log(error));

//   pagination.renderMarkup();
// }







// //Поиск и рендер фильма по году
// async function eventYear(evt) {
//   evt.preventDefault();
//   // localStorage.setItem("genre", formSearch.genre? formSearch.genre:" ");
//   //     localStorage.setItem("year", formSearch.year? formSearch.year: " ");
//   if (evt) {
//     formSearch.year = Number(evt.target.value);
//     formSearch.page = 1;

//     await getSearchForm(formSearch.genre, formSearch.year, formSearch.page)
//       .then(data => {
//         Loading.custom('Loading...', {
//           customSvgCode:
//             '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
//           backgroundColor: 'rgba(0, 0, 0, 0.8)',
//         });

//         if (data.results.length !== 0) {
//           renderFiltrMarkup(data.results);
//         } else {
//           Loading.custom('Loading...', {
//             customSvgCode:
//               '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
//             backgroundColor: 'rgba(0, 0, 0, 0.8)',
//           });
//           Notify.failure(`Nothing was found for your request`);
//           refs.list.innerHTML = ` <img src="${'https://cdn.dribbble.com/users/4266416/screenshots/8269080/media/69de53b0834d3b0c493f21d4ce773dfd.png'}"
//           alt="no movies found" class="no__found">`;
//         }
//       })
//       .catch(error => console.log(error))
//       .finally(() => Loading.remove(2000));
//     console.log(localStorage.getItem('firterItems'));
//     poginationFilter(formSearch.genre, formSearch.year);
//     Notify.success(`We found ${JSON.parse(localStorage.getItem('firterItems'))} movies.`);
//   }
// }

// //рендер разметки отфильтрованных фильмов
// export function renderFiltrMarkup(array) {
//   const result = generateContent(array);
//   refs.list.innerHTML = result;
// }

// //Сброс настроек поиска
// function onResetSearch(evt) {
//   evt.preventDefault();

//   filterItem.genreForm.options.selectedIndex = 0;
//   filterItem.yearForm.options.selectedIndex = 0;
//   formSearch.genre = '';
//   formSearch.year = '';
//   formSearch.page = 1;
//   refs.list.innerHTML = '';
//   getAPI(API_URL);
// }

//Coздание и рендер разметки в select YEAR
(function createSelectOptions() {
  let arrayYear = [];
  const date = new Date();

  for (let i = date.getFullYear(); i >= 1950; i -= 1) {
    arrayYear.push(
      `<option class = 'filter__form-years' value="${i}">${i}</option>`
    );
  }
  const elements = arrayYear.join('');
  filterItem.yearForm.insertAdjacentHTML('beforeend', elements);
})();
