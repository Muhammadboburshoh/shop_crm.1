const basketCloseBtn = document.querySelector('.close_button');
const noContentWrapper = document.querySelector('.no-content');
const basketImg = document.querySelector('.basket-img');
const basketEl = document.querySelector('.all-backet');

basketCloseBtn.addEventListener('click', () => {
  basketEl.classList.add('d-none');
});
noContentWrapper.addEventListener('click', () => {
  basketEl.classList.add('d-none');
});

basketImg.addEventListener('click', () => {
  basketEl.classList.remove('d-none');
});
