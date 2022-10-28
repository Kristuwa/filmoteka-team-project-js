
import { createCardMarkup } from './card_markup';
import {QueryHandler} from './query_handler';
import { saveGenres } from './genres_storage';
// import save from './locale-storage-methods';
export let genresStorage = [];

const save = (key, value) => {
   try {
     const serializedState = JSON.stringify(value);
     localStorage.setItem(key, serializedState);
   } catch (error) {
     console.error("Set state error: ", error.message);
   }
 };

export const FILMS = "films";

const queryHandler = new QueryHandler();
const filmListRef = document.querySelector(".card-list");
export function renderMarkupTrending(){
   return queryHandler.fetchQueryResultsForTrending()
    .then((data) => {
      save(FILMS, data);
      saveGenres();
      genresStorage = saveGenres();
       const markup = data.map(createCardMarkup).join("");
       filmListRef.insertAdjacentHTML("beforeend", markup);
    })
    .catch(error => console.log(error));
}