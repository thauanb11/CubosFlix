const apiUrl = "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false";

const moviesPerPage = 5;
let currentPage = 1;
let movies = [];

document.addEventListener("DOMContentLoaded", async () =>{
    try {
        const result = await axios.get(apiUrl);
        movies = result.data.results;
        showMovieList(getMoviesForPage(currentPage))
        showHighlightMovie();
    } catch (error) {
        console.error(error);
    }
});


const getMoviesForPage = (page) =>{
    const start = (page - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    return movies.slice(start,end);
};


const showMovieList = (movieData) =>{
const movieList = document.querySelector('.movies')
movieList.innerHTML = '';

  movieData.forEach((movie) => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie');
    movieItem.style.backgroundImage = `url('${movie.poster_path}')`;
    movieItem.setAttribute('data-id', movie.id);
    movieItem.innerHTML = `
    <div class="movie__info">
        <span class="movie__title">${movie.title}</span>
        <span class="movie__rating">
            <img src="./assets/estrela.svg" alt="Estrela">
            ${movie.vote_average.toFixed(1)}
        </span>
    </div> `;
    movieList.appendChild(movieItem);
  });
};


document.querySelector('.btn-prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showMovieList(getMoviesForPage(currentPage));
    }
});

document.querySelector('.btn-next').addEventListener('click', () => {
    if (currentPage < Math.ceil(movies.length / moviesPerPage)) {
        currentPage++;
        showMovieList(getMoviesForPage(currentPage));
    }
});


const highlightContainer = document.querySelector('.highlight');
const highlightTitle = highlightContainer.querySelector('.highlight__title');
const highlightRating = highlightContainer.querySelector('.highlight__rating');
const highlightGenres = highlightContainer.querySelector('.highlight__genres');
const highlightLaunch = highlightContainer.querySelector('.highlight__launch');
const highlightDescription = highlightContainer.querySelector('.highlight__description');
const highlightVideoLink = highlightContainer.querySelector('.highlight__video-link');

const showHighlightMovie = async () => {
    try {
        const movieId = movies[Math.floor(Math.random() * movies.length)].id;
        const response = await axios.get(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movieId}?language=pt-BR`);
        const movie = response.data;
        const highlightTitle = document.querySelector('.highlight__title');
        const highlightRating = document.querySelector('.highlight__rating');
        const highlightGenres = document.querySelector('.highlight__genres');
        const highlightLaunch = document.querySelector('.highlight__launch');
        const highlightDescription = document.querySelector('.highlight__description');
        const highlightVideoLink = document.querySelector('.highlight__video-link');

        highlightTitle.textContent = movie.title;
        highlightRating.innerHTML = `<img src="./assets/estrela.svg" alt="Estrela"> ${movie.vote_average.toFixed(1)}`;
        highlightGenres.textContent = movie.genres.map(genre => genre.name).join(', ');
        highlightLaunch.textContent = new Date(movie.release_date).getFullYear();
        highlightDescription.textContent = movie.overview;
        highlightVideoLink.href = `https://www.youtube.com/results?search_query=${movie.title} Trailer`;

        const highlightVideo = document.querySelector('.highlight__video');
        highlightVideo.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    } catch (error) {
        console.log(error);
    }
};


const input = document.querySelector('.input');

input.addEventListener('keyup', async (event) => {
    try {
        if (event.key === 'Enter') {
            const searchUrl = `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`;
            const result = await axios.get(searchUrl);

            if (result.data.results.length > 0) {
                movies = result.data.results;
                currentPage = 1;
                showMovieList(getMoviesForPage(currentPage));
            } else {
                await loadPage();
            }

            input.value = '';
        }
    } catch (error) {
        console.log(error);
    }
});


const modal = document.querySelector('.modal');
const modalClose = modal.querySelector('.modal__close');

const showMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movieId}?language=pt-BR`);
        const movie = response.data;

        modal.querySelector('.modal__title').textContent = movie.title;
        modal.querySelector('.modal__img').src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        modal.querySelector('.modal__description').textContent = movie.overview;
        
        const modalGenresContainer = modal.querySelector('.modal__genres');
        modalGenresContainer.innerHTML = '';
        movie.genres.forEach(genre => {
            const genreElement = document.createElement('span');
            genreElement.classList.add('modal__genre');
            genreElement.textContent = genre.name;
            modalGenresContainer.appendChild(genreElement);
        });

        modal.querySelector('.modal__average').textContent = movie.vote_average.toFixed(1);

        modal.classList.remove('hidden');
        modal.classList.add('show');
    } catch (error) {
        console.log(error);
    }
};

modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('show');
});

document.addEventListener('click', (event) => {
    if (event.target.closest('.movie')) {
        const movieId = event.target.closest('.movie').dataset.id;
        showMovieDetails(movieId);
    }
});

const themeButton = document.querySelector('.btn-theme');

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeButton.src = './assets/dark-mode.svg';
    } else {
        themeButton.src = './assets/light-mode.svg';
    }
});