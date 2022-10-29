import axios from 'axios';
import methodsStorage from './locale-storage-methods';

const MOVIEDB_KEY = 'e5b8bd1b82d4f5b68280cf1e2b92e5f6';
export const GENRES = 'genres';

async function fetchQueryResultsForGenres() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIEDB_KEY}&language=en-US`
      );
      const genresData = response.data.genres;
      return genresData;
    } catch (error) {
      console.error(error);
    }
  };
export function saveGenres(){
    fetchQueryResultsForGenres()
    .then(genresData => {
       methodsStorage.save(GENRES, genresData);
    })
    .catch(error => console.log(error));
   return methodsStorage.load(GENRES);
}
  

