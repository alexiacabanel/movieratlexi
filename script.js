import {apiKey} from './apikey.js'
const modal = document.getElementById("myModal");
const closeBtn = document.getElementById("close-cross");
const searchBar = document.getElementById('keyword');

async function searchMovies() {
    const keyword = document.getElementById('keyword').value.trim();
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.Response === 'True') {
            displayResults(data.Search);
        } else {
            document.getElementById('results').innerHTML = 'Aucun film trouvé';
        }
    } catch (error) {
        console.error('Erreur lors de la requête:', error);
    }
}

const handKeyUp = () => {
    searchMovies();
};
searchBar.addEventListener("keyup", handKeyUp);

async function readMoreMovie(movieId) {
    const apiUrlMore = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

    try {
        const response = await fetch(apiUrlMore);
        const data = await response.json();
        displayMovieDetails(data);
    } catch (error) {
        console.error('Erreur lors de la requête:', error);
    }
}


function displayResults(movies) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    movies.forEach(movie => {
        results.innerHTML += `
            <div class="movies-list" >
                <h3 data-aos="zoom-in">${movie.Title} (${movie.Year})</h3>
                <p data-aos="zoom-in">Type: ${movie.Type}</p>
                <img data-aos="zoom-in" src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
                <button data-aos="zoom-in" class='read-more' data-imdbid='${movie.imdbID}'>Read More</button>
                <hr>
            </div>
        `;
    });
    document.querySelectorAll(".read-more").forEach((button) => {
        button.addEventListener("click", () => {
          const imdbID = button.dataset.imdbid;
          loadMovie(imdbID);
        });
      });
    AOS.refresh();
}

function displayMovieDetails(movie) {
    const modalContent = document.getElementById("myModal");
    modalContent.innerHTML = '';

    modalContent.innerHTML += `
        <div class="modal-content">
            <span class="close" id="close-cross">&times;</span>
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Released: ${movie.Released}</p>
            <p>Plot: ${movie.Plot}</p>
        </div>
    `;

    // Show the modal
    const modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var exit = document.getElementById("close-cross");

    // Show the modal
    modal.style.display = "block";

    // Close modal when close button is clicked
    exit.onclick = function() {
        modal.style.display = "none";
    };

    // Close modal when clicked outside of modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

AOS.init({
    duration: 1200,
  })