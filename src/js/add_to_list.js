// Імпорти _________________________________________________________
import storage from "./locale-storage-methods";
import { onModalOpenFilm } from './modal-film';
import {filmData} from './modal-film'

// //❌ Дістаємо об'єкти зі сторінки _________________________________________________________
// refs = {
//  // Кнопки модального вікна
//  toWatchBtn: document.querySelector('.film-card-addToWatched'),
//  toQueueBtn: document.querySelector('.film-card-addToQueue'),
//  //Кнопки кабінету користувача 
//  libraryListButtons: document.querySelector('.btn__list')
// }
// console.log(refs.toWatchBtn);
// console.log(refs.toQueueBtn);


// Змінні ___________________________
let watchVideoList = [];
let queueVideoList = [];
export const WACHED_KEY = "watchedVideoKey"
export const QUEUE_KEY = "queueVideoKey"
// ❌ потрібний активний id фільму 
const currentVideoId = 550;

// Функція додає відео у lacalestorage або видаляє якщо відео вже є
export function onButtonAddToList(storageKey, videoList, event, data) {
 console.log(event);
 console.log(storageKey);
 const savedData = storage.load(storageKey)
 console.log(savedData);
 console.log(data);
 
 if (savedData) {
  videoList = savedData;
  // якщо є, то перевіряємо чи є там фільм з поточним id
  // записуємо у пустий масив все з localestorage
  // Коли відео додане у localstorage повторний клік по кнопці повинен видалити фільм із localestorage
  for (let i = 0; i < savedData.length; i += 1) {

   // якщо поточне відео id співпадає із тим що є в масиві,
   // то з масиву потрібно видалити 
   if (savedData[i].id === currentVideoId) {
   // змінюємо напис на кнопці
        // changeTextContent(event,'Add to watched')

    // видалення об'єкта
    // console.log('this video in localstorage', i);
    savedData.splice(i, 1);

    // console.log(savedData);

    // оновлення localstorage
    storage.save(storageKey, savedData)
    return
   };
  };
 };
 // додаємо у масив новий фільм
videoList.push(data);
console.log(videoList);

  // записуємо масивз новим фільмом у localestorage 
 storage.save(storageKey, videoList);

  // змінюємо напис на кнопці
// changeTextContent(event,'Remove from watched')

 };


// Запис в localestorage _________________________________________________________
// // ✅Кнопка add to watch
// //  додає фільм у localestorage і видаляє якщо він там вже є

//  refs.toWatchBtn.addEventListener('click', event => {
//   // console.log(event);
//   // console.log('press button add to watch');
//   onButtonAddToList(WACHED_KEY, watchVideoList, event);

//  });

 // // ✅Кнопка add to ueue
 // //  додає фільм у localestorage і видаляє якщо він там вже є
 // refs.toQueueBtn.addEventListener('click', event => {
 //  // console.log('press button add to queue');
 // onButtonAddToList(QUEUE_KEY,queueVideoList);
 // });


// // Заміна text content у кнопки add to watch
// function changeTextContent(event,buttonName) {
//   if (event.target.nodeName !== 'BUTTON') {
//    return;
//   }
//   event.target.textContent = `${buttonName}`
//   // console.log(event.target);
// }


export function onAddToWatch(e) {
 //   const closeBtn = e.target.closest('.film-card-close');
 //   console.log(closeBtn);
 if (e.target.closest('.film-card-addToWatched')) {
  console.log('push button add to watched');
  console.log(filmData);

  // ✅Кнопка add to watch
  //  додає фільм у localestorage і видаляє якщо він там вже є
  onButtonAddToList(WACHED_KEY, watchVideoList, e, filmData);


 } else if (e.target.closest('.film-card-addToQueue')) {
    console.log('push button add to queue');

  onButtonAddToList(QUEUE_KEY, queueVideoList, e);
 }
}