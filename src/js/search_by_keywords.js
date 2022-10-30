import { QueryHandler } from './query_handler';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createCardMarkup } from './card_markup';
import localStorageMethod from './locale-storage-methods';
const queryHandler = new QueryHandler();

// const formRef = document.querySelector('#search-form');
const filmListRef = document.querySelector('.card-list');

// formRef.addEventListener('submit', handleSubmit);
Notify.init({
  timeout: 1500,
  position: 'center-top',
  backOverlay: false,
});

const FILMS = 'films';

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

  queryHandler.query = valueSearchQuery;
  try {
    const { results, total_results } =
      await queryHandler.fetchQueryResultsForMovieSearch();

    if (results.length === 0) {
      return Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );
    }
    queryHandler.resetPage();
    filmListRef.innerHTML = '';
    Notify.success(`Hooray! We found ${total_results} movie!`);
    localStorageMethod.save(FILMS, results);
    const markup = results.map(createCardMarkup).join('');
    filmListRef.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error);
  }
}
