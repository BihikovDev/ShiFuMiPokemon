// SELECTEURS
let resetBtn = document.querySelector("#reset");
let scorePlayer = document.querySelector("#score-joueur");
let scoreComputer = document.querySelector("#score-ordinateur");
let btnPlayer = [...document.getElementsByClassName("btn-joueur")];
let oBulbizarreBtn = document.querySelector("#obulbizarre");
let oCarapuceBtn = document.querySelector("#ocarapuce");
let oSalamecheBtn = document.querySelector("#osalameche");
let message = document.querySelector("#message");
let nextBtn = document.querySelector("#next");
let winrate = document.querySelector("#pourcentage-victoire");
let usersWin = 0;
let computersWin = 0;
let elementAudio = document.querySelector('#pokemonSound');

// FONCTIONS

// Réduire le son de la musique pour l'utilisateur
elementAudio.volume = 0.02;

// Variable pour lancer la manche et désactiver le bouton ensuite
const playGame = (e) => {
  let choix = e.target.closest(".btn-joueur");

  btnPlayer.forEach((btn) => {
    btn.classList.add("desactivated");
    btn.removeEventListener("click", playGame);
  });

  choix.classList.remove("desactivated");
  choix.classList.add("active");

  let choixJoueur = choix.id;

  let choixOrdi = faireChoixOrdinateur();

  verifierGagnant(choixJoueur, choixOrdi);

  nextBtn.style.visibility = "visible";
};

// Fonction choix aléatoire pour l'ordinateur
const faireChoixOrdinateur = () => {
  let nbAleatoire = Math.floor(Math.random() * 3);

  switch (nbAleatoire) {
    case 0:
      oBulbizarreBtn.classList.add("active");
      return bulbizarre;
    case 1:
      oCarapuceBtn.classList.add("active");
      return carapuce;
    default:
      oSalamecheBtn.classList.add("active");
      return salameche;
  }
};

// Déclaration des valeurs de chaque possibilité
const bulbizarre = "bulbizarre";
const carapuce = "carapuce";
const salameche = "salameche";

// Fonction pour vérifier le vainqueur et retourner un message selon le résultat
const verifierGagnant = (choixJoueur, choixOrdi) => {
  if (choixJoueur === choixOrdi) {
    message.innerHTML = "<span style='color:orange; font-size:30px'>Match nul, vos deux pokémons sont hors-jeu.</span>";
    return;
  }

  // Bulbizarre bat Carapuce, mais perd face à Salamèche
  if (choixJoueur === bulbizarre) {
    if (choixOrdi === carapuce) {
      return victoireJoueur();
    } else if (choixOrdi === salameche) {
      return victoireOrdinateur();
    }
  }

  // Carapuce bat Salamèche, mais perd face à Bulbizarre
  if (choixJoueur === carapuce) {
    if (choixOrdi === salameche) {
      return victoireJoueur();
    } else if (choixOrdi === bulbizarre) {
      return victoireOrdinateur();
    }
  }

  // Salamèche bat Bulbizarre, mais perd face à Carapuce
  if (choixJoueur === salameche) {
    if (choixOrdi === bulbizarre) {
      return victoireJoueur();
    } else if (choixOrdi === carapuce) {
      return victoireOrdinateur();
    }
  }
};

// En cas de victoire de l'ordinateur, le message.textContent est affiché sous le bouton
const victoireOrdinateur = () => {
  message.innerHTML = "<div class='winOrLooseMsg'><span style='color:#ff6565; font-size:30px' class='mb-3'>Vous avez perdu. Vous êtes hors jeu.</span> <img src=\"https://s12.gifyu.com/images/SWwGw.gif\" width=\"100%\" height=\"300px\"></div>";
  scoreComputer.textContent++;
  computersWin++;
  // Affiche de l'image LooserGif après 5 manches remportées par l'ordinateur
  if (computersWin === 5) {
    displayLooserGif();
    reset();
    winrate.textContent = "0%";
    usersWin = 0;
    computersWin = 0;
  }
  
  calculateWinrate();
};

// En cas de victoire de l'utilisateur, le message.textContent est affiché sous le bouton
const victoireJoueur = () => {
  message.innerHTML = "<div class='winOrLooseMsg'><span style='color:#90EE90; font-size:30px' class='mb-3'>Vous avez gagné. Votre adversaire est hors jeu.</span> <img src=\"https://media.tenor.com/7Nj-xYFfoi8AAAAd/pokemon-pocket-monsters.gif\" width=\"100%\" height=\"300px\"></div>";
  scorePlayer.textContent++;
  usersWin++;
  // Affichage de l'image fullscreen après 5 manches remportées
  if (usersWin === 5) {
    displayFullscreen();
    reset();
    winrate.textContent = "0%";
    usersWin = 0;
    computersWin = 0;
  }
  
  calculateWinrate();
};

// Fonction pour pouvoir relancer une manche
const newGame = () => {
  btnPlayer.forEach((btn) => {
    btn.classList.remove("desactivated");
    btn.classList.remove("active");
    btn.addEventListener("click", playGame);
  });

  // Cache le bouton lorsque le choix est effectué et validé
  nextBtn.style.visibility = "hidden";

  oBulbizarreBtn.classList.remove("active");
  oCarapuceBtn.classList.remove("active");
  oSalamecheBtn.classList.remove("active");

  message.textContent = "A vous de jouer !";
};

// Ajout d'un événement permettant de réinitialiser les stats et recommencer une partie
const reset = () => {
  scorePlayer.textContent = 0;
  scoreComputer.textContent = 0;
  totalVictoires = 0
  winrate.textContent = "0%";

  newGame();
}
reset()

resetBtn.addEventListener("click", reset)
nextBtn.addEventListener("click", newGame);
btnPlayer.forEach((btn) => btn.addEventListener("click", playGame));

// Fonction pour calculer le pourcentage de victoire de l'utilisateur
const calculateWinrate = () => {
  let totalVictoires = usersWin + computersWin;
  if (totalVictoires === 0) {
    winrate.textContent = "0%";
  } else {
    let pourcentage = (usersWin / totalVictoires) * 100;
    winrate.textContent = `${pourcentage.toFixed(2)}%`;
  }
};
calculateWinrate()

// Fonction pour afficher l'image en plein écran, selon le résultat
const displayFullscreen = () => {
  const fullscreenElement = document.querySelector("#fullscreen");
  fullscreenElement.classList.add("fullscreen-gif");
  fullscreenElement.style.backgroundImage = "url(https://64.media.tumblr.com/f566549a6cc6295b682fa26ce1606f8f/ddb594a3ece418dc-e1/s540x810/4898348b15ce6adc550b7de45bb2b3b3e1d47b75.gif)";
  // image disparaît après 5 secondes
  setTimeout(function() {
    fullscreenElement.style.display = "none";
}, 5000);
};

const displayLooserGif = () => {
    const fullscreenLoose = document.querySelector("#fullscreen");
    fullscreenLoose.classList.add("fullscreen-gif");
    fullscreenLoose.style.backgroundImage = "url(https://media.tenor.com/7C6H6TQk-D8AAAAC/pokemon-ash.gif)";
    // image disparaît après 5 secondes
    setTimeout(function() {
      fullscreenLoose.style.display = "none";
  }, 5000);
};

// Réinitialise le jeu après image 
