$(document).ready(function () {
    const heroArray = ['Batman', 'Superman', 'Aquaman', 'The Flash', 'Green Arrow', 'Wonder Woman', 'Green Lantern', 'Martian Manhunter', 'Supergirl', 'John Constantine', 'Hawkgirl', 'Shazam', 'Cyborg',];
    const villanArray = ['Joker', 'Doomsday', 'Black Manta', 'Reverse Flash', 'Deathstroke', 'Brainiac', 'Sinestro', 'Malefic', 'Harley Quinn', 'Captain Cold', 'Swamp Thing','Poison Ivy', 'Gorilla Grodd']
    
    // const queryURL = 'https://sectionpi.giphy.com/v1/gifs/search?api_key=KfxqmH8qaOAQTGY9tKXE1jkFGXWvY23q&q=' + comicbookchar + '&limit=10&offset=0&rating=PG-13&lang=en'
    function CreateButtons4ArrayHeros() {
        for (var i = 0; i < heroArray.length; i++) {
          var heros = $("<button>");
          heros.addClass("btn btn-dark gifBtn");
          heros.attr("data-person", 'DC ' + heroArray[i]);
          heros.text(heroArray[i]);
          $('#CharBtn').append(heros);
            console.log(heroArray[i]);
        }
    };
    function CreateButtons4ArrayVillans () {
        for (var i = 0; i < villanArray.length; i++) {
          var villans = $("<button>");
          villans.addClass("btn btn-dark gifBtn");
          villans.attr("data-person", villanArray[i]);
          villans.text(villanArray[i]);
          $('#CharBtn').append(villans);
          
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
        const searchItem = $("#searchBar").val();
            console.log(searchItem);
            var searchItembutton = $("<button>");
            searchItembutton.addClass("gifBtn btn btn-dark ");
            searchItembutton.attr("data-person", searchItem);
            // searchItembutton.attr('class', 'gifBtn btn btn-dark');
            searchItembutton.text(searchItem);
            $('#CharBtn').append(searchItembutton);
            console.log(searchItembutton)
        


    });
    $(".gifBtn").on("click", function () {
        const comicbookchar = $(this).attr("data-person");
        const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            comicbookchar + "&api_key=dc6zaTOxFJmzC&limit=12";
        console.log()
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                $('#gifs-here').empty();
                console.log(response);
                console.log(queryURL);
                const results = response.data;
                for (var i = 0; i < results.length; i++) {
                    // var gifDiv = $("<div>").addClass('card');
                    var rating = results[i].rating;
                    console.log(rating);
                    var gifCard = $(`
                    <section id="gifcard" class="card text-white bg-dark">
                    <img class="card-img-top"  src="${results[i].images.fixed_height_still.url}" data-still="${results[i].images.fixed_height_still.url}" data-animate="${results[i].images.fixed_height.url}" data-state="still">
                    <section class="card-body">
                    <h3 class="card-title">Rating: ${rating}</h3>
                    </section>
                    </section>
                    `);
                    $("#gifs-here").append(gifCard);


                }
            });
    });
    $("#gifs-here").on("click", "img" ,  function() {
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