// Імпорти _________________________________________________________
import storage from "./localestorage-metods";
import {WACHED_KEY} from "./to_localestorage"
// Дістаємо об'єкти зі сторінки _________________________________________________________
const refs = {
 watchedLiberaryBtn:document.querySelector('.btn__watched'),
 queueLiberaryBtn:document.querySelector('.btn__queue'),
 closeModalBtn: document.querySelector('.film-card-close'),
//  ❌Потрібен клас js-container або js-gallary
  galleryList: document.querySelector('.hero'),
 
  
}

// console.log(refs.watchedLiberaryBtn);
// console.log(refs.queueLiberaryBtn);
// Змінні ___________________________

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'



// Рендер розмітки _________________________________________________________
// При переході в кабінет зробиби рендер  wachedVideo
resetContent();


// ✅ кнопка ESC модалки
// При натиснення на кнопку закриття модалки зробити рендер wachedVideo
refs.closeModalBtn.addEventListener('click', event => {
  resetContent();
})

function resetContent() {
  // Спершу потрібно видалити розмітку
  refs.galleryList.innerHTML = '';
// console.log('remove all from page');
const savedData = storage.load(WACHED_KEY)
// Якщо об'єкти є то відрендерити
  if (savedData) {
  // console.log(savedData);
  // Рендер
  renderGallery(savedData);
  // console.log('render');
}
}





function createMurkup({ original_title,poster_path,overview,backdrop_path
 }) {
 // console.log(webformatURL);


 // Ця розмітка тестова, ❌тут потрібна розмітка карточки
 return `<div class="gallery-item">
 <p class="video-title">${original_title}</p>
  <img class="gallery__image"
  src="${IMAGE_BASE_URL}/w200${poster_path}" 
  alt="" loading="lazy" />
    <p class="info-item info-item__comment">description:<br>${overview}</p>
  </div>
</div>`
  };



//  -------------------------------------
function renderGallery(data) {
 // console.log(data);
 const markup = data.map(createMurkup).join('');
 refs.galleryList.insertAdjacentHTML('beforeend', markup);
 // console.log(markup);
};
