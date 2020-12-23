import { PATH } from './path';

const dataBuild = (data, genres) => {
  /** Функция для преобразования данных
   * отдаваемых сервером в нужный формат
   */
  const dataArr = { ...data };
  const resultsArray = [...data.results];
  resultsArray.forEach(filmObj => {
    if (!filmObj.hasOwnProperty('year')) {
      if (filmObj.hasOwnProperty('release_date')) {
        filmObj.year = filmObj.release_date.slice(0, 4);
      } else {
        filmObj.year = '';
      }
    }

    if (!filmObj.hasOwnProperty('genres')) {
      if (
        filmObj.hasOwnProperty('genre_ids') &&
        Array.isArray(filmObj.genre_ids)
      ) {
        filmObj.genres = [];
        filmObj.genre_ids.forEach(id => {
          const genrObj = genres.find(genre => genre.id === id);
          filmObj.genres.push(genrObj);
        });
      } else {
        filmObj.genres = [];
      }
    }
    if (filmObj.poster_path === null) {
      filmObj.poster_path = PATH + '/not-found.png';
    } else {
      filmObj.poster_path =
        'https://image.tmdb.org/t/p/w220_and_h330_face' + filmObj.poster_path;
    }
  });
  dataArr.results = resultsArray;

  return dataArr;
};
export default dataBuild;
