const refs = {
  openModalBtn: document.querySelector('.footer-item'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
  card: document.querySelector('.card'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.card.addEventListener('click', toggleCard);

export function toggleModal() {
  refs.modal.classList.toggle('is-hidden-team');
  refs.body.classList.toggle('no-scroll');
}
export function toggleCard() {
  refs.card.classList.toggle('is-flipped');
}
