// Імпорти _________________________________________________________
import storage from "./localestorage";

// Дістаємо об'єкти зі сторінки _________________________________________________________
refs = {
 // Кнопки модального вікна
 toWatchBtn: document.querySelector('.to-watch-btn'),
 toQueueBtn: document.querySelector('.to-queue-btn'),
 // themeBtn: document.querySelector('.theme-btn'),

 //Кнопки кабінету користувача 
 libraryListButtons: document.querySelector('.btn__list')
}

// Змінні ___________________________
let watchVideoList = [];
export const WACHED_KEY = "watchedVideoKey"
const QUEUE_KEY = "queueVideoKey"
const savedData = storage.load(WACHED_KEY)
const currentVideoId = 605;



// ❌цей блок лише для розробки, потім тут буде фільм із модалки
// Запит на бекенд _________________________________________________________
const userKey = '77f4196daae31eca36e03f9aa498784a';
const BASE_URL = 'https://api.themoviedb.org/3';

const urlFilmById = `${BASE_URL}/movie/${currentVideoId}?api_key=${userKey}`;
// const urlMostPopular = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${userKey}`
console.log('fetch this link:',urlFilmById);

fetch(urlFilmById).then(response => response.json()).then(data => {
 // console.log(data);



// Запис в localestorage _________________________________________________________

 // Коли кнопку toWatchBtn натиснули потрібно додати відео у locale storage
 // ✅Кнопка вже додає фільм у localestorage і видаляє якщо він там вже є
 
 refs.toWatchBtn.addEventListener('click', event => {
  console.log('press button add to watch');

  // перевіряємо чи є щось в localstorage
  const savedData = storage.load(WACHED_KEY)
  if (savedData) {
   // якщо є, то перевіряємо чи є там фільм з поточним id

   // Коли відео додане у localstorage повторний кліп по кнопці повинен видалити фільм із localestorage
   for (let i = 0; i < savedData.length; i += 1) {
    // якщо поточне відео id співпадає із тим що є в масиві, то з масиву потрібно видалити 
    if (savedData[i].id === currentVideoId) {
     // видалення об'єкта
     console.log('this video in localstorage', i);
     savedData.splice(i, 1);
     console.log(savedData);
     // оновлення localstorage
     storage.save(WACHED_KEY, savedData)
     return
    }
   }

   watchVideoList = savedData
   console.log(watchVideoList);
  };
  
  watchVideoList.push(data);
  // console.log(watchVideoList);
  storage.save(WACHED_KEY, watchVideoList)
 });

}).catch(error => console.log(error));



// ✅ Заміна класів is-active
refs.libraryListButtons.addEventListener('click',onButtonClick)
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