import { createCardMarkup } from './card_markup';
import { QueryHandler } from './query_handler';
import { saveGenres } from './genres_storage';
import { Pagination, paginationRef } from './pagination';
import methodsStorage from './locale-storage-methods';

export let genresStorage = [];

export const FILMS = 'films';

const queryHandler = new QueryHandler();
export const pagination = new Pagination();

const filmListRef = document.querySelector('.card-list');

export function renderMarkupTrending() {
  return queryHandler
    .fetchQueryResultsForTrending()
    .then(data => {
      const { page, total_pages, results } = data;
      methodsStorage.save(FILMS, results);
      saveGenres();
      genresStorage = saveGenres();
      const markup = results.map(createCardMarkup).join('');
      filmListRef.innerHTML = markup;

      if (total_pages > 1) {
        pagination.totalPages = total_pages;
        pagination.page = page;
        pagination.fetch = page =>
          queryHandler.fetchQueryResultsForTrending(page);
        pagination.renderMarkup();
      }
    })
    .catch(error => console.log(error));
}

paginationRef.addEventListener('click', onChangePageClick);
function onChangePageClick(e) {
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
      console.log(pagination.fetch);
      const markup = results.map(createCardMarkup).join('');
      methodsStorage.save(FILMS, results);
      filmListRef.innerHTML = markup;
    })
    .catch(error => console.log(error));

  pagination.renderMarkup();
}
