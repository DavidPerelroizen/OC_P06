
fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(response => {
        return response.json()
    })
    .then(data => {
        var filmList = data;
        document.getElementById("Best-movie-title").innerHTML = "<h1>"+filmList.results['0'].title+"<\h1>";
        document.getElementById("Best-rated-movie-image").innerHTML = "<img src="+filmList.results['0'].image_url+"><\img>";
        var filmRanking = filmList.results;
        fetch(filmList.results['0'].url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            var filmData = data;
            document.getElementById("Best-movie-summary").innerHTML = "<p>"+filmData.description+"<\p>";
            var moreInfoModal = document.getElementById("More-info-modal");
            var modalButton = document.getElementById("Best-movie-button");
            var span = document.getElementsByClassName("close")[0];
            modalButton.onclick = function(){
                moreInfoModal.style.display = "block";
            }
            span.onclick = function(){
                moreInfoModal.style.display = "none";
            }
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

    fetch("http://localhost:8000/api/v1/titles/?genre=Documentary&sort_by=-imdb_score")
    .then(response => {
        return response.json()
    .then(data => {
        var documentaryList = data;
        var documentaryRanking= documentaryList.results;
        console.log(documentaryRanking);
        if (documentaryList.next == null){
            if (documentaryRanking.length >= 4){
                for (let i=0; i < 4; i++){
                    document.getElementById("Best-documentaries-box-"+(i+1)).innerHTML = "<img src="+documentaryRanking[i].image_url+"><\img>";
                }
            }else{
                for (let i=0; i < documentaryRanking.length; i++){
                    document.getElementById("Best-documentaries-box-"+(i+1)).innerHTML = "<img src="+documentaryRanking[i].image_url+"><\img>";
                }
            };
            let j = 0;
            let arrowRight = document.getElementById("Best-documentaries-arrow-right");
            let arrowLeft = document.getElementById("Best-documentaries-arrow-left");
            arrowRight.addEventListener('click', function(){
                if(j < 3){j += 1};
                if (documentaryRanking.length >= 4){
                    for (let i = 0; i < 4; i++){
                        document.getElementById("Best-documentaries-box-"+(i+1)).innerHTML = "<img src="+documentaryRanking[i + j].image_url+"><\img>";
                    }
                }
            });
            arrowLeft.addEventListener('click', function(){
                if(j > 0){j -= 1};
                if (documentaryRanking.length >= 4){
                    for (let i = 0; i < 4; i++){
                    document.getElementById("Best-documentaries-box-"+(i+1)).innerHTML = "<img src="+documentaryRanking[i + j].image_url+"><\img>";
                    }
                }
            })
        }else{
            fetch(documentaryList.next)
            .then(response => {
                return response.json()
            })
            .then(data => {
                var documentaryListNext = data;
                for (film of documentaryListNext.results) {
                    documentaryRanking.push(film)
                };
            })
            .then(data => {
                for (let i=0; i < 4; i++){
                    document.getElementById("Best-documentaries-box-"+(i+1)).innerHTML = "<img src="+documentaryRanking[i].image_url+"><\img>";
                }
            })
            .then(data => {
                let j = 0;
                let arrowRight = document.getElementById("Best-documentaries-arrow-right");
                let arrowLeft = document.getElementById("Best-documentaries-arrow-left");
                arrowRight.addEventListener('click', function(){
                    if(j < 3){j += 1};
                    for (let i = 0; i < 4; i++){
                        document.getElementById("Best-documentaries-box-"+(i+1)).innerHTML = "<img src="+documentaryRanking[i + j].image_url+"><\img>";
                    }
                });
                arrowLeft.addEventListener('click', function(){
                    if(j > 0){j -= 1};
                    for (let i = 0; i < 4; i++){
                        document.getElementById("Best-documentaries-box-"+(i+1)).innerHTML = "<img src="+documentaryRanking[i + j].image_url+"><\img>";
                    }
                });
            })
        }
    }

    )})
