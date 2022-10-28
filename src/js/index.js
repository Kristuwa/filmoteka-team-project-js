import './userAuth/firebase-auth-import';

import { renderMarkupTrending } from './render_trending.js';
import { handleSubmit } from './search_by_keywords';

renderMarkupTrending();
const formRef = document.querySelector('#search-form');
formRef.addEventListener('submit', handleSubmit);
