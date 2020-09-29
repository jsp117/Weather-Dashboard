// waits for page to load before starting
// $(document).ready(function () {

var container = [];
var add = true;
var save = false;

function search(x) {
  $(".forecast").empty();
  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + x + "&appid=ebdcfef8b5f11a300f888ec06cffdf1c&units=imperial",
    dataType: "json",
    // error handling
    error: function (e) {
      save = false;
      alert("Error: City does not exist - or connection issues");
      exist(x, save);
      return save;
    }
    // runs whenever call goes through
  }).then(function (response) {
    $(".forecast").attr("style", "display: inline-block");
    save = true;
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
    var lat = response.coord.lat;
    var long = response.coord.lon;
    uvDisplay(lat, long);
    fiveDay(response.name);
  });
}

function uvDisplay(x, y) {
  console.log("WORKING");
  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + x + "&lon=" + y + "&appid=ebdcfef8b5f11a300f888ec06cffdf1c",
    dataType: "json",
    // runs whenever call goes through
  }).then(function (response) {
    console.log(response);
    var uvVal = parseFloat(response.value);
    console.log("uv: " + uvVal);
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
    url: "http://api.openweathermap.org/data/2.5/forecast?q=" + name + "&appid=ebdcfef8b5f11a300f888ec06cffdf1c&units=imperial",
    dataType: "json",
  }).then(function (response) {
    console.log("five day: ", response);
    var date = $("<p>");
    var temp = $("<p>");
    var humidity = $("<p>");
    date.text(response.list[3].dt_txt);
    temp.text("Temp: " + response.list[3].main.temp_max + " F");
    humidity.text("Humidity: " + response.list[3].main.humidity + " %");
    $("#1").append(date);
    $("#1").append(temp);
    $("#1").append(humidity);

    var date2 = $("<p>");
    var temp2 = $("<p>");
    var humidity2 = $("<p>");
    date2.text(response.list[11].dt_txt);
    temp2.text("Temp: " + response.list[11].main.temp_max + " F");
    humidity2.text("Humidity: " + response.list[11].main.humidity + " %");
    $("#2").append(date2);
    $("#2").append(temp2);
    $("#2").append(humidity2);

    var date3 = $("<p>");
    var temp3 = $("<p>");
    var humidity3 = $("<p>");
    date3.text(response.list[19].dt_txt);
    temp3.text("Temp: " + response.list[19].main.temp_max + " F");
    humidity3.text("Humidity: " + response.list[19].main.humidity + " %");
    $("#3").append(date3);
    $("#3").append(temp3);
    $("#3").append(humidity3);

    var date4 = $("<p>");
    var temp4 = $("<p>");
    var humidity4 = $("<p>");
    date4.text(response.list[27].dt_txt);
    temp4.text("Temp: " + response.list[27].main.temp_max + " F");
    humidity4.text("Humidity: " + response.list[27].main.humidity + " %");
    $("#4").append(date4);
    $("#4").append(temp4);
    $("#4").append(humidity4);

    var date5 = $("<p>");
    var temp5 = $("<p>");
    var humidity5 = $("<p>");
    date5.text(response.list[35].dt_txt);
    temp5.text("Temp: " + response.list[35].main.temp_max + " F");
    humidity5.text("Humidity: " + response.list[35].main.humidity + " %");
    $("#5").append(date5);
    $("#5").append(temp5);
    $("#5").append(humidity5);
  });
}



function exist(val, toSave) {
  // remove item from array
  var popped = container.pop(val);
  console.log("popped value: " + popped);
  console.log("new container: " + container);
  // remove last button created
  $("#cities li").last().remove();
}

$("#search").on("click", function (event, x) {
  // clear previous info
  $("#cityInfo").empty();
  $(".forecast").empty();
  event.preventDefault();
  var input = $("#city").val();
  console.log("input: " + input);
  // compare new input to container
  add = true;
  for (var i = 0; i < container.length; i++) {
    if (input === container[i]) {
      add = false;
      console.log("already exists");
      alert("Please enter a different city");
      $("#city").val("");
      return;
    }
  }
  if (input === "" || add === false || $.type(input) != "string") {
    event.preventDefault();
    alert("You must enter an existing city that you have not already entered!");
  } else {
    container.push(input);
    console.log("new item added: " + container);
    search(input);

    addCity(input);

    $("#city").val("");
  }
});

function addCity(x) {
  console.log(container);
  var newLi = $("<li>");
  $("#cities").append(newLi);
  var button = $("<button>");
  button.text(x);
  button.addClass("btn btn-secondary cityButton mb-2");
  button.attr("type", "button");
  // button.attr("id", container.length);
  // button.attr("onClick", "grabText()");
  newLi.append(button);



  console.log(container);
  for (var i = 0; i < container.length; i++) {
    localStorage.setItem(i, container[i]);
  }
  localStorage.setItem("Number", container.length);

}

// event handlers for created buttons
$("#cities").on("click", "button", function (event) {
  $("#cityInfo").empty();
  console.log("hello");
  event.preventDefault();
  var btnText = $(this).text();
  console.log("btn text: " + btnText);
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
    var li = $("<li>");
    $("#cities").append(li);
    var ogButton = $("<button>");
    ogButton.text(container[i]);
    ogButton.addClass("btn btn-secondary cityButton mb-2");
    ogButton.attr("type", "button");
    // ogButton.attr("id", i + 1);
    // ogButton.attr("onClick", "grabText()");
    li.append(ogButton);
    // ogButton.addEventListener("click", function(event) {
    //   event.preventDefault();
    //   var buttonTxt = $(this).text();
    //   console.log("ogButton text: " + buttonTxt);

    // });

  }
  // console.log(container);
}

pageOpen();


// });