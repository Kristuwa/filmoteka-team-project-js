import genresJson from './genres.json';

export function createCardMarkup (data) {
    const {title, poster_path, release_date, genre_ids, id} = data;
    const date = release_date.slice(0, 4);
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";
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
    <li class="card" data-id="${id}">
    <a class="link card-film-link" href="#" aria-label="${title}>
    <img class="card__poster" src="${IMAGE_URL}${poster_path}" alt="film poster" height="634"  width="395"/>
    <b class="card__film-name">${title}</b>
    <p class="card__description">
    ${genresString}
    <span class="film-year">${date}</span>
    </p>
    </a>
    </li>`
};
  
