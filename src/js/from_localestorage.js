// Імпорти _________________________________________________________
import storage from "./localestorage";
import {WACHED_KEY} from "./to_localestorage"
// Дістаємо об'єкти зі сторінки _________________________________________________________
const refs = {
 closeModalBtn: document.querySelector('.close-modal-btn'),
 galleryList: document.querySelector('.gallery'),
}

// Змінні ___________________________
const savedData = storage.load(WACHED_KEY)
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
// Рендер розмітки _________________________________________________________
// При переході в кабінет зробиби рендер  wachedVideo
// Спершу потрібно видалити розмітку

refs.galleryList.innerHTML = '';
console.log('remove all from page');
// Потім відрендерити

renderGallery(savedData);
console.log('render');

// ❌ Ще не працює
// При натиснення на кнопку закриття модалки зробити рендер wachedVideo
refs.closeModalBtn.addEventListener('click', event => {
 
 console.log(savedData);
 // Спершу потрібно видалити розмітку
  refs.galleryList.innerHTML = '';
 console.log('remove all from page');
// Потім відрендерити
 renderGallery(savedData);
})


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
