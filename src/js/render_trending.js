
import { createCardMarkup } from './card_markup';
import {QueryHandler} from './query_handler';
import { saveGenres } from './genres_storage';
import methodsStorage from './locale-storage-methods';
export let genresStorage = [];

export const FILMS = "films";

const queryHandler = new QueryHandler();
const filmListRef = document.querySelector(".card-list");
export function renderMarkupTrending(){
   return queryHandler.fetchQueryResultsForTrending()
    .then((data) => {
      methodsStorage.save(FILMS, data);
      saveGenres();
      genresStorage = saveGenres();
       const markup = data.map(createCardMarkup).join("");
       filmListRef.insertAdjacentHTML("beforeend", markup);
    })
    .catch(error => console.log(error));
}