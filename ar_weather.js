let coordinates = {};
$(document).ready(function () {
    get_coordinates();
    get_weather();
});

function get_coordinates() {
    let search_params = new URLSearchParams(window.location.search);
    if (search_params.has('source') && search_params.has('destination')) {
        let source = search_params.get('source');
        let destination = search_params.get('destination');

        coordinates.source_lat = source.split(',')[0];
        coordinates.source_lon = source.split(',')[1];
        coordinates.destination_lat = destination.split(',')[0];
        coordinates.destination_lon = destination.split(',')[1];
    } else {
        alert('Please provide source and destination coordinates');
        window.history.back();
    }
}

function get_weather()
{
    // Fetching the weather data from OpenWeather API using AJAX
    $.ajax({
        //url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=d306744e84b37b8d283dd7bbd3086348`,
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=94212e971d0ca977303f8ae892224bbd`,
        type: 'GET',
        success: function (response) {
            let name = response.name;
            let weather = response.weather[0].main;
            $("scene_container").append(
                `
                    <a-entity gps-entity-place="latitude: ${coordinates.source_lat}; longitude: ${coordinates.source_lon};">
                        <a-entity>
                            <a-text height="50" value="Weather forcast is ${weather} at ${name}"></a-text>
                        </a-entity>
                    </a-entity>
                `
            );
        }
    });
}