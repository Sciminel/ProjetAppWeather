const CLEAPI = '799e707caad6e7c4dbfcb4fa8bca396b'
let resultatsAPI;

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;

        AppelApi(longitude, latitude);
    }, () => {
       // alert("Vous avez refusé la géolocalisation, l'appli ne peut pas fonctionner.. Activer le");
    })
}

function AppelApi(long, lat){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)

        const temps = document.querySelector('.temps');
        const temperature = document.querySelector('.temperature');
        const localisation = document.querySelector('.localisation');

        let weather = data.current.weather;


        for(let i = 0; i < weather.length; i++){
            temps.innerText = `${weather[i].description}`
            temperature.innerText = `${Math.trunc(data.current.temp)}°`
            localisation.innerText = `${data.timezone}`
        }


    })
}


// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}