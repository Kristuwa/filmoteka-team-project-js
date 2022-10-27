import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  if (user) {
    refs.userLibrary.classList.remove('hidden-tab');
  } else {
  }
});
