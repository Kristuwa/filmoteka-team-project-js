import { createCardMarkup } from './card_markup';
import { QueryHandler } from './query_handler';
import { Pagination } from './pagination';
import methodsStorage from './locale-storage-methods';
import { FILMS } from './localStorageKeys';
import { refs } from './refs';

const queryHandler = new QueryHandler();
export const pagination = new Pagination();

export function renderMarkupTrending() {
  return queryHandler
    .fetchQueryResultsForTrending()
    .then(data => {
      const { page, total_pages, results } = data;
      methodsStorage.save(FILMS, results);
      const markup = results.map(createCardMarkup).join('');
      refs.filmListRef.innerHTML = markup;

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

refs.pagination.addEventListener('click', onChangePageClick);

export function onChangePageClick(e) {
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
      // console.log(pagination.fetch);
      const markup = results.map(createCardMarkup).join('');
      methodsStorage.save(FILMS, results);
      refs.filmListRef.innerHTML = markup;
    })
    .catch(error => console.log(error));

  pagination.renderMarkup();
}
