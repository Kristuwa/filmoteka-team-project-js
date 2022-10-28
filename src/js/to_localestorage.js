// Імпорти _________________________________________________________
import storage from "./localestorage-metods";

// Дістаємо об'єкти зі сторінки _________________________________________________________
refs = {
 // Кнопки модального вікна
 toWatchBtn: document.querySelector('.film-card-addToWatched'),
 toQueueBtn: document.querySelector('.film-card-addToQueue'),
 //Кнопки кабінету користувача 
 libraryListButtons: document.querySelector('.btn__list')
}
// console.log(refs.toWatchBtn);
// console.log(refs.toQueueBtn);


// Змінні ___________________________
let watchVideoList = [];
let queueVideoList = [];
export const WACHED_KEY = "watchedVideoKey"
export const QUEUE_KEY = "queueVideoKey"
const currentVideoId = 550;


// ❌цей блок лише для розробки, потім тут буде фільм із модалки
// Запит на бекенд _________________________________________________________
const userKey = '77f4196daae31eca36e03f9aa498784a';
const BASE_URL = 'https://api.themoviedb.org/3';

const urlFilmById = `${BASE_URL}/movie/${currentVideoId}?api_key=${userKey}`;
// const urlMostPopular = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${userKey}`
console.log('fetch this link:',urlFilmById);

fetch(urlFilmById).then(response => response.json()).then(data => {
 // console.log(data);

// Коли нам прийшов запит від бекенду та відмалювались відео.
// Потрібно зробити делегування подій:
// Повісити слухача подій на контейнер і відловлювати клік на фільмі
// робимо клік на фільм -> присвоюємо його id в currentVideoId
// Відкривається модалка

 function onOpenModal() {

  
 //  const savedData = storage.load(storageKey)
 // if (savedData) {
 //  // якщо є, то перевіряємо чи є там фільм з поточним id
 //  // записуємо у пустий масив все з localestorage
 //  videoList = savedData;
 //  // Коли відео додане у localstorage повторний клік по кнопці повинен видалити фільм із localestorage
 //  for (let i = 0; i < savedData.length; i += 1) {

 //   // якщо поточне відео id співпадає із тим що є в масиві,
 //   // то з масиву потрібно видалити 
 //   if (savedData[i].id === currentVideoId) {
 //   // змінюємо напис на кнопці
 //        changeTextContent(event,'Add to watched')
    
 //    // видалення об'єкта
 //    // console.log('this video in localstorage', i);
 //    savedData.splice(i, 1);

 //    // console.log(savedData);

 //    // оновлення localstorage
 //    storage.save(storageKey, savedData)
 //    return
 //   };
 //  };
 //  };
  
 };
 
 
 // Функція додає відео у lacalestorage або видаляє якщо відео вже є
function onButtonAddToList(storageKey,videoList, event) {
 const savedData = storage.load(storageKey)
 console.log(savedData);
 // ❌ Потрібно винести цю перевірку на момент відкриття модалки
 if (savedData) {
  // якщо є, то перевіряємо чи є там фільм з поточним id
  // записуємо у пустий масив все з localestorage
  videoList = savedData;
  // Коли відео додане у localstorage повторний клік по кнопці повинен видалити фільм із localestorage
  for (let i = 0; i < savedData.length; i += 1) {

   // якщо поточне відео id співпадає із тим що є в масиві,
   // то з масиву потрібно видалити 
   if (savedData[i].id === currentVideoId) {
   // змінюємо напис на кнопці
        changeTextContent(event,'Add to watched')
    
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
 // console.log(watchVideoList);

 
  // записуємо масивз новим фільмом у localestorage 
 storage.save(storageKey, videoList);

  // змінюємо напис на кнопці
changeTextContent(event,'Remove from watched')

 };


// Запис в localestorage _________________________________________________________
// Коли кнопку toWatchBtn натиснули потрібно додати відео у locale storage
//  додає фільм у localestorage і видаляє якщо він там вже є
// ✅Кнопка add to watch
 
 refs.toWatchBtn.addEventListener('click', event => {
  // console.log(event);
  // console.log('press button add to watch');
  onButtonAddToList(WACHED_KEY, watchVideoList, event);

 });

 // ✅Кнопка add to ueue
 refs.toQueueBtn.addEventListener('click', event => {
  // console.log('press button add to queue');
 onButtonAddToList(QUEUE_KEY,queueVideoList);
 });


}).catch(error => console.log(error));



// ✅ Заміна класів is-active
refs.libraryListButtons.addEventListener('click', onButtonClick);

function onButtonClick(event) {
 if (event.target.nodeName !== 'BUTTON') {
  return;
 }
 // console.log(event.target);

const currentActiveBtn = refs.libraryListButtons.querySelector('.is-active')
 // console.log(currentActiveBtn);

 if (currentActiveBtn) {
   currentActiveBtn.classList.remove('is-active')
 // console.log('remove class is-active');
 }

 // додає клас на кнопку на яку клікнули
 event.target.classList.add('is-active')
 // console.log('add class is-active');
}

// Заміна text content у кнопки add to watch
function changeTextContent(event,buttonName) {
  if (event.target.nodeName !== 'BUTTON') {
   return;
  }
  event.target.textContent = `${buttonName}`
  // console.log(event.target);
}
