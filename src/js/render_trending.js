import { createCardMarkup } from './card_markup';
import {QueryHandler} from './query_handler';

const queryHandler = new QueryHandler();

const filmListRef = document.querySelector(".card-list");
export function renderMarkupTrending(){
    queryHandler.fetchQueryResultsForTrending()
    .then((data) => {
       const markup = data.map(createCardMarkup).join("");
       filmListRef.insertAdjacentHTML("beforeend", markup);
    })
    .catch(error => console.log(error));
}