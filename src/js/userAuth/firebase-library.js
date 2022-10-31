import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { refs } from './firebase-refs';
import User from './firebase-user';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  if (!user) {
    refs.userLibrary.addEventListener(
      'click',
      Notify.failure('Sorry, Your are not allowed to perform this action.')
    );
  }
  if (!user) {
    refs.watchedBtn.addEventListener(
      'click',
      Notify.failure('hhrthtrthrhtrht.')
    );
  }
});
