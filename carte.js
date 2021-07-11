class Carte {
    constructor(latitude, longitude, mapid) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.mapid = mapid; // div dans laquelle il y aura la map
        this.init(); //fonction initialisation
        this.getStations(); //recupere les sations api
        this.markers = L.markerClusterGroup(); // visuel markerscluster groupés
        this.eventMessages();
        this.compteur = new Compteur;
    }

    init() {
        this.map = L.map(this.mapid).setView([this.latitude, this.longitude], 13);

        /* création du calque images avec tileLayer */
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {

            maxZoom: 18, //leaflet
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(this.map);
    }

    createMarker(iconMarker, station) {
        var marker = L.marker([station.position.latitude, station.position.longitude], { icon: iconMarker })
            .on('click', function (e) {
                this.displayInfos(station);

            }.bind(this));
        return marker;

    };

    displayInfos(station) {
        document.getElementById("address").innerHTML = station.address;
        document.getElementById("status").innerHTML = station.status;
        document.getElementById("velosDisponibles").innerHTML = "<span id='nombreVelosDisponibles'>"
            + station.totalStands.availabilities.bikes + "</span> vélo(s) disponible(s)";
        document.getElementById("capacity").innerHTML = "Peut contenir " + station.totalStands.capacity + " vélos au total";
    };

    getStations() {

        $.getJSON("https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=8cc71f7150d2dd31d7ef8708e55eaef66b515519",
            function (stations) { //stations vient de la réponse du serveur de JC decaux

                var redMarker = L.AwesomeMarkers.icon({
                    prefix: 'fa',
                    icon: "bicycle",
                    markerColor: 'red'
                });
                var greenMarker = L.AwesomeMarkers.icon({
                    prefix: 'fa',
                    icon: "bicycle",
                    markerColor: 'green'
                });


                stations.forEach((station) => { // début de la boucle pour chaque station

                    if (station.status == "OPEN") {
                        station.status = "Ouverte";
                    } else {
                        station.status = "Fermée";
                    }

                    let marker = null;
                    if (station.totalStands.availabilities.bikes > 0) {
                        marker = this.createMarker(greenMarker, station);
                    }

                    else {
                        marker = this.createMarker(redMarker, station);
                    }

                    this.markers.addLayer(marker);
                    this.map.addLayer(this.markers);

                }

                )
            }.bind(this)) // le bind permet d'utiliser le this comme sur le diapo

    }

    eventMessages() {

        document.querySelector('#validForm').addEventListener('click', event => {
            document.getElementById('erreur').style.display = "none";

            let nombreVelosDisponibles = '';

            if (document.querySelector('#nombreVelosDisponibles')) {
                nombreVelosDisponibles = document.querySelector('#nombreVelosDisponibles').textContent;

            }

            if (nombreVelosDisponibles > 0
                && document.querySelector('#nomForm:valid')
                && document.querySelector('#prenomForm:valid')) {
                $('#exampleModal').modal('show');

            } else {
                let messageErreur = '';

                if (document.getElementById('address').textContent == '') {
                    messageErreur += '<div class="alert alert-danger" role="alert"> Aucune station sélectionnée </div>';
                }
                if (document.querySelector('#nomForm:invalid')) {
                    messageErreur += '<div class="alert alert-danger" role="alert"> Nom invalide </div> ';
                }
                if (document.querySelector('#prenomForm:invalid')) {
                    messageErreur += '<div class="alert alert-danger" role="alert"> Prénom invalide </div>  ';
                }

                if (nombreVelosDisponibles == 0) {
                    messageErreur += '<div class="alert alert-danger" role="alert"> Aucun vélo disponible </div>';
                }
                document.getElementById('erreur').style.display = "block";
                document.getElementById('erreur').innerHTML = messageErreur;
            }

        });
    }



}


var nantes = new Carte(
    47.230042,
    -1.554222,
    'map');






