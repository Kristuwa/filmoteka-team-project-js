document.querySelector('.themetoggle').addEventListener('click', event => {
  event.preventDefault();
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClassToHTML();
});

function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('.hero').classList.add('dark');
      document.querySelector('.themetoggle').classList.add('dark');
      document.querySelector('.material-icons').classList.add('dark');
      document.querySelector('header').classList.add('dark');
      document.querySelector('.day-nigth-btn-box').classList.add('dark');
      document.querySelector('.container-footer').classList.add('dark');
      document.querySelector('.card__container').classList.add('dark');
      document.querySelector('.modal-film ').classList.add('dark');
      document.querySelector('.card-list').classList.add('dark');
      // document.querySelector('.modal-dark').classList.add('dark');
      document.querySelector('.pagination__list').classList.add('dark');
    } else {
      // document.querySelector('.main-render').classList.remove('dark');
      // document.querySelector('.queued-render').classList.remove('dark');

      document.querySelector('.hero').classList.remove('dark');
      document.querySelector('.themetoggle').classList.remove('dark');
      document.querySelector('.material-icons').classList.remove('dark');
      document.querySelector('header').classList.remove('dark');
      document.querySelector('.day-nigth-btn-box').classList.remove('dark');
      document.querySelector('.container-footer').classList.remove('dark');
      document.querySelector('.card__container').classList.remove('dark');
      document.querySelector('.modal-film ').classList.remove('dark');
      document.querySelector('.card-list').classList.remove('dark');
      document.querySelector('.pagination__list').classList.remove('dark');
    }
  } catch (err) {}
}

addDarkClassToHTML();
