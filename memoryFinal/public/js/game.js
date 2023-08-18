var clubImages = []; //initialisation de mon tab
//var selectedImages = [];
//var nombreDeCopie = 2;
var firstCard = null; //variable qui va nous servir pour la méthode de vérification
//toWin et counterWin pour faire les verif
var toWin = 0; 
var counterWin = 0;

export function fillImages() {
  //clubImages.push : permet d'ajouter nos images
   clubImages.push({image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rocket_League_coverart.jpg/600px-Rocket_League_coverart.jpg", value: "rocket"});
   clubImages.push({image: "https://www.pngmart.com/files/13/GTA-V-Logo-PNG-Image.png", value: "gta"});   
   clubImages.push({image: "https://images.cults3d.com/4QqRV9kLYYEuw9ur_X3yjQl1sjk=/516x516/https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400.png", value: "cults3d"});
   clubImages.push({image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png", value: "fortnite"});
   clubImages.push({image :"https://upload.wikimedia.org/wikipedia/fr/thumb/4/4c/Dead_by_Daylight_logo.png/288px-Dead_by_Daylight_logo.png", value: "Jeu"});
   clubImages.push({image: "https://mlusk6kjzisu.i.optimole.com/YKEId9o.ilWF~5b8b8/w:768/h:461/q:75/id:bd5195fd5859051f23aeb71574d71bbf/https://logo-creation.com/0_G1qbpF9w8fCvz3O8.png", value:"logocreation"});
   clubImages.push({image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png", value: "xbox"});

   clubImages=clubImages.concat(clubImages);// on fait une concaténation de ma fonction fillImages avec mon
   //tab clubImages

   clubImages.push({image:"https://media.senscritique.com/media/000013989711/source_big/Hugo_Le_Miroir_malefique.jpg", value: "joker"});
   clubImages.sort((a, b) => 0.5 - Math.random()); // permet de mélanger aléatoirement les cartes
   toWin = (clubImages.length - 1) / 2; //permet de dire que pour gagner une partie le score doit être de 7/7
   //toWin=1
}


export function displayImages() {
    const divContainer =  document.querySelector("#mainContainer");
    // pour chaque image
    for (let i = 0; i < clubImages.length; i++) {

        const element = clubImages[i];
        // créer un div
        const newDiv = document.createElement("div");
        // créer une image => HTML
        const newImage = document.createElement("img");
        newImage.src = element.image;
      
        //Permet d'ajouter un nouvel attribut à une nouvelle image
        newImage.setAttribute("answer", element.value);

        // attacher l'image au div
        newDiv.appendChild(newImage);
        // attacher le div au div container
        divContainer.appendChild(newDiv);
    }
   
}
//cette fonction permet d'ajouter une carte en face cachée
//grâce au back sur toutes les images
export function hideImages() {
   const allIMages =  document.querySelectorAll("img");
   allIMages.forEach( i =>  {
       i.className = 'back'
    })
}

//fonction permettant de créer un score reprenant les variables counterWin et toWin
export function setScore(){
  const score = document.querySelector("#score");
  score.innerHTML = counterWin + "/" + toWin;


}

//fonction qui va nous permettre de vérifier si nos 2 cartes qu'on a sélectionnés
// counterWin et toWin sont les mêmes et qu'il y a une égalité
// et elles resteront retournés
export function checkVictory(){
  if(counterWin == toWin){
    counterWin = 0;
    const allIMages =  document.querySelectorAll("img");
    //une fois que les 7 pairs ont étaitent trouvés,
    //un message s'affiche en disant qu'on a gagné
    //Puis la page se reload pour faire une nouvelle partie
    setTimeout(() => {
      allIMages.forEach( i =>  {
        i.classList.add("back");
      })

      window.location.reload()
    }, 3000);
    alert("Bravo tu as gagné la partie !")
  }
}

//fonction qui prend la carte mystique et qui fait perdre la partie 
//elle remet le score à 0 et le time aussi
export function badCard(){
  counterWin = 0;
  toWin = 0;
  const allIMages =  document.querySelectorAll("img");
  setTimeout(() => {
    allIMages.forEach( i =>  {
      i.classList.add("back");
    })
    window.location.reload()//permet de reload ma page 
    alert("Perdu, la page va se recharger !")
  }, 1000);
  score.innerHTML = 0 + "/" + toWin; //permet de remettre le score à 0


}
//Fonction pour faire la vérif sur les cartes qui ne correspondent pas 
export function toggle(e) // e est l'argument de notre fonction (event)
// que nous allons prendre avec "e.target"
{
  if(!e.target.classList.contains("back")) return alert("Déja sélectionné")  // ! : signifie si null/différent

  if(e.target.getAttribute("answer") == "joker") // référence à l'événement de la carte joker
  //getAttribute permet de renvoyer la valeur de mon attribut
  {
    
    e.target.classList.remove("back");
    return badCard() // permet de retourner l'action badcard qui fait recommencer la partie
  };

  if(!firstCard){ // ! : l'inverse d'une expression 
    firstCard = e.target
    e.target.classList.remove("back"); //permet d'enlever le back

  } else {
    if(!e.target.classList.contains("back")) return alert("already selected");// si on a déja sélectionné une carte
    // alors elle retourna un message disant qu'elle a déjà était sélectionnée
    e.target.classList.remove("back");


    if(firstCard.getAttribute("answer") == e.target.getAttribute("answer")){
      counterWin++;
      firstCard = null;
      alert("Bravo tu as trouvé !")
      // si il y a une égalité parfaite entre les deux cartes fistCard et e.target
      // alors un message nous dira qu'on a trouvé une pair
      
      checkVictory();
    } else {
      setTimeout(() => {
        firstCard.classList.add("back");
        e.target.classList.add("back");
        firstCard = null;
        alert("Et non ce n'est pas les mêmes !")
      }, 200); // si les deux cartes ne sont pas les mêmes alors on
      //le back se remettra et un message nous dire que ce n'était pas les mêmes cartes
    }

  }
  setScore()
}

//cette fonction va déclencher l'action par un clique de 
//retourner chaque carte back par nos autres cartes en
//utilisant la fonction "toggle"
export function addEvent() 
{

    const allIMages =  document.querySelectorAll("img");
    allIMages.forEach( i =>  {
       i.addEventListener('click', toggle )
    })
}
  //déclaration de mon timer en prennant l'id de timer dans l'html 
  var temps = 0;
  const timerElement = document.getElementById("timer")
  

// fonction qui va incrémenter le temps en reprenant la variable "temps"
function upTime()
{
timerElement.innerText = temps
temps ++
}

//création d'une fonction game qui englobe toutes nos fonctions sauf jouer
//car grâce à cette fonction game nous allons pouvoir lancer le jeux en un click sur un bouton dans une fonction jouer
export function game (){
  
fillImages();
displayImages();
hideImages();
addEvent();
setScore()
upTime();
setInterval(upTime, 1000)

}
