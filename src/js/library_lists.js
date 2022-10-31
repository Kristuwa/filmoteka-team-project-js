import { WACHED_KEY, QUEUE_KEY } from './add_to_list'
import storage from './locale-storage-methods';



const refs = {
 watchedBtn: document.querySelector('.btn__watched'),
 queueBtn: document.querySelector('.btn__queue')
}
// слухач подій на кнопку
 refs.watchedBtn.addEventListener('click', event => onWachedLibBtnClick(event))

 
export function onWachedLibBtnClick(event) {
 console.log(event.target);

 let storageArray = [];

 const storageData = storage.load(WACHED_KEY);
 // якщо в localstorage є дані, то записуємо їх в масив
 if (storageData) {
  storageArray = storageData;
  console.log(storageArray);
  const { page, total_pages, results } = storageData;
   
       const markup = results.map(createCardMarkup).join('');
       filmListRef.innerHTML = markup;

       // if (total_pages > 1) {
       //   pagination.totalPages = total_pages;
       //   pagination.page = page;
       //   pagination.fetch = page =>
       //     queryHandler.fetchQueryResultsForTrending(page);
       //   pagination.renderMarkup();
       // }
 } else { console.log('wached storage is empty');
}
}


// export function onQueueLibBtnClick() {
 
// }