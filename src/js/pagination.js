import { fetchTrends } from './apiService';
import { searchMovies } from './searchMovies';
import { refs } from './refs';

refs.paginationContainerRef.addEventListener('click', changePage);

function changePage(e) {
  // console.dir(e.target);
  let currentPage = e.target.textContent;
  let lastPage = e.target.parentNode.id;
  const activePageRef = document.querySelector('.page-active ');

  const value = Number(activePageRef.textContent);

  if (e.target.classList.contains('arrow-left')) {
    if (value != 1) {
      currentPage = value - 1;
    } else {
      return;
    }
  }

  if (e.target.classList.contains('arrow-right')) {
    if (value != lastPage) {
      currentPage = value + 1;
    } else {
      return;
    }
  }

  refs.galleryRef.textContent = '';

  if (!refs.inputRef.value) {
    fetchTrends(currentPage);
  } else {
    searchMovies(refs.inputRef.value, currentPage);
  }
  createPagination(Number(currentPage), Number(lastPage));
}

function createPagination(currentPage, lastPage) {
  const paginationRef = document.querySelector('.pagination');

  if (paginationRef) {
    refs.paginationContainerRef.removeChild(paginationRef);
  }

  let template = `<ul class="pagination" id="${lastPage}"><li class="arrow-left arrow"></li>`;

  let step = 2;
  for (let i = 1; i <= lastPage; i++) {
    if (i === currentPage) {
      template += `<li class="page-item page-active">${i}</li>`;
    } else if (
      (i === 1 && window.screen.availWidth >= 768) ||
      (currentPage - step <= i && currentPage + step >= i) ||
      (i === lastPage && window.screen.availWidth >= 768)
    ) {
      template += `<li class="page-item">${i}</li>`;
    } else if (
      (i === currentPage - (step + 1) && window.screen.availWidth >= 768) ||
      (i === currentPage + (step + 1) && window.screen.availWidth >= 768)
    ) {
      template += `<li class="page-item">...</li>`;
    }
  }
  template += `<li class="arrow-right arrow"></li></ul>`;

  refs.paginationContainerRef.insertAdjacentHTML('afterbegin', template);
}

export { createPagination };
