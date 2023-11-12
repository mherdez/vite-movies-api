import './style.css';

const API_KEY = 'e570b299ca0f8191b0a3c3142eaed5fd';
const URL_API = 'https://api.themoviedb.org/3';
const URL_SEARCH = `${URL_API}/search/movie?api_key=${API_KEY}&query=`;
const URL_POPULAR = `${URL_API}/movie/popular?api_key=${API_KEY}`;

const $app = document.querySelector('#list-movies');
const $form = document.querySelector('form');

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  let movieSearch = $form.querySelector('input');
  const option = ( event.submitter.id === 'popular') ? URL_POPULAR : URL_SEARCH + movieSearch.value;

  getData(option).then(data => {
    const movies = data.results;
    const template = movies.map(({ poster_path, title, overview }) => {
      if (!poster_path || !overview) return;
      return `
        <article class="card">
          <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
          <div class="card-info">
            <h2>${title}</h2>
            <p>${overview}</p>
          </div>
        </article>
      `;
    }).join('');
    $app.innerHTML = template;
    movieSearch.value = '';
    movieSearch.focus();
  })
});

const getData = async (option) => {
  const response = await fetch(option);
  const data = await response.json();
  return data;
};




