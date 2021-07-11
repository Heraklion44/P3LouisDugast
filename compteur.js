class Compteur {

    constructor() {
        this.initEvent();
    }

    afficherTimer(timer) {

        let min = Math.floor(timer / 60000);
        let sec = (timer / 1000) - min * 60;
        sec = Math.round(sec);
        return min + " min " + sec + " s";
    };



    saveInfosReservation() {

        let address = document.getElementById('address');
        let nomForm = document.getElementById('nomForm');
        let prenomForm = document.getElementById('prenomForm');
        let finReservation = this.add20Minutes();
        localStorage.setItem('nom', nomForm.value);
        localStorage.setItem('prenom', prenomForm.value);
        sessionStorage.setItem('address', address.textContent);
        sessionStorage.setItem('finReservation', finReservation);

    }

    afficherInfosReservation() {

        let infos = document.getElementById('infosReservation');

        document.getElementById('blockReservation').style.display = "block";
        infos.innerHTML = "Vélo réservé à la station " + sessionStorage.getItem('address') + " par " + localStorage.getItem('nom') + " " + localStorage.getItem('prenom');

    };

    add20Minutes() {
        var now = new Date();
        now.setMinutes(now.getMinutes() + 20);
        console.log(now);
        return now;
    }

    afficherTempsRestant() {
        let timerElt = document.getElementById('timer');

        // prendre l'heure +20min = VariableHeure+20 (session) ;  heure actuelle -heure de fin ; recup l'heure , 
        let timer = setInterval(function () {
            let now = new Date();
            let finReservation = new Date(sessionStorage.getItem('finReservation'));
            let counter = finReservation.getTime() - now.getTime();
            timerElt.innerHTML = "Temps restant : " + this.afficherTimer(counter);
            counter--;
            if (counter === 0) {
                timerElt.innerHTML = "Temps de réservation écoulé";
                sessionStorage.clear();
                clearInterval(timer);
            }
        }.bind(this), 1000);
    }

    initEvent() {

        document.getElementById('reserver').addEventListener('click', function () {

            $('#exampleModal').modal('hide');

            // sauvegarde ici en session
            this.saveInfosReservation();
            this.afficherInfosReservation();
            this.afficherTempsRestant();

        }.bind(this));
    }

}



