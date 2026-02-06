/* NAVIGATION: To handle the transition from landing to game */
var landing = document.querySelector(".landing");
var gameWrapper = document.querySelector(".game-wrapper");

document.querySelector(".js-start").addEventListener("click", function () {
  landing.style.display = "none";
  gameWrapper.style.display = "block";
});

/* DATA: To store the quiz questions and answers */
var questions = [
  {
    text: "Puedes alojar un sitio web estático en Amazon S3 usando un bucket configurado para hosting estático.",
    correct: true,
  },
  {
    text: "Para usar Amazon S3 como hosting estático necesitas instalar Apache dentro del bucket.",
    correct: false,
  },
  {
    text: "Para que un sitio web en S3 sea público debes permitir acceso de solo lectura a los objetos.",
    correct: true,
  },
  {
    text: "Los sitios estáticos en S3 incluyen automáticamente una base de datos.",
    correct: false,
  },
  {
    text: "Amazon S3 puede servir HTML, CSS y JavaScript sin servidores web tradicionales.",
    correct: true,
  },
];

/* STATE: To track the current game progress */
var index = 0;
var started = false;
var finished = false;

var startScreen = document.querySelector(".start-screen");
var lcdContent = document.querySelector(".lcd-content");
var questionText = document.querySelector(".question-text");
var nodes = document.querySelectorAll(".path-node");

/* RENDER: To update the UI with the current question and progress nodes */
function render() {
  questionText.textContent = questions[index].text;
  nodes.forEach(function (n, i) {
    n.classList.toggle("current", i === index);
    n.classList.toggle("visited", i < index);
  });
}

/* ERROR: To show feedback when the answer is wrong */
function showError() {
  questionText.textContent = "¡Ups! Por ahí no es.";
}

/* END GAME: To display the final success message and cat image */
function showEnd() {
  finished = true;
  startScreen.style.display = "flex";
  lcdContent.style.display = "none";

  startScreen.innerHTML = `
    <div class="start-box">
      <img src="img/gato_explorador_final.png" class="hero-avatar final" alt="Gato explorador final" />
      <p style="font-size: 1.6rem; line-height: 1.5;">
        ¡Enhorabuena!<br>
        Accede a nuestra <strong>PetDex en la nube</strong> para conocer a todas las criaturas de AWS.
      </p>
      <div class="hint">Pulsa V para continuar</div>
    </div>`;

  nodes.forEach(function (n) {
    n.classList.remove("current");
    n.classList.add("visited");
  });
}

/* LOGIC: To validate the user's answer and move forward */
function handleAnswer(answer) {
  if (finished) return;
  if (answer === questions[index].correct) {
    if (index < questions.length - 1) {
      index++;
      render();
    } else {
      showEnd();
    }
  } else {
    showError();
  }
}

/* INPUTS: To listen for clicks on the console buttons */
document.querySelector(".btn-true").addEventListener("click", function () {
  if (finished) {
    window.location.href = "https://cbueno82.github.io/petdex.github.io/";
    return;
  }
  // // Legacy S3 lab URL (kept for reference, no longer active) http://amzn-s3-petdex4.s3-website-us-west-2.amazonaws.com/

  if (!started) {
    started = true;
    startScreen.style.display = "none";
    lcdContent.style.display = "flex";
    render();
    return;
  }

  handleAnswer(true);
});

document.querySelector(".btn-false").addEventListener("click", function () {
  if (!started) return;
  handleAnswer(false);
});

/* RESET: To reload the page and restart the application */
document.querySelector(".reset-button").addEventListener("click", function () {
  window.location.reload();
});
