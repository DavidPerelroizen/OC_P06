function getBestMovieImage(){
    let bestMovieDico = fetch("http://localhost:8000/api/v1/titles?imdb_score=1.0");
    document.getElementById("Best-rated-movie-image").innerHTML = "<img src=" + bestMovieDico.image_url + "alt= 'Best movie image'"
};

getBestMovieImage();