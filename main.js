function onLoad() {

    let nomForm = document.getElementById('nomForm');
    let prenomForm = document.getElementById('prenomForm');
    nomForm.value = localStorage.getItem('nom');
    prenomForm.value = localStorage.getItem('prenom');

    if (sessionStorage.getItem('address') != null) {

        document.getElementById('label').innerHTML = 'Réservation en cours à la station :';

        document.getElementById("address").innerHTML = sessionStorage.getItem('address');

        let compteur = new Compteur;
        compteur.afficherInfosReservation();
        compteur.afficherTempsRestant();
    }

}

