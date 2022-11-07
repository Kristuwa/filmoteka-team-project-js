import { refs } from './refs';

function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    removeModal();
  }
}
refs.openModalBtn.addEventListener('click', addModal);

export function addModal() {
  refs.modal.classList.remove('is-hidden-team');
  refs.body.classList.add('no-scroll');
  refs.closeModalBtn.addEventListener('click', removeModal);
  document.addEventListener('keydown', onEscBtnPress);
}
export function removeModal() {
  refs.modal.classList.add('is-hidden-team');
  refs.body.classList.remove('no-scroll');
  refs.closeModalBtn.removeEventListener('click', removeModal);
  document.removeEventListener('keydown', onEscBtnPress);
}
