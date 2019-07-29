const apiKey = `1f6927d94116e916d5d144f276d429d9`;
//CONTAINERS FOR CATEGORIES
const popularContainer = document.getElementById("popular-container");
const topRatedContainer = document.getElementById("topRated-container");
const upcomingContainer = document.getElementById("upcoming-container");
const nowPlayingContainer = document.getElementById("nowPlaying-container");
//DIV TO CLONE
const containerModel = popularContainer.children[0]
//POPUP
const card = document.getElementById('card')
const bodyPop = document.getElementById('body');
const moviePop = document.getElementById('movie-popup');
const selectedMovieImg = document.getElementById('moviePoster');
const selectedMovieTitle = document.getElementById('movieTitle');
const selectedMovieSubTitle = document.getElementById('movieSubTitle');
const selectedMovieDecription = document.getElementById('decription');
const selectedMovieGenres = document.getElementById('genres');
const selectedMovieReleaseDate = document.getElementById('releaseDate');
const selectedMovieBackground = document.getElementById('background-img');
const selectedMovieFondo = document.getElementById('fondo');
const close = document.getElementById('close')
//MOBILE MENU
const menuMobileContainer = document.getElementById('menu-mobile');
const menuMobile = document.getElementById('menu-mobile-container')
const barras = document.getElementById('mobile-menu-logo');
const closeMenu = document.getElementById('close-mobile-menu');
const mobileUl = document.getElementById('menu-mobile-list')
let menuClick = 1

const movieHome = (url, container) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = ``;
            const info = data.results.slice(0, 5)
            for (const inf of info) {
                let movies = containerModel.cloneNode(true);
                if (inf.poster_path) {
                    movies.children[0].src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${inf.poster_path}`;
                } else {
                    movies.children[0].src = './img/no-image.png'
                }
                movies.children[1].innerHTML = inf.title;
                movies.onclick = () => {
                    movieSelected(inf)
                }
                container.appendChild(movies);
            }

        })
}

const movieDetails = peliculaId => {
    fetch(`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            selectedMovieSubTitle.innerText = data.tagline;
            selectedMovieGenres.innerText = data.genres.map(genre => genre.name).join(', ')
        })
}
const movieSelected = movie => {
    moviePop.classList.remove('hidden')
    bodyPop.classList.add('popup-body');
    moviePop.classList.add('position-pop');
    selectedMovieFondo.style.width = "100vw";
    selectedMovieFondo.style.height = "100vh";
    selectedMovieImg.src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`;
    selectedMovieTitle.innerText = movie.title;
    selectedMovieDecription.innerText = movie.overview;
    let date = new Date(movie.release_date);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    selectedMovieReleaseDate.innerText = date.toLocaleDateString('en-GB', options);
    selectedMovieBackground.style.background = `url('https://image.tmdb.org/t/p/w500/${movie.backdrop_path}')`;
    selectedMovieBackground.style.backgroundRepeat = 'no-repeat';
    selectedMovieBackground.style.backgroundSize = 'cover';
    movieDetails(movie.id);

}

selectedMovieFondo.onclick = () => {
    moviePop.classList.add('hidden')
    moviePop.classList.remove('position-pop');
    bodyPop.classList.remove('popup-body');
}
close.onclick = () => {
    moviePop.classList.add('hidden')
    moviePop.classList.remove('position-pop');
    bodyPop.classList.remove('popup-body');
}

menuMobileContainer.onclick = () => {
    if (menuClick === 1) {
        barras.classList.add('hidden');
        closeMenu.classList.remove('hidden');
        menuMobile.classList.remove('hidden')
        menuMobile.classList.add('menu-mostrar')
        menuClick = 2
    } else {
        barras.classList.remove('hidden');
        closeMenu.classList.add('hidden');
        menuMobile.classList.add('hidden')
        menuMobile.classList.remove('menu-mostrar')
        menuClick = 1
    }
}

movieHome(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, popularContainer);
movieHome(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`, topRatedContainer);
movieHome(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`, upcomingContainer);
movieHome(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`, nowPlayingContainer);