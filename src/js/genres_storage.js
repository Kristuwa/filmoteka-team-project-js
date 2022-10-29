import methodsStorage from './locale-storage-methods';
import { QueryHandler } from './query_handler';
export const GENRES = 'genres';
const getGenders = new QueryHandler();
// async function fetchQueryResultsForGenres() {
//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIEDB_KEY}&language=en-US`
//       );
//       const genresData = response.data.genres;
//       return genresData;
//     } catch (error) {
//       console.error(error);
//     }
//   };
export function saveGenres() {
  getGenders
    .fetchQueryResultsForGenres()
    .then(genresData => {
      methodsStorage.save(GENRES, genresData);
    })
    .catch(error => console.log(error));
  return methodsStorage.load(GENRES);
}
