class Diaporama {

  constructor() {

    this.positionImage = 0; // on initialise la postion   
    this.addEvent();
    this.intervalID = setInterval(this.play, 2000, this);

  }

  play(diapo) {

    diapo.positionImage -= 100;
    if (diapo.positionImage < -300) {
      diapo.positionImage = 0;
    }
    document.querySelector('.sliders').style.left = diapo.positionImage + "%";
  };

  addEvent() {

    document.getElementById("pause").addEventListener('click', event => {

      document.getElementById("pause").style.display = 'none';
      document.getElementById("play").style.display = 'block';
      clearInterval(this.intervalID);

    });

    document.getElementById("play").addEventListener('click', event => {

      document.getElementById("play").style.display = 'none';
      document.getElementById("pause").style.display = 'block';
      this.intervalID = setInterval(this.play, 2000, this);

    });

    document.getElementById("boutonDroite").addEventListener('click', event => {

      this.play(this);
    });

    document.getElementById("boutonGauche").addEventListener('click', event => {

      this.positionImage += 100;
      if (this.positionImage > 0) {
        this.positionImage = -300;
      }
      document.querySelector('.sliders').style.left = this.positionImage + "%";
    });

    window.addEventListener("keydown", this.handleKey.bind(this), true);
  }

  handleKey(myevent) {

    if (myevent.defaultPrevented) {
      return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
    }

    switch (myevent.code) {

      case "ArrowLeft":
        // Faire quelque chose pour la touche "left arrow" pressée.
        console.log("Press key left");
        this.positionImage = this.positionImage + 100;

        if (this.positionImage > 0) {
          this.positionImage = -300;
        }
        document.querySelector('.sliders').style.left = this.positionImage + "%";
        break;
      case "ArrowRight":
        // Faire quelque chose pour la touche "right arrow" pressée.
        console.log("Press key right");
        this.play(this);
        break;

      case "Space":
        // Faire quelque chose pour la touche "esc" pressée.
        console.log("Press space");
        document.getElementById("pause").style.display = 'none';
        document.getElementById("play").style.display = 'block';
        clearInterval(this.intervalID);


        break;
      default:
        return; // Quitter lorsque cela ne gère pas l'événement touche.
    }

    // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
    myevent.preventDefault();

  }

}

let diapo = new Diaporama;


