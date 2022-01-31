import tabJourEnOrdre from "./Utilitaire/gestionTemps.js";
console.log(tabJourEnOrdre)

const CLEAPI = '799e707caad6e7c4dbfcb4fa8bca396b'
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const previsionHeure = document.querySelectorAll('.heure-nom-prevision');
const previsionDegre = document.querySelectorAll('.heure-prevision-valeur');
const jourSemaine = document.querySelectorAll('.jour-prevision-nom');
const joursTemperature = document.querySelectorAll('.jour-prevision-temp');
const imgIcon = document.querySelector('.logo-meteo');
const chargement = document.querySelector('.overlay-icon-chargement')


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;

        AppelApi(longitude, latitude);
    }, () => {
        alert("Vous avez refusé la géolocalisation, l'appli ne peut pas fonctionner.. Activer le");
    })
}

function AppelApi(long, lat){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
         console.log(data)


        let donnee = data.current;

        temps.innerText = `${donnee.weather[0].description}`;
        temperature.innerText = `${Math.trunc(donnee.temp)}°`;
        localisation.innerText = `${data.timezone}`;

        // Les heures par tranche de 3 et leurs température

        let heureActuelle = new Date().getHours();

        for(let i = 0; i < previsionHeure.length; i++){
            let heureIncr = heureActuelle + (i*3);
            if(heureIncr > 24){
                previsionHeure[i].innerText = `${heureIncr - 24}h`
            }else if(heureIncr === 24){
                previsionHeure[i].innerText = `00h`;
            }else{
                previsionHeure[i].innerText = `${heureIncr}h`;
            }
        }

        for(let i = 0; i < previsionDegre.length; i++){
            previsionDegre[i].innerText = `${Math.trunc(data.hourly[i*3].temp)}°`
        }

        // Jour de la semaine (3 premieres lettres )

        for(let i = 0; i < tabJourEnOrdre.length; i++){
            jourSemaine[i].innerText = tabJourEnOrdre[i].slice(0,3);
        }

        //Temperature par jour

        for(let i = 0; i < 7; i++){
            joursTemperature[i].innerText = `${Math.trunc(data.daily[i+1].temp.day)}°`
        }

        // icon dynamique

        if(heureActuelle >= 6 || heureActuelle === 21){
            imgIcon.src = `ressources/jour/${donnee.weather[0].icon}.svg`
        }else{
            imgIcon.src = `ressources/nuit/${donnee.weather[0].icon}.svg`
        }

        console.log(donnee.weather[0].icon)

        // Animation de chargement 
        chargement.classList.add('disparition');

    })
}


// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}