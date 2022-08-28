import { refs, token } from './refs';
import { renderGallery } from './apiService';
import { createPagination } from './pagination';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

const page = 1;
let prevQuery = '';

refs.formRef.addEventListener('submit', event => {
  event.preventDefault();

  const query = refs.inputRef.value;
  searchMovies(query, page);
});

export function searchMovies(query, page) {
  const paginationRef = document.querySelector('.pagination');
  if (query !== prevQuery) {
    refs.galleryRef.textContent = '';
    refs.paginationContainerRef.removeChild(paginationRef);
    page = 1;
  }
  fetch(
    `${BASE_URL}?api_key=${token}&language=en-US&query=${query}&page=${page}`
  )
    .then(res => res.json())
    .then(next => {
      refs.galleryRef.textContent = '';
      // console.log(next);
      renderGallery(next);
      prevQuery = query;

      paginationRef.id = next.total_pages;
      if (!paginationRef) {
        createPagination(page, next.total_pages);
      }
    });
}
