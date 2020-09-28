
var container = [];


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
        console.log(response.name)
        $("#cityName").text("City: " + response.name);
        var temp = $("<p>");
        temp.text("Temperature: " + response.main.temp + " F");
        $("#cityInfo").append(temp);
        var humidity = $("<p>");
        humidity.text("humidity: " + response.main.humidity + " %");
        $("#cityInfo").append(humidity);
        var wind = $("<p>");
        wind.text("Temperature: " + response.wind.speed + " MPH");
        $("#cityInfo").append(wind);
        var uv = $("<p>");
        uv.text("UV");
        $("#cityInfo").append(uv);
        
        addCity(response.name);
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

  function addCity(x){
      var newLi = $("<li>");
      // newLi.text(x);
      $("#cities").append(newLi);
      var button = $("<button>");
      button.text(x);
      button.addClass("btn btn-secondary cityButton mb-2");
      newLi.append(button);
      container.push(x);
      console.log(container);
      for(var i = 0; i < container.length; i++){
      localStorage.setItem(i, container[i]);
    }
    localStorage.setItem("Number", container.length);
  }

  $(".cityButton").on("click", function(event){
    event.preventDefault();
    var btnVal = this.text;
    console.log(btnVal);

  });

  function pageOpen(){
    var num = localStorage.getItem("Number");
    for(var i = 0; i < num; i++){
      container.push(localStorage.getItem(i));
    }

    for(var i = 0; i < container.length; i++){
      var li = $("<li>");
      // newLi.text(x);
      $("#cities").append(li);
      var ogButton = $("<button>");
      ogButton.text(container[i]);
      ogButton.addClass("btn btn-secondary cityButton mb-2");
      li.append(ogButton);
    }
    console.log(container);
  }

  pageOpen();