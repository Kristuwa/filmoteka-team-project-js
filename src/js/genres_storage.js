import methodsStorage from './locale-storage-methods';
import { QueryHandler } from './query_handler';
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
};

export function createStringOfGenresForCard(genresId, genresStorage){
  let genresString;
const genresArray = [];
const selectedGenres =  genresId.map(id => {
return genresStorage.filter(idGenre => idGenre.id === id);
});
selectedGenres.map(genre => genresArray.push(genre[0].name));
if(genresArray.length > 0 && genresArray.length <= 3){
   genresString = genresArray.join(", ");
} else{
   genresString = `${genresArray[0]}, ${genresArray[1]}, other`;
};
return genresString;
};
