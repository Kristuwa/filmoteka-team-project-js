import './userAuth/firebase-auth-import';
import Spinner from './spinner';
import './acive_button';
import './add_to_list';
import './library_lists';

import { onModalOpenFilm } from './modal-film';
import { onBackdropClick } from './modal-film';
import { onEscBtnPress } from './modal-film';
import { modalFilmBtnClose } from './modal-film';
import { toggleModal, toggleCard } from './modal-team.js';
//оставила пока для Сашиной работы
renderMarkupTrending();
//********* */

const formRef = document.querySelector('#search-form');
formRef.addEventListener('submit', handleSubmit);
// Экземпляр класса Spinner имеет 2 метода:
// 1. spinner.enable() - выключает спинер
// 2. spinner.disable() - включает спинер
const spinner = new Spinner({
  selector: '[data-action="load-spinner"]',
});
spinner.enable(); // сейчас спинер выключен
