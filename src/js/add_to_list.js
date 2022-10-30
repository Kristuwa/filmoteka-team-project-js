// Імпорти _________________________________________________________
import storage from './locale-storage-methods';
// import { FILMS } from './render_trending';
import { filmData, id } from './modal-film';
export const WACHED_KEY = 'watchedVideoKey';
export const QUEUE_KEY = 'queueVideoKey';

const refs = {
  modalFilmList: document.querySelector('.card-list'),
  toWatchBtn: document.querySelector('.film-card-addToWatched'),
  toQueueBtn: document.querySelector('.film-card-addToQueue'),
};

export function onButtonAddToListWatched(e) {
  let storageArray = [];
  const btn = refs.toWatchBtn;
  const storageData = storage.load(WACHED_KEY);
  if (storageData) {
    storageArray = storageData;
  }

  if (btn.textContent === 'remove from watched') {
    console.log(id);
    storage.save(
      WACHED_KEY,
      storageArray.filter(item => Number(item.id) !== Number(id))
    );
    btn.textContent = 'add to watched';
    return;
  }
  console.log(filmData[0]);
  storageArray.push(filmData[0]);
  storage.save(WACHED_KEY, storageArray);
  btn.textContent = 'remove from watched';
}

export function onButtonAddToListQueue(e) {
  let storageArray = [];
  const btn = refs.toQueueBtn;
  const storageData = storage.load(QUEUE_KEY);
  if (storageData) {
    storageArray = storageData;
  }

  if (btn.textContent === 'remove from queue') {
    console.log(id);
    storage.save(
      QUEUE_KEY,
      storageArray.filter(item => Number(item.id) !== Number(id))
    );
    btn.textContent = 'add to queue';
    return;
  }
  console.log(filmData[0]);
  storageArray.push(filmData[0]);
  storage.save(QUEUE_KEY, storageArray);
  btn.textContent = 'remove from queue';
}
