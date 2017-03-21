

// GET USER LOCATION
if (window.navigator && window.navigator.geolocation) {
  window.navigator.geolocation.getCurrentPosition(function(result) {
      position = result;
  }, function(err) {
      // to do, better error
      console.log(err);
  });
}

// GET WEATHER FOR LOCATION
function getWeather(position) {
    $.ajax({
        dataType: "jsonp",
        url: 'https://api.darksky.net/forecast/648dec742889b2ef905cc950f3f92b67/' + position.latitude + ',' + position.longitude,
        success: function(data){
            console.log(data);
            $('.wi').addClass("wi-forecast-io-" + data.currently.icon);
            $('.temperature').html(fToC(data.currently.temperature));
            WeatherComponent.setTemperature(fToC(data.currently.temperature));
        }
    });
}

function getGeolocation(position){
    $.ajax({
       datatype:"jsonp",
        url:"https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.latitude + ',' + position.longitude +  "&key=AIzaSyAP8Ht3jk6woGKIhO6Ok72HgI4Lw_D51dw&result_type=administrative_area_level_3",
        success: function(data){
           console.log(data);
           $('.location').html(data.results[0].formatted_address);
        }
    });
}

function fToC(fahrenheit)   
{  
  var fTemp = fahrenheit;  
  var temp = (fTemp - 32) * 5 / 9;
  return temp.toFixed(2).toString() + 'c';
} 