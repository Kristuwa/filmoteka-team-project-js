import genresJson from './genres.json';
console.log(genresJson);
export function createCardMarkup (data) {
    const {title, poster_path, release_date, genre_ids} = data;
    const date = release_date.slice(0, 4);

let genresString;
const genresArray = [];
const selectedGenres =  genre_ids.map(id => {
return genresJson.filter(idGenre => idGenre.id === id);
 });
 selectedGenres.map(genre => genresArray.push(genre[0].name));
 if(genresArray.length > 0 && genresArray.length <= 3){
     genresString = genresArray.join(", ");
 } else{
     genresString = `${genresArray[0]}, ${genresArray[1]}, other`;
 };

    return `
    <li class="card">
    <a class="card-link">
    <img class="card__poster" src="${poster_path}" alt="film poster" height="634px"  width="395"/>
    <b class="card__film-name">${title}</b>
    <p class="card__description">
    ${genresString}
    <span class="film-year">${date}</span>
    </p>
    </a>
    </li>`
};
  
