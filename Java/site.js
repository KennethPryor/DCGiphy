$(document).ready(function () {
    const heroArray = ['Batman', 'Superman', 'Aquaman', 'The Flash', 'Green Arrow', 'Wonder Woman', 'Green Lantern', 'Martian Manhunter', 'Supergirl', 'John Constantine', 'Hawkgirl', 'Shazam', 'Cyborg',];
    const villanArray = ['Joker', 'Doomsday', 'Manta', 'Reverse Flash', 'Deathstroke', 'Circe', 'Sinestro', 'Malefic', 'Harley Quinn', 'Captain Cold', 'Swamp Thing',]
    // const queryURL = 'https://sectionpi.giphy.com/v1/gifs/search?api_key=KfxqmH8qaOAQTGY9tKXE1jkFGXWvY23q&q=' + comicbookchar + '&limit=10&offset=0&rating=PG-13&lang=en'
    function CreateButtons4ArrayHeros() {
        for (var i = 0; i < heroArray.length; i++) {
            document.getElementById("CharBtn").innerHTML += '<button data-person=' + heroArray[i] + ' class="btn btn-dark gifBtn">' + heroArray[i] + '</button>';
            console.log(heroArray[i]);
        }
    };
    function CreateButtons4ArrayVillans () {
        for (var i = 0; i < villanArray.length; i++) {
          document.getElementById("CharBtn").innerHTML += '<button data-person=' + villanArray[i] + ' class="btn btn-dark gifBtn">' + villanArray[i] + '</button>';
          console.log(villanArray[i]);
        }
      };
    if ($('body').hasClass("herospage")) {
        console.log('Hero Page Viewed')
        CreateButtons4ArrayHeros();
    } else if ($('body').hasClass("villanspage")) {
        console.log('Villan Page Viewed')
        CreateButtons4ArrayVillans();
    } else {
        console.log('View Hero or Villan page')
    }






    $("#searchGifs").on("click", function () {
        $("#searchBar").val(comicbookchar);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });


    });
    $(".gifBtn").on("click", function () {
        const comicbookchar = $(this).attr("data-person");
        const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            comicbookchar + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log()
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                console.log(queryURL);
                const results = response.data;
                for (var i = 0; i < results.length; i++) {
                    // var gifDiv = $("<div>").addClass('card');
                    var rating = results[i].rating;
                    console.log(rating);
                    var gifCard = $(`
                    <section id="gifcard" class="card text-white bg-dark">
                    <img class="card-img-top" src="${results[i].images.fixed_height.url}">
                    <section class="card-body">
                    <h3 class="card-title">Rating: ${rating}</h3>
                    </section>
                    </section>
                    `);
                    // ("Rating: " + rating);
                    // var comicbookcharImage = $("<img>");
                    // comicbookcharImage.attr("src", );
                    // gifDiv.append(gifCard);
                    // gifDiv.append(comicbookcharImage);
                    $("#gifs-here").append(gifCard);


                }
            });
    });
    $("#gifcard").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
});