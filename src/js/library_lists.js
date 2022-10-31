import { WACHED_KEY, QUEUE_KEY } from './add_to_list'
import storage from './locale-storage-methods';
import { createCardMarkup } from './card_markup';
import { FILMS } from './render_trending';

const refs = {
 watchedBtn: document.querySelector('.btn__watched'),
 queueBtn: document.querySelector('.btn__queue'),
 filmListRef:document.querySelector('.card-list')

}
// слухач подій на кнопку
 refs.watchedBtn.addEventListener('click', event => onWachedLibBtnClick(event))
 refs.queueBtn.addEventListener('click', event => onQueueLibBtnClick(event))

 // Функція рендерить фільми із localstorage watchedVideoKey і перезаписує films
export function onWachedLibBtnClick(event) {
 // console.log(event.target);

 let storageArray = [];

 const storageData = storage.load(WACHED_KEY);
 // якщо в localstorage є дані, то записуємо їх в масив
 if (storageData) {
  storageArray = storageData;
  // console.log(storageArray);

// Перезаписуємо films щоб модалка відкривалась
  storage.save(FILMS, storageArray);

// Рендеримо розмітку
  const markup = storageArray.map(createCardMarkup).join('');
       refs.filmListRef.innerHTML = '';
  refs.filmListRef.innerHTML = markup;
  
 } else { console.log('wached storage is empty');
 };
};

 // Функція рендерить фільми із localstorage queueVideoKey і перезаписує films
export function onQueueLibBtnClick(event) {
 // console.log(event.target);

 let storageArray = [];

 const storageData = storage.load(QUEUE_KEY);
 // якщо в localstorage є дані, то записуємо їх в масив
 if (storageData) {
  storageArray = storageData;
  // console.log(storageArray);

// Перезаписуємо films щоб модалка відкривалась
  storage.save(FILMS, storageArray);

// Рендеримо розмітку
  const markup = storageArray.map(createCardMarkup).join('');
       refs.filmListRef.innerHTML = '';
  refs.filmListRef.innerHTML = markup;
  
 } else { console.log('wached storage is empty');
 };
};