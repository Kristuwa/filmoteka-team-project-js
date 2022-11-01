import * as basicLightbox from 'basiclightbox';
export { openModalTrailer };

const playBtn = document.querySelector('.trailer-btn');
const modalTrailer = document.querySelector('.position');

playBtn.addEventListener('click', openModalTrailer);

function openModalTrailer(e) {
  const getTrailerKey = localStorage.getItem('local-trailer-key');
  const { key } = JSON.parse(getTrailerKey);

  const instance = basicLightbox.create(`
  <div class="close-btn-trailer"></div>
  <iframe  width="660" height="415" src='https://www.youtube.com/embed/${key}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
  instance.show();

  const closeBtn = document.querySelector('.close-btn-trailer');
  closeBtn.addEventListener('click', () => instance.close());
}
