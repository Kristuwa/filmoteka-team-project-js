import { QueryHandler } from './query_handler';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createCardMarkup } from './card_markup';
import localStorageMethod from './locale-storage-methods';
import Spinner from './spinner';
import { pagination } from './render_trending';
import localStorageMethod from './locale-storage-methods';
import { FILMS, LAST_REQUEST } from './localStorageKeys';
import { refs } from './refs';

const queryHandler = new QueryHandler();
const spinner = new Spinner({
  selector: '[data-action="load-spinner"]',
});

Notify.init({
  timeout: 1500,
  position: 'center-top',
  backOverlay: false,
  opacity: 0.8,
  borderRadius: '25px',
});

export async function handleSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { searchQuery },
  } = evt.target;
  const valueSearchQuery = searchQuery.value.trim().toLowerCase();
  if (!valueSearchQuery) {
    Notify.failure('Enter the name of the movie!');
    return;
  }

  spinner.disable();
  queryHandler.query = valueSearchQuery;
  try {
    const { results, total_results, page, total_pages } =
      await queryHandler.fetchQueryResultsForMovieSearch();

    if (!results.length) {
      queryHandler.query = localStorageMethod.load(LAST_REQUEST);
      return Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );
    }

    localStorageMethod.save(LAST_REQUEST, valueSearchQuery);
    pagination.removeMarkup();
    if (total_pages > 1) {
      pagination.totalPages = total_pages;
      pagination.page = page;
      pagination.fetch = page =>
        queryHandler.fetchQueryResultsForMovieSearch(page);

      pagination.renderMarkup();
    }
    if (!results.length) {
      Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );
      spinner.enable();
      return;
    }

    Notify.success(`Hooray! We found ${total_results} movie!`);

    localStorageMethod.remove(FILMS);
    localStorageMethod.save(FILMS, results);

    const markup = results.map(createCardMarkup).join('');
    refs.filmListRef.innerHTML = markup;
  } catch (error) {
    console.log(error);
  } finally {
    spinner.enable();
  }
}
