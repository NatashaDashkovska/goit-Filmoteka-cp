import { genres } from './genres';
import template from '../templates/moviePreview';
import { refs, token } from './refs';

const baseURL = 'https://api.themoviedb.org/3/trending/all/day';
let totalPages = 0;
let page = 1;

export function fetchTrends(page) {
  fetch(`${baseURL}?api_key=${token}&page=${page}`)
    .then(res => res.json())
    .then(next => {
      console.log(next.results);
      renderGallery(next);
    });
}

function renderGallery(next) {
  next.results.map(movie => {
    // console.log(movie);
    let elemGenres = movie.genre_ids || [];

    let genresArr = [];
    elemGenres.map(movieGenre => {
      genres.map(el => {
        if (el.id === movieGenre) {
          genresArr.push(' ' + el.name);
        }
      });
    });
    movie.genres = genresArr;

    let data = movie.release_date || movie.first_air_date || '';
    movie.year = data.slice(0, 4);
    let name = movie.original_title || movie.name;
    movie.name = name;

    if (movie.media_type === 'person') {
      const allMovies = movie.known_for;
      let elemGenres = [];
      let years = [];

      allMovies.map(movie => {
        const oneMovieGenres = movie.genre_ids;
        years.push(
          movie.release_date.slice(0, 4) || movie.first_air_date.slice(0, 4)
        );

        oneMovieGenres.map(movieGenre => {
          genres.map(el => {
            if (el.id === movieGenre && !elemGenres.includes(' ' + el.name)) {
              elemGenres.push(' ' + el.name);
            }
          });
        });
      });

      let minYear = 2023;
      let maxYear = 1900;
      years.map(year => {
        if (Number(year) < minYear) {
          minYear = year;
        }
        if (Number(year) > maxYear) {
          maxYear = year;
        }
      });

      movie.genres = elemGenres;
      movie.year = minYear + '-' + maxYear;
    }
  });

  totalPages = next.total_pages;
  refs.galleryRef.insertAdjacentHTML('beforeend', template(next.results));
}

fetchTrends(1);
