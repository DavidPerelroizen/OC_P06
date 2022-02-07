function modalManagement(url, categoryIndex, modalIndex){
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            var filmData = data;
        document.getElementById("Category-"+categoryIndex+"-modal-"+modalIndex+"-image").innerHTML = "<img src="+filmData.image_url+"><\img>";
        document.getElementById("Category-"+categoryIndex+"-modal-"+modalIndex+"-text").innerHTML = `
        <h2>`+filmData.title+`</h2>

        <ul>
            <li>Genres: `+filmData.genres+`</li>
            <li>Release date: `+filmData.date_published+`</li>
            <li>Rated: `+filmData.rated+`</li>
            <li>Imdb_score: `+filmData.imdb_score+`</li>
            <li>Directed by: `+filmData.director+`</li>
            <li>Actors: `+filmData.actors+`</li>
            <li>Duration: `+filmData.duration+` minutes</li>
            <li>Countries: `+filmData.countries+`</li>
            <li>Box office results: $`+filmData.worldwide_gross_income+`</li>
            <li>Summary: `+filmData.long_description+`</li>
        </ul>
        `
        var moreInfoModal = document.getElementById("Category-"+categoryIndex+"-modal-"+modalIndex);
        var modalButton = document.getElementById("Category-"+categoryIndex+"-box-"+modalIndex);
        var span = document.getElementById("Category-"+categoryIndex+"-modal-"+modalIndex+"-close")[0];
        modalButton.onclick = function(){
            moreInfoModal.style.display = "block";
        };
        span.onclick = function(){
            moreInfoModal.style.display = "none";
        }
    })
}



function carrouselManager(url, categoryIndex){
    fetch(url)
    .then(response => {
        return response.json()
    .then(data => {
        var filmList = data;
        var filmRanking= filmList.results;
        if (filmList.next == null){
            if (filmRanking.length >= 4){
                for (let i=0; i < 4; i++){
                    document.getElementById("Category-"+categoryIndex+"-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i].image_url+"><\img>";
                    modalManagement(filmRanking[i].url, categoryIndex, i+1); 
                }
            }else{
                for (let i=0; i < filmRanking.length; i++){
                    document.getElementById("Category-"+categoryIndex+"-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i].image_url+"><\img>";
                    modalManagement(filmRanking[i].url, categoryIndex, i+1); 
                }
            };
            let j = 0;
            let arrowRight = document.getElementById("Category-"+categoryIndex+"-arrow-right");
            let arrowLeft = document.getElementById("Category-"+categoryIndex+"-arrow-left");
            arrowRight.addEventListener('click', function(){
                if(j < 3){j += 1};
                if (filmRanking.length >= 4){
                    for (let i = 0; i < 4; i++){
                        document.getElementById("Category-"+categoryIndex+"-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i + j].image_url+"><\img>";
                        modalManagement(filmRanking[i + j].url, categoryIndex, i+1); 
                    }
                }
            });
            arrowLeft.addEventListener('click', function(){
                if(j > 0){j -= 1};
                if (filmRanking.length >= 4){
                    for (let i = 0; i < 4; i++){
                    document.getElementById("Category-"+categoryIndex+"-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i + j].image_url+"><\img>";
                    modalManagement(filmRanking[i + j].url, categoryIndex, i+1); 
                    }
                }
            })
        }else{
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
                    document.getElementById("Category-"+categoryIndex+"-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i].image_url+"><\img>";
                    modalManagement(filmRanking[i].url, categoryIndex, i+1); 
                }
            })
            .then(data => {
                let j = 0;
                let arrowRight = document.getElementById("Category-"+categoryIndex+"-arrow-right");
                let arrowLeft = document.getElementById("Category-"+categoryIndex+"-arrow-left");
                arrowRight.addEventListener('click', function(){
                    if(j < 3){j += 1};
                    for (let i = 0; i < 4; i++){
                        document.getElementById("Category-"+categoryIndex+"-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i + j].image_url+"><\img>";
                        modalManagement(filmRanking[i + j].url, categoryIndex, i+1); 
                    }
                });
                arrowLeft.addEventListener('click', function(){
                    if(j > 0){j -= 1};
                    for (let i = 0; i < 4; i++){
                        document.getElementById("Category-"+categoryIndex+"-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i + j].image_url+"><\img>";
                        modalManagement(filmRanking[i + j].url, categoryIndex, i+1); 
                    }
                });
            })
        }
    }

    )})

}









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
            document.getElementById("best-movie-modal-image").innerHTML = "<img src="+filmData.image_url+"><\img>";
            document.getElementById("best-movie-modal-text").innerHTML = `
            <h2>`+filmData.title+`</h2>
        
            <ul>
                <li>Genres: `+filmData.genres+`</li>
                <li>Release date: `+filmData.date_published+`</li>
                <li>Rated: `+filmData.rated+`</li>
                <li>Imdb_score: `+filmData.imdb_score+`</li>
                <li>Directed by: `+filmData.director+`</li>
                <li>Actors: `+filmData.actors+`</li>
                <li>Duration: `+filmData.duration+` minutes</li>
                <li>Countries: `+filmData.countries+`</li>
                <li>Box office results: $`+filmData.worldwide_gross_income+`</li>
                <li>Summary: `+filmData.long_description+`</li>
            </ul>
            `
            var moreInfoModal = document.getElementById("More-info-modal");
            var modalButton = document.getElementById("Best-movie-button");
            var span = document.getElementById("best-movie-close")[0];
            modalButton.onclick = function(){
                moreInfoModal.style.display = "block";
            };
            span.onclick = function(){
                moreInfoModal.style.display = "none";
            }
        })
    })



carrouselManager("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", 1)
carrouselManager("http://localhost:8000/api/v1/titles/?genre=Western&sort_by=-imdb_score", 2)
carrouselManager("http://localhost:8000/api/v1/titles/?genre=Film-Noir&sort_by=-imdb_score", 3)
carrouselManager("http://localhost:8000/api/v1/titles/?genre=Documentary&sort_by=-imdb_score", 4)
