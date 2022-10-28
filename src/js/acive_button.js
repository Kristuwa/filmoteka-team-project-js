// ✅ Заміна класів is-active
const libraryListButtons = document.querySelector('.btn__list')
libraryListButtons.addEventListener('click', onButtonClick);

export function onButtonClick(event) {
 if (event.target.nodeName !== 'BUTTON') {
  return;
 }
 // console.log(event.target);

const currentActiveBtn = libraryListButtons.querySelector('.is-active')
 // console.log(currentActiveBtn);

 if (currentActiveBtn) {
   currentActiveBtn.classList.remove('is-active')
 // console.log('remove class is-active');
 }

 // додає клас на кнопку на яку клікнули
 event.target.classList.add('is-active')
 // console.log('add class is-active');
}
