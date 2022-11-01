export default class Spinner {
  constructor({ selector }) {
    this.refs = this.getRefs(selector);
  }

  getRefs(selector) {
    const refs = {};
    refs.backdrop = document.querySelector(selector);
    refs.spinner = refs.backdrop.querySelector('.spinner-grow');
    return refs;
  }

  enable() {
    this.refs.backdrop.classList.add('is-hidden');
  }

  disable() {
    this.refs.backdrop.classList.remove('is-hidden');
  }
}
