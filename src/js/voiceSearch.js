import { refs } from './refs';
import localStorageMethod from './locale-storage-methods';
import { FILMS, LAST_REQUEST } from './localStorageKeys';
// import { queryHandler, spinner } from "./search_by_keywords";
import { QueryHandler } from './query_handler';
const queryHandlerVoice = new QueryHandler();

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined
if (SpeechRecognition) {
  console.log('Your Browser supports speech Recognition');

  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.lang = 'en-US';

  const micBtn = document.querySelector('.search-btn__mic');
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener('click', micBtnClick);
  function micBtnClick() {
    console.log('yes');
    if (micIcon.classList.contains('mic-stop')) {
      // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    } else {
      recognition.stop();
    }
  }

  recognition.addEventListener('start', startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove('mic-stop');
    micIcon.classList.add('mic-rec');
    refs.info.classList.add('search-form__info--hover');
    refs.searchFormInput.focus();
    console.log('Voice activated, SPEAK');
  }

  recognition.addEventListener('end', endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove('mic-rec');
    micIcon.classList.add('mic-stop');
    refs.info.classList.remove('search-form__info--hover');
    refs.searchFormInput.focus();
    console.log('Speech recognition service disconnected');
  }

  recognition.addEventListener('result', resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(e) {
    const { searchFormInput } = refs;

    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;

    if (transcript.toLowerCase().trim() === 'stop') {
      recognition.stop();
    } else if (!searchFormInput.value) {
      searchFormInput.value = transcript;
    } else {
      if (transcript.toLowerCase().trim() === 'search') {
        console.log('search');
        onSearch();
      } else if (transcript.toLowerCase().trim() === 'reset') {
        searchFormInput.value = '';
      } else {
        searchFormInput.value = transcript;
      }
    }
  }
  refs.info.textContent = 'Voice Commands: "stop", "reset", "search"';
} else {
  console.log('Your Browser does not support speech Recognition');
  refs.info.textContent = 'Your Browser does not support Speech Recognition';
}

async function onSearch() {
  const valueSearchQuery = refs.searchFormInput.value.trim().toLowerCase();

  queryHandlerVoice.query = valueSearchQuery;

  try {
    const { results, total_results, page, total_pages } =
      await queryHandlerVoice.fetchQueryResultsForMovieSearch();

    if (!results.length) {
      queryHandlerVoice.query = localStorageMethod.load(LAST_REQUEST);
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
        queryHandlerVoice.fetchQueryResultsForMovieSearch(page);

      pagination.renderMarkup();
    }
    if (!results.length) {
      Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );
      return;
    }

    Notify.success(`Hooray! We found ${total_results} movie!`);

    localStorageMethod.remove(FILMS);
    localStorageMethod.save(FILMS, results);

    const markup = results.map(createCardMarkup).join('');
    refs.filmListRef.innerHTML = markup;
  } catch (error) {
    console.log(error);
  }
}
