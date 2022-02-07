
fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(response => {
        return response.json()
    })
    .then(data => {
        var filmList = data;
        console.log(filmList);
        document.getElementById("Best-movie-title").innerHTML = "<h1>"+filmList.results['0'].title+"<\h1>";
        document.getElementById("Best-rated-movie-image").innerHTML = "<img src="+filmList.results['0'].image_url+"><\img>";
        var filmRanking = filmList.results;
        fetch(filmList.results['0'].url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            var filmData = data;
            console.log(filmData);
            document.getElementById("Best-movie-summary").innerHTML = "<p>"+filmData.description+"<\p>";
        })
        .then(data => {
            fetch(filmList.next)
            .then(response => {
                return response.json()
            })
            .then(data => {
                var filmListNext = data;
                for (film of filmListNext.results) {
                    filmRanking.push(film)
                };
                console.log(filmRanking)
                
            })
            .then(data => {
                for (let i=0; i < 4; i++){
                    document.getElementById("Best-movie-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i].image_url+"><\img>";
                }
            })
        })
    })



