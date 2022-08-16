import modalTemplate from '../templates/movieModal';

const galleryRef = document.querySelector('.gallery');
const modalContainerRef = document.querySelector('.modal-container');
const modalRef = document.querySelector('.modal');
const btnCloseRef = document.querySelector('.btn-modal-close');
const bodyRef = document.querySelector('body');
const backdropRef = document.querySelector('.backdrop');

let mas = {};
galleryRef.addEventListener('click', e => {
  if (e.target.nodeName != 'IMG') {
    console.log('error');
    return;
  }

  fetchModalInfo();

  setTimeout(() => {
    console.log(mas);
    openModal(mas);
  }, 1000);
});

function fetchModalInfo() {
  fetch(`
https://api.themoviedb.org/3/movie/755566?api_key=44f23ff0cd07174676a333d7bc928845`)
    .then(res => res.json())
    .then(next => {
      mas = next;
    });
}

function openModal(obj) {
  modalContainerRef.classList.remove('is-hidden');
  modalRef.insertAdjacentHTML('beforeend', modalTemplate(obj));

  btnCloseRef.addEventListener('click', closeModal);
  backdropRef.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalWithEsc);
  bodyRef.classList.add('no-scroll');
}

function closeModal() {
  modalContainerRef.classList.add('is-hidden');
  btnCloseRef.removeEventListener('click', closeModal);
  backdropRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeModalWithEsc);
  bodyRef.classList.remove('no-scroll');

  const modalBodyRef = document.querySelector('.modal-body');

  modalRef.removeChild(modalBodyRef);
}

function closeModalWithEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
