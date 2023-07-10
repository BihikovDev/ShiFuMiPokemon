// SELECTEURS
let resetBtn = document.querySelector("#reset");
let scoreJoueur = document.querySelector("#score-joueur");
let scoreOrdinateur = document.querySelector("#score-ordinateur");
let btnJoueur = [...document.getElementsByClassName("btn-joueur")];
let oBulbizarreBtn = document.querySelector("#obulbizarre");
let oCarapuceBtn = document.querySelector("#ocarapuce");
let oSalamecheBtn = document.querySelector("#osalameche");
let message = document.querySelector("#message");
let nextBtn = document.querySelector("#next");
let pourcentageVictoire = document.querySelector("#pourcentage-victoire");
let victoiresUtilisateur = 0;
let victoiresOrdinateur = 0;
let elementAudio = document.querySelector('#pokemonSound')

// FONCTIONS

// Réduire le son de la musique pour l'utilisateur
elementAudio.volume = 0.02;

// Variable pour lancer la manche et désactiver le bouton ensuite
const jouerManche = (e) => {
    let choix = e.target.closest(".btn-joueur");

    btnJoueur.forEach((btn) => {
        btn.classList.add("desactivated");
        btn.removeEventListener("click", jouerManche);
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
// Déclaration des valeurs de chaque possibilités
const bulbizarre = "bulbizarre";
const carapuce = "carapuce";
const salameche = "salameche";
// Fonction pour vérifier le vainqueur et retourner un message selon le résultat
const verifierGagnant = (choixJoueur, choixOrdi) => {
    if (choixJoueur == choixOrdi) {
        message.innerHTML = "<span style='color:orange; font-size:30px'>Match nul, vos deux pokémons sont hors-jeu.</span>"
        return;
    }
// Bulbizarre bat Carapuce, mais perd face à Salamèche
    if (choixJoueur == bulbizarre) {
        if (choixOrdi == carapuce) {
            return victoireJoueur();
        } else if (choixOrdi == salameche) {
            return victoireOrdinateur();
        }
    }
// Carapuce bat Salamèche, mais perd face à Bulbizarre
    if (choixJoueur == carapuce) {
        if (choixOrdi == salameche) {
            return victoireJoueur();
        } else if (choixOrdi == bulbizarre) {
            return victoireOrdinateur();
        }
    }
// Salamèche bat Bulbizarre, mais perd face à Carapuce
    if (choixJoueur == salameche) {
        if (choixOrdi == bulbizarre) {
            return victoireJoueur();
        } else if (choixOrdi == carapuce) {
            return victoireOrdinateur();
        }
    }
};
// En cas de victoire de l'ordinateur, le message.textContent est affiché sous le bouton
const victoireOrdinateur = () => {
    message.innerHTML = "<div class='winOrLooseMsg'><span style='color:#ff6565; font-size:30px' class='mb-3'>Vous avez perdu. Vous êtes hors jeu.</span> <img src=\"../assets/img/loose.gif\" width=\"600px\" height=\"300px\"></div>"
    scoreOrdinateur.textContent++;
    victoiresOrdinateur++;
    calculerPourcentageVictoire();
};
// En cas de victoire de l'utilisateur, le message.textContent est affiché sous le bouton
const victoireJoueur = () => {
    message.innerHTML = "<div class='winOrLooseMsg'><span style='color:#90EE90; font-size:30px' class='mb-3'>Vous avez gagné. Votre adversaire est hors jeu.</span> <img src=\"https://media.tenor.com/7Nj-xYFfoi8AAAAd/pokemon-pocket-monsters.gif\" width=\"600px\" height=\"300px\"></div>"
    scoreJoueur.textContent++;
    victoiresUtilisateur++;
    calculerPourcentageVictoire();
};
// Fonction pour pouvoir relancer une manche
const preparerNouvelleManche = () => {
    btnJoueur.forEach((btn) => {
        btn.classList.remove("desactivated");
        btn.classList.remove("active");
        btn.addEventListener("click", jouerManche);
    });
// Cache le bouton lorsque le choix est effectué et validé
    nextBtn.style.visibility = "hidden";

    oBulbizarreBtn.classList.remove("active");
    oCarapuceBtn.classList.remove("active");
    oSalamecheBtn.classList.remove("active");

    message.textContent = "A vous de jouer !";
};
// Ajout d'un événement permettant de réinitialiser les stats et recommencer une partie
resetBtn.addEventListener("click", () => {
    scoreJoueur.textContent = 0;
    scoreOrdinateur.textContent = 0;
    pourcentageVictoire.textContent = "0%";

    preparerNouvelleManche();
});

nextBtn.addEventListener("click", preparerNouvelleManche);

btnJoueur.forEach((btn) => btn.addEventListener("click", jouerManche));


// AFFICHAGE IMAGE PLEIN ECRAN


// Fonction pour calculer le pourcentage de victoire de l'utilisateur
const calculerPourcentageVictoire = () => {
  let totalVictoires = victoiresUtilisateur + victoiresOrdinateur;
  if (totalVictoires === 0) {
    pourcentageVictoire.textContent = "0%";
  } else {
    let pourcentage = (victoiresUtilisateur / totalVictoires) * 100;
    pourcentageVictoire.textContent = `${pourcentage.toFixed(2)}%`;
  }
};
calculerPourcentageVictoire()