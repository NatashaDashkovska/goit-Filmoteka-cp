import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchTrends } from './apiService';
const container = document.getElementById('tui-pagination-container');
const galleryRef = document.querySelector('.gallery');
let page = 1;
container.addEventListener('click', e => {
  setTimeout(() => {
    galleryRef.textContent = '';
    let activePage = document.querySelector('.tui-is-selected');

    page = activePage.textContent;
    fetchTrends(page);
  }, 0);
});

const options = {
  // below default value of options
  totalItems: 20000,
  itemsPerPage: 20,

  visiblePages: window.screen.availWidth <= 320 ? 3 : 7,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn" style="border:none">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected " style="background-color:#FF6B08; width:40px; height:40px; border-radius:5px; padding:13px; border:none">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}" >' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}" >{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip" style="border:none; cursor:not-allowed">' +
      '<span class="tui-ico-ellip ">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(container, options);
