// Імпорти _________________________________________________________
import storage from './locale-storage-methods';
import { filmData, id } from './modal-film';
import { WATCHED_KEY, QUEUE_KEY } from './localStorageKeys';
import { auth } from './userAuth/firebase-storage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

export function onButtonAddToListWatched(e) {
  let storageArray = [];
  const btn = refs.toWatchBtn;
  const storageData = storage.load(WATCHED_KEY);

  if (auth.currentUser === null) {
    Notify.failure('Sorry, Your are not allowed to perform this action.');
    return;
  }

  if (storageData) {
    storageArray = storageData;
  }

  if (btn.textContent === 'remove from watched') {
    storage.save(
      WATCHED_KEY,
      storageArray.filter(item => Number(item.id) !== Number(id))
    );
    btn.textContent = 'add to watched';
    return;
  }

  storageArray.push(filmData[0]);
  storage.save(WATCHED_KEY, storageArray);
  btn.textContent = 'remove from watched';
}

export function onButtonAddToListQueue(e) {
  let storageArray = [];
  const btn = refs.toQueueBtn;
  const storageData = storage.load(QUEUE_KEY);
  if (auth.currentUser === null) {
    Notify.failure('Sorry, Your are not allowed to perform this action.');
    return;
  }
  if (storageData) {
    storageArray = storageData;
  }

  if (btn.textContent === 'remove from queue') {
    storage.save(
      QUEUE_KEY,
      storageArray.filter(item => Number(item.id) !== Number(id))
    );
    btn.textContent = 'add to queue';
    return;
  }

  storageArray.push(filmData[0]);
  storage.save(QUEUE_KEY, storageArray);
  btn.textContent = 'remove from queue';
}
