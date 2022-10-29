import './userAuth/firebase-auth-import';
import Spinner from './spinner';

import { renderMarkupTrending } from './render_trending.js';

// Экземпляр класса Spinner имеет 2 метода:
// 1. spinner.enable() - выключает спинер
// 2. spinner.disable() - включает спинер
const spinner = new Spinner({
  selector: '[data-action="load-spinner"]',
});
spinner.enable(); // сейчас спинер выключен

renderMarkupTrending();
