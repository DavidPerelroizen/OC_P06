
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
            .then(data => {
                let j = 0;
                let arrowRight = document.getElementById("Best-movies-arrow-right");
                let arrowLeft = document.getElementById("Best-movies-arrow-left");
                arrowRight.addEventListener('click', function(){
                    if(j < 3){j += 1};
                    for (let i = 0; i < 4; i++){
                        document.getElementById("Best-movie-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i + j].image_url+"><\img>";
                    }
                });
                arrowLeft.addEventListener('click', function(){
                    if(j > 0){j -= 1};
                    for (let i = 0; i < 4; i++){
                        document.getElementById("Best-movie-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i + j].image_url+"><\img>";
                    }
                });
            })
        })
    })

fetch("http://localhost:8000/api/v1/titles/?genre=Western&sort_by=-imdb_score")
    .then(response => {
        return response.json()
    .then(data => {
        var westernsList = data;
        var westernsRanking= westernsList.results;
        fetch(westernsList.next)
        .then(response => {
            return response.json()
        })
        .then(data => {
            var westernListNext = data;
            for (film of westernListNext.results) {
                westernsRanking.push(film)
            };
        })
        .then(data => {
            for (let i=0; i < 4; i++){
                document.getElementById("Best-westerns-box-"+(i+1)).innerHTML = "<img src="+westernsRanking[i].image_url+"><\img>";
            }
        })
        .then(data => {
            let j = 0;
            let arrowRight = document.getElementById("Best-westerns-arrow-right");
            let arrowLeft = document.getElementById("Best-westerns-arrow-left");
            arrowRight.addEventListener('click', function(){
                if(j < 3){j += 1};
                for (let i = 0; i < 4; i++){
                    document.getElementById("Best-westerns-box-"+(i+1)).innerHTML = "<img src="+westernsRanking[i + j].image_url+"><\img>";
                }
            });
            arrowLeft.addEventListener('click', function(){
                if(j > 0){j -= 1};
                for (let i = 0; i < 4; i++){
                    document.getElementById("Best-westerns-box-"+(i+1)).innerHTML = "<img src="+westernsRanking[i + j].image_url+"><\img>";
                }
            });
        })
    })
    })

    fetch("http://localhost:8000/api/v1/titles/?genre=Film-Noir&sort_by=-imdb_score")
    .then(response => {
        return response.json()
    .then(data => {
        var filmNoirList = data;
        var filmNoirRanking= filmNoirList.results;
        fetch(filmNoirList.next)
        .then(response => {
            return response.json()
        })
        .then(data => {
            var filmNoirListNext = data;
            for (film of filmNoirListNext.results) {
                filmNoirRanking.push(film)
            };
            console.log(filmNoirRanking);
        })
        .then(data => {
            for (let i=0; i < 4; i++){
                document.getElementById("Best-film-noirs-box-"+(i+1)).innerHTML = "<img src="+filmNoirRanking[i].image_url+"><\img>";
            }
        })
        .then(data => {
            let j = 0;
            let arrowRight = document.getElementById("Best-film-noirs-arrow-right");
            let arrowLeft = document.getElementById("Best-film-noirs-arrow-left");
            arrowRight.addEventListener('click', function(){
                if(j < 3){j += 1};
                for (let i = 0; i < 4; i++){
                    document.getElementById("Best-film-noirs-box-"+(i+1)).innerHTML = "<img src="+filmNoirRanking[i + j].image_url+"><\img>";
                }
            });
            arrowLeft.addEventListener('click', function(){
                if(j > 0){j -= 1};
                for (let i = 0; i < 4; i++){
                    document.getElementById("Best-film-noirs-box-"+(i+1)).innerHTML = "<img src="+filmNoirRanking[i + j].image_url+"><\img>";
                }
            });
        })
    })
    })


