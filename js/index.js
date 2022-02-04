
fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(response => {
        return response.json()
    })
    .then(data => {
        var filmList = data;
        console.log(filmList);
        document.getElementById("Best-movie-title").innerHTML = "<h1>"+filmList.results['0'].title+"<\h1>";
    })



