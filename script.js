// waits for page to load before starting
// $(document).ready(function () {

var container = [];
var add = true;
var save = false;

function search(x) {

  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + x + "&appid=ebdcfef8b5f11a300f888ec06cffdf1c&units=imperial",
    dataType: "json",
    // error handling
    error: function (e) {
      save = false;
      alert("Error: City does not exist - or connection issues");
      exist(x);
      return save;
    }
    // runs whenever call goes through
  }).then(function (response) {
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
    var uv = $("<p>");
    uv.text("UV");
    $("#cityInfo").append(uv);
    return save;
  });
}

function exist(val) {
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

// button first try
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