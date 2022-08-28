import modalTemplate from '../templates/movieModal.hbs';
import { refs, token } from './refs';

let mas = {};

refs.galleryRef.addEventListener('click', e => {
  const movieId = e.target.dataset.id;
  const movieGenre = e.target.dataset.type;

  if (e.target.nodeName != 'IMG') {
    console.log('error');
    return;
  }

  fetchModalInfo(movieId, movieGenre);

  setTimeout(() => {
    openModal(mas);
  }, 500);
});

function fetchModalInfo(movieId, movieGenre) {
  fetch(`
https://api.themoviedb.org/3/${movieGenre}/${movieId}?api_key=${token}`)
    .then(res => res.json())
    .then(next => {
      mas = next;
      console.log(next);
    });
}

function openModal(obj) {
  refs.modalContainerRef.classList.remove('is-hidden');
  refs.modalRef.insertAdjacentHTML('beforeend', modalTemplate(obj));

  refs.btnCloseRef.addEventListener('click', closeModal);
  refs.backdropRef.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalWithEsc);
  refs.bodyRef.classList.add('no-scroll');
}

function closeModal() {
  refs.modalContainerRef.classList.add('is-hidden');
  refs.btnCloseRef.removeEventListener('click', closeModal);
  refs.backdropRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeModalWithEsc);
  refs.bodyRef.classList.remove('no-scroll');

  const modalBodyRef = document.querySelector('.modal-body');

  refs.modalRef.removeChild(modalBodyRef);
}

function closeModalWithEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
