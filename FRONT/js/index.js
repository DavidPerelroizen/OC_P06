function modalManagement(url, categoryIndex, modalIndex){
    /*This function helps to manage the modal windows
    The URL will indicates from where the resource should be fetched
    The categoryIndex indicates which carrousel the modal should be associated with
    The modalIndex indicated which movie-box the modal is referring to
    */
    fetch(url) /*Step1: get the data from the url and transform it into a js object*/
        .then(response => {
            return response.json()
        })
        .then(data => { /*Step2: populate the modal*/
            var filmData = data;
        document.getElementById("Category-"+categoryIndex+"-modal-"+modalIndex+"-image").innerHTML = "<img src="+filmData.image_url+">";
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
        /*Step3: define the events and the modal behaviour onclick*/
        var moreInfoModal = document.getElementById("Category-"+categoryIndex+"-modal-"+modalIndex);
        var modalButton = document.getElementById("Category-"+categoryIndex+"-box-"+modalIndex);
        var span = document.getElementById("Category-"+categoryIndex+"-modal-"+modalIndex+"-close");
        modalButton.onclick = function(){
            moreInfoModal.style.display = "block";
        };
        span.onclick = function(){
            moreInfoModal.style.display = "none";
        }
    })
}



function carrouselManager(url, categoryIndex){
    /*This function helps to manage the carrousel
    The url will indicate which resource must be fetched
    The categoryIndex will redirect the data to a specific carrousel
    */
    fetch(url) /*Step1: fetch the data using the url*/
    .then(response => {
        return response.json() /*Step2: transform the data into a js object*/
    .then(data => {
        var filmList = data;
        var filmRanking= filmList.results; /*Step3: extract the film list from the request*/
        fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score") /*Step4: extract the best movies list*/
        .then(response => {
            return response.json()
        })
        .then(data => {
            /*Step5: if the best movie of the filmRanking is the same as the one of the allfilmList, then we remove
            it from our ranking as the best of all movies is already displayed in a specific place on the web page*/
            var allfilmList = data;
            if(filmRanking[0].id == allfilmList.results[0].id){
                filmRanking.shift()
            }
            })
        .then(data => {if (filmList.next == null /*Check if another page with more movies is available*/){
            if (filmRanking.length >= 4){ /*Step6: populate the movies boxes with the film image*/
                for (let i=0; i < 4; i++){
                    document.getElementById("Category-"+categoryIndex+"-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i].image_url+"><\img>";
                    modalManagement(filmRanking[i].url, categoryIndex, i+1); 
                }
            }else{/*Step6 bis: in case the number of films in that category would be inferior to 4,
                only the available movies are displayed*/
                for (let i=0; i < filmRanking.length; i++){
                    document.getElementById("Category-"+categoryIndex+"-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i].image_url+"><\img>";
                    modalManagement(filmRanking[i].url, categoryIndex, i+1); 
                }
            };
            /*Step7: set-up the arrows behavior and the adapting of the content of each movie box at each click*/
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
                /*If the movies list continues on another page, we will add the next page to the filmRanking*/
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
                .then(data => {/*Step6: populate the movies boxes with the film image*/
                    for (let i=0; i < 4; i++){
                        document.getElementById("Category-"+categoryIndex+"-box-"+(i+1)).innerHTML = "<img src="+filmRanking[i].image_url+"><\img>";
                        modalManagement(filmRanking[i].url, categoryIndex, i+1); 
                    }
                })
                .then(data => {
                    /*Step7: set-up the arrows behavior and the adapting of the content of each movie box at each click*/
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
    })
})
})

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
            var span = document.getElementById("best-movie-close");
            modalButton.onclick = function(){
                moreInfoModal.style.display = "block";
            };
            span.onclick = function(){
                moreInfoModal.style.display = "none";
            }
        })
    })



carrouselManager("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", 1)
carrouselManager("http://localhost:8000/api/v1/titles/?genre=Drama&sort_by=-imdb_score", 2)
carrouselManager("http://localhost:8000/api/v1/titles/?genre=Film-Noir&sort_by=-imdb_score", 3)
carrouselManager("http://localhost:8000/api/v1/titles/?genre=Documentary&sort_by=-imdb_score", 4)
