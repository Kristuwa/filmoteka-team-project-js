const refs = {
  openModalBtn: document.querySelector('.footer-item'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
  listCard: document.querySelector('.team-list'),
  card: document.querySelector('.card-team'),
};
function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    removeModal();
  }
}
refs.openModalBtn.addEventListener('click', addModal);
refs.closeModalBtn.addEventListener('click', removeModal);
document.addEventListener('keydown', onEscBtnPress);

export function removeModal() {
  refs.modal.classList.add('is-hidden-team');
  refs.body.classList.remove('no-scroll');
}
export function addModal() {
  refs.modal.classList.remove('is-hidden-team');
  refs.body.classList.add('no-scroll');
}
