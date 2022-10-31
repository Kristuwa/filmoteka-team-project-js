import methodsStorage from './locale-storage-methods';
import { QueryHandler } from './query_handler';
import { storage } from './locale-storage-methods';
export const GENRES = 'genres';

const getGenders = new QueryHandler();

export function saveGenres() {
  getGenders
    .fetchQueryResultsForGenres()
    .then(genresData => {
      methodsStorage.save(GENRES, genresData);
    })
    .catch(error => console.log(error));
  return methodsStorage.load(GENRES);
}

export function createStringOfGenresForCard(genresId, genresStorage) {
  let genresString;
  const genresArray = [];
  const selectedGenres = genresId.map(id => {
    return genresStorage.filter(idGenre => idGenre.id === id);
  });

  selectedGenres.map(genre => {
    //  console.log(genre);
    genresArray.push(genre.name);
  });
  if (genresArray.length > 0 && genresArray.length <= 3) {
    genresString = genresArray.join(', ');
  } else {
    genresString = `${genresArray[0]}, ${genresArray[1]}, Other`;
  }
  return genresString;
}
