const token = '44f23ff0cd07174676a333d7bc928845';
import { genres } from './genres';
const baseUrl = '';
import template from '../templates/moviePreview';

const galleryRef = document.querySelector('.gallery');

fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${token}`)
  .then(res => res.json())
  .then(next => {
    console.log(next.results);
    next.results.map(movie => {
      let elemGenres = movie.genre_ids;
      let genresArr = [];
      elemGenres.map(movieGenre => {
        genres.map(el => {
          if (el.id === movieGenre) {
            genresArr.push(' ' + el.name);
          }
        });
      });
      movie.genres = genresArr;
      let data = movie.release_date || movie.first_air_date;
      movie.year = data.slice(0, 4);
      let name = movie.original_title || movie.name;
      movie.name = name;
    });

    galleryRef.insertAdjacentHTML('beforeend', template(next.results));
  });
