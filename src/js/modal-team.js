const refs = {
  openModalBtn: document.querySelector('.footer-item'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
  listCard: document.querySelector('.team-list'),
  card: document.querySelector('.card-team'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('keydown', toggleModal);

export function toggleModal() {
  refs.modal.classList.toggle('is-hidden-team');
  refs.body.classList.toggle('no-scroll');
}
