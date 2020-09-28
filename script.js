



function searchWeather(x) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + x + "&appid=ebdcfef8b5f11a300f888ec06cffdf1c&units=imperial",
      dataType: "json",
      // error handling
      error: function(e){
          alert("Error-Connection");
      }
    // runs whenever call goes through
    }).then(function(response){
        console.log(response);
        console.log(reponse.name)
     
    })
  }

//   var searchValue = "Austin";
//   searchWeather(searchValue);

  $("#search").on("click", function(event){
    event.preventDefault();
    var input = $("#city").val();
    console.log("input: " + input);
    searchWeather(input);
  });

  function create(x){
      var newLi = $("<li>");
      newLi.text(x);
      $("#cities").append(newLi);
  }