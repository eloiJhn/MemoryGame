import { game } from './game.js';

var temps = 0;
const timerElement = document.getElementById("timer");

function upTime() {
  timerElement.innerText = temps;
  temps++;
}

// lance le jeu dès que la page est chargée
window.onload = game;
