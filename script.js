// waits for page to load before starting
$(document).ready(function () {

  var container = [];
  // container.length = 0;
  // var add = true;
  var save = true;

  function search(x) {
    $(".forecast").empty();
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + x + "&appid=ebdcfef8b5f11a300f888ec06cffdf1c&units=imperial",
      dataType: "json",
      // error handling
      error: function (e) {
        // save = false;
        alert("Error: City does not exist - or connection issues");
        // remove broken item from localstorage
        localStorage.removeItem(x);
        exist(x);
        return;
      }
      // runs whenever call goes through
    }).then(function (response) {
      $(".forecast").attr("style", "display: inline-block");
      // save = true;
      console.log(response);
      // console.log(response.name);
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
      var lat = response.coord.lat;
      var long = response.coord.lon;
      uvDisplay(lat, long);
      fiveDay(response.name);
      console.log("container: " + container);
      for (var i = 0; i < container.length; i++) {
        if (x == container[i]) {
          console.log("already exists");
          save = false;
        }
      }
      if (save===true) {
        check(x);
      }
    });
  }

  function uvDisplay(x, y) {
    // console.log("WORKING");
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + x + "&lon=" + y + "&appid=ebdcfef8b5f11a300f888ec06cffdf1c",
      dataType: "json",
      // runs whenever call goes through
    }).then(function (response) {
      // console.log(response);
      var uvVal = parseFloat(response.value);
      // console.log("uv: " + uvVal);
      var uv = $("<p>");
      uv.attr("class", "p-1 col-lg-3");
      uv.text("UV index: " + uvVal);
      if (uvVal <= 2.99) {
        uv.attr("style", "background-color: green;");
      }
      if (uvVal >= 3 && uvVal <= 5.99) {
        uv.attr("style", "background-color: yellow;");
      }
      if (uvVal >= 6 && uvVal <= 7.99) {
        uv.attr("style", "background-color: orange;");
      }
      if (uvVal >= 8 && uvVal <= 10.99) {
        uv.attr("style", "background-color: red;");
      }
      if (uvVal >= 11) {
        uv.attr("style", "background-color: purple;");
      }
      $("#cityInfo").append(uv);
    });
  }

  function fiveDay(name) {

    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&appid=ebdcfef8b5f11a300f888ec06cffdf1c&units=imperial",
      dataType: "json",
    }).then(function (response) {
      // console.log("five day: ", response);
      var date = $("<h5>");
      var temp = $("<p>");
      var humidity = $("<p>");
      var img = $("<img>");
      console.log("icon link: " + response.list[11].weather[0].icon);
      img.attr("src", "https://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + ".png");
      date.text(response.list[3].dt_txt);
      temp.text("Temp: " + response.list[3].main.temp_max + " F");
      humidity.text("Humidity: " + response.list[3].main.humidity + " %");
      $("#1").append(date);
      $("#1").append(img);
      $("#1").append(temp);
      $("#1").append(humidity);

      var date2 = $("<h5>");
      var temp2 = $("<p>");
      var humidity2 = $("<p>");
      var img2 = $("<img>");
      img2.attr("src", "https://openweathermap.org/img/wn/" + response.list[11].weather[0].icon + ".png");
      date2.text(response.list[11].dt_txt);
      temp2.text("Temp: " + response.list[11].main.temp_max + " F");
      humidity2.text("Humidity: " + response.list[11].main.humidity + " %");
      $("#2").append(date2);
      $("#2").append(img2);
      $("#2").append(temp2);
      $("#2").append(humidity2);

      var date3 = $("<h5>");
      var temp3 = $("<p>");
      var humidity3 = $("<p>");
      var img3 = $("<img>");
      img3.attr("src", "https://openweathermap.org/img/wn/" + response.list[19].weather[0].icon + ".png");
      date3.text(response.list[19].dt_txt);
      temp3.text("Temp: " + response.list[19].main.temp_max + " F");
      humidity3.text("Humidity: " + response.list[19].main.humidity + " %");
      $("#3").append(date3);
      $("#3").append(img3);
      $("#3").append(temp3);
      $("#3").append(humidity3);

      var date4 = $("<h5>");
      var temp4 = $("<p>");
      var humidity4 = $("<p>");
      var img4 = $("<img>");
      img4.attr("src", "https://openweathermap.org/img/wn/" + response.list[27].weather[0].icon + ".png");
      date4.text(response.list[27].dt_txt);
      temp4.text("Temp: " + response.list[27].main.temp_max + " F");
      humidity4.text("Humidity: " + response.list[27].main.humidity + " %");
      $("#4").append(date4);
      $("#4").append(img4);
      $("#4").append(temp4);
      $("#4").append(humidity4);

      var date5 = $("<h5>");
      var temp5 = $("<p>");
      var humidity5 = $("<p>");
      var img5 = $("<img>");
      img5.attr("src", "https://openweathermap.org/img/wn/" + response.list[35].weather[0].icon + ".png");
      date5.text(response.list[35].dt_txt);
      temp5.text("Temp: " + response.list[35].main.temp_max + " F");
      humidity5.text("Humidity: " + response.list[35].main.humidity + " %");
      $("#5").append(date5);
      $("#5").append(img5);
      $("#5").append(temp5);
      $("#5").append(humidity5);
    });
  }


  // removes bad input from container and removes button
  function exist(val) {
    // remove item from array
    var popped = container.pop(val);
    // remove last button created
    // $("#cities button").last().remove();
  }

  $("#search").on("click", function (event, x) {
    save = true;
    // clear previous info
    $("#cityInfo").empty();
    $(".forecast").empty();
    event.preventDefault();
    var input = $("#city").val();
    // console.log("input: " + input);
    // compare new input to container
    // error handling
    if (input === "" || $.type(input) != "string") {
      event.preventDefault();
      alert("You must enter an existing city that you have not already entered!");
    } else {
      for (var i = 0; i < container.length; i++) {
        if (input === container[i]) {
          // console.log("already exists");
          alert("Please enter a different city");
          $("#city").val("");
          return;
        }
      }
      
      // console.log("new item added: " + container);
      search(input);

      $("#city").val("");
    }
  });

  function check(x) {
    if (save === true) {
      addCity(x);
    }
  }

  function addCity(x) {
    // console.log(container);
    container.push(x);
    var button = $("<button>");
    button.text(x);
    button.addClass("btn btn-secondary cityButton w-100 border-top border-dark");
    button.attr("type", "button");
    $("#cities").append(button);
    // console.log(container);
    for (var i = 0; i < container.length; i++) {
      localStorage.setItem(i, container[i]);
    }
    localStorage.setItem("Number", container.length);

  }

  // event handlers for created buttons
  $("#cities").on("click", "button", function (event) {
    save = true;
    event.preventDefault();
    $("#cityInfo").empty();
    $(".forecast").empty();
    var btnText = $(this).text();
    // console.log("btn text: " + btnText);
    search(btnText);

  });

  // button second try
  // function grabText(event) {
  //   // event.preventDefault();
  //   var newTest = $(this).text();
  //   console.log("new Test: " , newTest);
  // }

  function pageOpen() {
    $(".forecast").attr("style", "display: none;");
    var num = localStorage.getItem("Number");
    for (var i = 0; i < num; i++) {
      container.push(localStorage.getItem(i));
    }

    for (var i = 0; i < container.length; i++) {
      // var li = $("<li>");
      // $("#cities").append(li);
      var ogButton = $("<button>");
      ogButton.text(container[i]);
      // took out mb-2
      ogButton.addClass("btn btn-secondary cityButton w-100 border-top border-dark");
      ogButton.attr("type", "button");
      $("#cities").append(ogButton);
      // li.append(ogButton);
    }
  }
  pageOpen();
});