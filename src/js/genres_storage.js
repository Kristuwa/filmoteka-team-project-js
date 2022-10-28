import axios from 'axios';


const MOVIEDB_KEY = 'e5b8bd1b82d4f5b68280cf1e2b92e5f6';
const GENRES = 'genres';

const save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error("Set state error: ", error.message);
    }
  };
  const load = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error("Get state error: ", error.message);
    }
  };

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
        save(GENRES, genresData);
    })
    .catch(error => console.log(error));
   return load(GENRES);
}
  

