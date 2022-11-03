import './userAuth/firebase-auth-import';
import Spinner from './spinner';
import { saveGenres } from './genres_storage';
import { renderMarkupTrending } from './render_trending.js';
import './search_by_keywords';
import './voiceSearch'
import './add_to_list';
import './modal-film';

import { onPlayVideo } from './play_trailer_btn';
import { openModalTrailer, closeModalTrailer } from './play_trailer_btn';
import { toggleModal, toggleCard } from './modal-team.js';
saveGenres()
  .then(() => renderMarkupTrending())
  .catch(error => console.log(error));
// renderMarkupTrending();
import './day-night';

// Экземпляр класса Spinner имеет 2 метода:
// 1. spinner.enable() - выключает спинер
// 2. spinner.disable() - включает спинер
const spinner = new Spinner({
  selector: '[data-action="load-spinner"]',
});
spinner.enable(); // сейчас спинер выключен
// Filter
import './filter'