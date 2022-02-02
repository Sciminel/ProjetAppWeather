const jourSemaine = ['Lundi', 'Mardi','Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
let tabJourEnOrdre = jourSemaine;

let ajd = new Date()
// Va servir a le passer a une methode "toLocaleDateString" pour avoir le jour actuel en fr
let option = {
    weekday: 'long'
}

let jourActuel = ajd.toLocaleDateString('fr-FR', option);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

if(jourActuel !== 'Lundi'){
    tabJourEnOrdre = jourSemaine.slice(jourSemaine.indexOf(jourActuel)).concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuel)));
}

export default tabJourEnOrdre;