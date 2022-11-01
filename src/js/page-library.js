import './userAuth/firebase-auth-import';
import './active_button';
import { saveGenres } from './genres_storage';
import './add_to_list';
import './library_lists';
import './modal-film';
import { toggleModal, toggleCard } from './modal-team.js';
import './userAuth/firebase-library';
saveGenres();
import { onWachedLibBtnClick } from './library_lists';
import { refs } from './refs';
import { onChangePageClick } from './render_trending';
import { onPlayVideo } from './play_trailer_btn';
import { openModalTrailer, closeModalTrailer } from './play_trailer_btn';
import './day-night-library';

refs.pagination.removeEventListener('click', onChangePageClick);
onWachedLibBtnClick();
