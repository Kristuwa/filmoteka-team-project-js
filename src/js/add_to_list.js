// Імпорти _________________________________________________________
import storage from "./locale-storage-methods";
import { FILMS } from './render_trending';
// import {filmData} from './modal-film'
// import {id} from './modal-film'

// Змінні ___________________________
let watchVideoList = [];
let queueVideoList = [];
let id = 0;
export const WACHED_KEY = "watchedVideoKey"
export const QUEUE_KEY = "queueVideoKey"

//🔽 Дістаємо об'єкти зі сторінки _________________________________________________________
const refs = {
  modalFilmList: document.querySelector('.card-list'),
  // Кнопки модального вікна
  toWatchBtn: document.querySelector('.film-card-addToWatched'),
  toQueueBtn: document.querySelector('.film-card-addToQueue'),
}

//Вешаем события на галерею для открытия модального окна
refs.modalFilmList.addEventListener('click', openModal);

function openModal(event) {
  event.preventDefault();
id = Number(event.target.closest('li').dataset.id)
  // console.log(id);
    //Шукаємо фільм по id в localestorage
  const filmsData = storage.load(FILMS);
  const filmData = filmsData.filter(film => film.id === id);
  // console.log(filmData);


  // ⏺Кнопка add to watch
 refs.toWatchBtn.addEventListener('click', event => {
  // console.log(refs.toWatchBtn.dataset.name);
  const buttonName = refs.toWatchBtn.dataset.name;
  // console.log('press button add to watch');
  onButtonAddToList(WACHED_KEY, watchVideoList, filmData[0], event, buttonName);

 });

 // ⏺Кнопка add to ueue
refs.toQueueBtn.addEventListener('click', event => {
  const buttonName = refs.toQueueBtn.dataset.name;
  // console.log('press button add to queue');
 onButtonAddToList(QUEUE_KEY,queueVideoList, filmData[0], event, buttonName);
 });

}
// Функція додає відео у lacalestorage або видаляє якщо відео вже є
export function onButtonAddToList(storageKey, videoList, data, event, buttonName) {
 const savedData = storage.load(storageKey)

// перевіряємо чи є щось у localestorage
 if (savedData) {
  // записуємо у пустий масив все з localestorage
  videoList = savedData;

  // Коли відео додане у localstorage повторний клік по кнопці повинен видалити фільм із localestorage
  for (let i = 0; i < savedData.length; i += 1) {

   // якщо поточне відео id співпадає із тим що є в масиві,то з масиву потрібно видалити 
   if (savedData[i].id === id) {

 // змінюємо напис на кнопці
    changeTextContent(event, `Add to ${buttonName}`)
    console.log(`Remove item from ${buttonName}`);
    // видалення об'єкта
    savedData.splice(i, 1);

    // оновлення localstorage
    storage.save(storageKey, savedData)
   
    return
   };
  };
 };
 // додаємо у масив новий фільм
videoList.push(data);
// записуємо масивз новим фільмом у localestorage 
storage.save(storageKey, videoList);
    // змінюємо напис на кнопці
changeTextContent(event,`Remove from ${buttonName}`)
console.log(`Add item to ${buttonName}`);
 };

// // ⏺Кнопка add to watch
//  refs.toWatchBtn.addEventListener('click', event => {
//   // console.log(refs.toWatchBtn.dataset.name);
//   const buttonName = refs.toWatchBtn.dataset.name;
//   // console.log('press button add to watch');
//   onButtonAddToList(WACHED_KEY, watchVideoList, filmData[0], event, buttonName);

//  });

//  // ⏺Кнопка add to ueue
// refs.toQueueBtn.addEventListener('click', event => {
//   const buttonName = refs.toQueueBtn.dataset.name;
//   // console.log('press button add to queue');
//  onButtonAddToList(QUEUE_KEY,queueVideoList, filmData[0], event, buttonName);
//  });




//🔁 Заміна text content у кнопки add to watch
function changeTextContent(event,buttonName) {
  if (event.target.nodeName !== 'BUTTON') {
   return;
  }
  event.target.textContent = `${buttonName}`
  // console.log(event.target);
}

