let latitude, longtitude, destination;

$(document).ready(function(){
    alert("Please allow the device to know your location!")
    initGeolocation();
});

$(function() {
    $("#navigate-button").click(function() {
        window.location.href = `ar_weather.html?source=${latitude};${longtitude}&destination=${destination[1]};${destination[0]}`
    })
})

function initGeolocation()
{
   if( navigator.geolocation )
   {
      // Call getCurrentPosition with success and failure callbacks
      navigator.geolocation.getCurrentPosition( success );
   }
   else
   {
      alert("Sorry, your browser does not support geolocation services.");
   }
}

function success(position)
{
    latitude = position.coords.latitude;
    longtitude = position.coords.longitude;

    // Initialising access token (mapbox)
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA'

    // Initialising map
    var map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v11', center: [longtitude, latitude], zoom: 4 });

    // Creating and Adding marker
    var img1 = document.querySelector('#amber');
    var marker1 = new mapboxgl.Marker({ element:img1 }).setLngLat([75.85133, 26.98547]).addTo(map);

    var img2 = document.querySelector('#gateway');
    var marker2 = new mapboxgl.Marker({ element:img2 }).setLngLat([72.83427, 18.92198]).addTo(map);

    var img3 = document.querySelector('#gate');
    var marker3 = new mapboxgl.Marker({ element:img3 }).setLngLat([77.22951, 28.61296]).addTo(map);

    var img4 = document.querySelector('#lotus');
    var marker4 = new mapboxgl.Marker({ element:img4 }).setLngLat([77.2562515, 28.553492]).addTo(map);

    var img5 = document.querySelector('#victoria');
    var marker5 = new mapboxgl.Marker({ element:img5 }).setLngLat([88.3377942, 22.5448082]).addTo(map);

    // Adding GeoCoder
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        }).on('result', function(e) {
            destination = e.result.center;
        })
    );
}