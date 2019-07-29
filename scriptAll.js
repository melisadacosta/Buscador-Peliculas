const allMovies = document.getElementById('allMovies-container');
const contenedorAllMovies = document.getElementById('moviesAll')
const movieModel = allMovies.children[0];
const model = document.getElementById('model');
const menu = document.getElementById('categorias-lists');
const main = document.getElementById('main');
const moviesAllContainer = document.getElementById('moviesAll');
const categoryTitle = document.getElementById('category-title-all');
const results = document.getElementById('results');
const loadMore = document.getElementById('loadMore-button');
const logo = document.getElementById('contenedor-logo');
const viewAll = document.getElementsByClassName('view-all');
const search = document.getElementById('search');
const banner = document.getElementById('banner')


let currentPage = 1
let clickCount = ''

const showMovies = (data, paginaActual) =>{
    results.innerText = `${data.total_results} results`;
    for(const d of data.results){
        let moviesBox = movieModel.cloneNode(true);
        if(d.poster_path){
            moviesBox.children[0].src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${d.poster_path}`;
        }else{
            moviesBox.children[0].src = './img/no-image.png'
        }
        moviesBox.children[1].innerHTML = d.title;
        allMovies.appendChild(moviesBox)
    }
    if(paginaActual === data.total_pages){
        loadMore.classList.add('hidden')
    }
}
const stylesOnClick = ()=>{
    main.classList.add('hidden');
    banner.classList.add('hidden')
    moviesAllContainer.classList.remove('hidden');
    loadMore.classList.remove('hidden')
    allMovies.innerHTML = '';
}
const popularAll = paginaActual =>{
    categoryTitle.innerText = 'Popular Movies'
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${paginaActual}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        showMovies(data, paginaActual)
    })
}

menu.children[0].onclick = ()=>{
    stylesOnClick()
    clickCount = 1
    currentPage = 1
    popularAll(currentPage)
}
viewAll[0].onclick = ()=>{
    stylesOnClick()
    clickCount = 1
    currentPage = 1
    popularAll(currentPage)
}
const topRatedAll = paginaActual =>{
    categoryTitle.innerText = 'Top Rated Movies'
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${paginaActual}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        showMovies(data, paginaActual)
    })
}

menu.children[1].onclick = ()=>{
    stylesOnClick()
    currentPage = 1
    clickCount = 2
    topRatedAll()
}
viewAll[1].onclick = ()=>{
    stylesOnClick()
    clickCount = 2
    currentPage = 1
    popularAll(currentPage)
}
const upcomingAll = paginaActual =>{
    categoryTitle.innerText = 'Upcoming Movies'
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${paginaActual}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        showMovies(data, paginaActual)
    })
}

menu.children[2].onclick = ()=>{
    currentPage = 1
    clickCount = 3
    stylesOnClick()
    upcomingAll(currentPage)
}
viewAll[2].onclick = ()=>{
    stylesOnClick()
    clickCount = 3
    currentPage = 1
    popularAll(currentPage)
}

const NowPlayingAll = paginaActual =>{
    categoryTitle.innerText = 'Now Playing Movies'
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${paginaActual}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        showMovies(data, paginaActual)
    })
}

menu.children[3].onclick = ()=>{
    stylesOnClick()
    clickCount = 4
    currentPage = 1
    NowPlayingAll()
}
viewAll[3].onclick = ()=>{
    stylesOnClick()
    clickCount = 4
    currentPage = 1
    popularAll(currentPage)
}

const busqueda = (paginaActual, textoBusqueda)=>{
    
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${textoBusqueda}&page=${paginaActual}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        if(data.results.length){
            categoryTitle.innerText = 'Search Results';
            showMovies(data, paginaActual)
        }else{
            contenedorAllMovies.innerHTML='';
            let text = document.createElement('p');
            text.classList.add('noSearchText');
            text.innerText = 'No Search Found'
            let imgBack = document.createElement('div');
            imgBack.classList.add('noSeacrhFound');
            contenedorAllMovies.appendChild(text);
            contenedorAllMovies.appendChild(imgBack)
            // contenedorAllMovies.innerHTML = `<p class='noSearchText'>No Results Found</p> 
            //                                 <div class ='noSeacrhFound'></div>`
        }
    })
}
search.onkeyup = event =>{
    if(event.keyCode === 13){
        let searchElement = search.value;
        stylesOnClick();
        clickCount = 5;
        currentPage = 1;
        busqueda(currentPage, searchElement);
    }
}

loadMore.onclick = ()=>{
    if(clickCount === 1){
        popularAll(++currentPage)
    }else if(clickCount === 2){
        topRatedAll(++currentPage)
    }else if(clickCount === 3){
        upcomingAll(++currentPage)
    }else if(clickCount === 4){
        NowPlayingAll(++currentPage)
    }else if(clickCount === 5){
        let searchElement = search.value
        busqueda(++currentPage, searchElement)
    }
}

logo.onclick = ()=>{
    moviesAllContainer.classList.add('hidden');
    main.classList.remove('hidden');
    banner.classList.remove('hidden')
}
