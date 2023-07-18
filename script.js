// Limpiar la caché al iniciar el juego
localStorage.clear();
// Array de preguntas y respuestas
const questions = [
  {
    question: "🎨 ¿Qué artista prefieres?",
    options: ["Shakira", "Karol G", "Juan Gabriel", "Jean Sebastian"],
    color: "",
  },
  {
    question: "🎵 ¿Qué canción prefieres?",
    options: [
      "Monotonía de Shakira",
      "Acróstico de Shakira",
      "Como tú decidas Joan Sebastian",
      "Oiga de Joan Sebastian",
    ],
    color: "",
  },
  {
    question: "✈️ ¿Qué destino prefieres para viajar?",
    options: ["Ciudad de Panamá", "Punta Cana", "Dubai", "Singapur"],
    color: "",
  },
  {
    question: "🍹 ¿Qué bebida prefieres?",
    options: ["Coca-Cola", "Limonada de Coco", "Matcha", "Té de Jamaica"],
    color: "",
  },
  {
    question: "🎥 ¿Qué película prefieres?",
    options: [
      "Lo que el viento se llevó",
      "Volver al futuro",
      "Harry Potter",
      "Matrix",
    ],
    color: "",
  },
  {
    question: "🚗 ¿Qué carro prefieres?",
    options: ["BMW", "Mercedes", "Porsche", "Ferrari"],
    color: "",
  },
  {
    question: "💐 ¿Qué flor prefieres?",
    options: ["Margarita", "Rosas", "Tulipanes", "Orquídeas"],
    color: "",
  },
  {
    question: "🍦 ¿Qué sabor de helado prefieres?",
    options: ["Chocolate", "Vainilla", "Limón", "Mandarina"],
    color: "",
  },
  {
    question: "📚 ¿Qué libro prefieres?",
    options: [
      "Crónicas de una muerte anunciada",
      "1984",
      "La Biblia",
      "La historia de Europa",
    ],
    color: "",
  },
  {
    question: "🏈 ¿Qué deporte prefieres?",
    options: ["Fútbol", "Ajedrez", "Básquet", "Tenis"],
    color: "",
  },
  {
    question: "🌈 ¿Qué color prefieres?",
    options: ["Rojo", "Negro", "Turquesa", "Fucsia"],
    color: "",
  },
];

const pointGreenCalc = [
  {name: 'Shakira' },
  {name: 'Karol G' },
  {name: 'Monotonía de Shakira' },
  {name: 'Acróstico de Shakira' },
  {name: 'Ciudad de Panamá' },
  {name: 'Bocas del Toro' },
  {name: 'Coca-Cola' },
  {name: 'Limonada de Coco' },
  {name: 'Lo que el viento se llevó' },
  {name: 'Volver al futuro' },
  {name: 'BMW' },
  {name: 'Mercedes' },
  {name: 'Margarita' },
  {name: 'Rosas' },
  {name: 'Chocolate' },
  {name: 'Vainilla' },
  {name: 'Crónicas de una muerte anunciada' },
  {name: '1984' },
  {name: 'Fútbol' },
  {name: 'Ajedrez' },
  {name: 'Rojo' },
  {name: 'Negro' }
];

const pointPurpleCalc = [
  {name: 'Juan Gabriel' },
  {name: 'Jean Sebastian' },
  {name: 'Como tú decidas' },
  {name: 'Oiga de Joan Sebastian' },
  {name: 'Dubai' },
  {name: 'Singapur' },
  {name: 'Matcha' },
  {name: 'Té de Jamaica' },
  {name: 'Harry Potter' },
  {name: 'Matrix' },
  {name: 'Porsche' },
  {name: 'Ferrari' },
  {name: 'Tulipanes' },
  {name: 'Orquídeas' },
  {name: 'Limón' },
  {name: 'Mandarina' },
  {name: 'La Biblia' },
  {name: 'La historia de Europa' },
  {name: 'Básquet' },
  {name: 'Tenis' },
  {name: 'Turquesa' },
  {name: 'Fucsia' } 
];

let currentQuestion = 0;
let teamColor = '';
let greenCount = 0;
let redCount = 0;
const questionElement = document.getElementById('questions');

questionElement.innerHTML =
  `<h1 class="subtitle">
    <span class="purple"> Morados</span> 
    <img src="https://em-content.zobj.net/thumbs/120/twitter/348/crossed-swords_2694-fe0f.png" alt="vs" class="vs-image"> 
    <span class="green">Verdes</span>
  </h1>
  <p class="mensajeWelcome">¿Ya sabes a qué equipo perteneces? ¡Averigüémoslo!</p>
  <button style="margin-top: 5vmin" onclick="showQuestion(); toggleMusic()">Iniciar el juego</button>`;

// Obtener el nombre del almacenamiento del navegador (localStorage)
const getNameFromStorage = () => {
  const name = localStorage.getItem("teamMatchName");
  return name ? name : "";
};

// Guardar el nombre en el almacenamiento del navegador (localStorage)
const saveNameToStorage = (name) => {
  localStorage.setItem("teamMatchName", name);
};

// Función para calcular el equipo
const calculateTeam = () => {
  let name = document.getElementById("name").value.trim();

  if (name === "") {
    return Swal.fire({
      title: "Por Favor, Ingresa Un Nombre 🥺",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }

  // Validamos que no posea números
  const numeros = "0123456789";

  for (i = 0; i < name.length; i++) {
    if (numeros.indexOf(name.charAt(i), 0) != -1) {
      return Swal.fire({
        title: "Por Favor, Ingresa Un Nombre 🥺",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  }

  //  Validamos caracteres especiales
  const especiales = "!#$%&/()=?*¿¡¨][{}-+.";

  for (i = 0; i < name.length; i++) {
    if (especiales.indexOf(name.charAt(i), 0) != -1) {
      return Swal.fire({
        title: "Por Favor, Ingresa Un Nombre 🥺",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  }

  // Capitalización del nombre
  name = name.replace(/^\w/, (c) => c.toUpperCase());

  saveNameToStorage(name);

  const answer = document.querySelector('#answer');
  //const answer = document.getElementsByClassName('answer');

  const clickedButton = event.target;
  
  // Obtener el valor del botón
  const buttonValue = clickedButton.value;


  console.log(buttonValue);

  if (!answer) {
    return Swal.fire({
      title: "Por favor, selecciona una respuesta",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }

  

  if (pointGreenCalc.some(item => item.name === buttonValue)) {
    greenCount++;
  } else if (pointPurpleCalc.some(item => item.name === buttonValue)) {
    redCount++;
  }

console.log(greenCount);
console.log(redCount);

  //let optionIndex = parseInt(answer.value.length);
  let optionIndex = answer.value;

  //console.log(optionIndex);

  if (greenCount > redCount) {
    questions[currentQuestion].color = 'Verde';
  } else {
    questions[currentQuestion].color = "Morado";
  }
  if (optionIndex <= 9) {
    questions[currentQuestion].color = 'Verde';
  } else {
    questions[currentQuestion].color = 'Morado';
  } 

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    playAudioAnswer();
    showQuestion();
  } else {
    showResult();
  }
};

// Función para mostrar la pregunta actual
const showQuestion = () => {
  questionElement.innerHTML = `
    <input placeholder="🧁 Nombre" type="text" id="name" value="${getNameFromStorage()}"><br>
    <h2 class='questionText'>${questions[currentQuestion].question}</h2>
    ${getOptionsHTML(questions[currentQuestion].options)}
  `;
};

// Función para obtener el HTML de las opciones de respuesta
const getOptionsHTML = (options) => {
  let optionsHTML = "";
  for (let i = 0; i < options.length; i++) {
    optionsHTML += `
        <button value='${options[i]}' onclick="calculateTeam()" name="answer" id='answer'> ${options[i]} </button><br>
    `;
  }
  return optionsHTML;
};

// Función para seleccionar una respuesta
const selectAnswer = (optionIndex) => {
  console.log(optionIndex)
  const radioButtons = document.getElementsByName('answer');
  radioButtons[optionIndex].checked = true;
};
//Variable que contiene el audio del resultado
const resultAudio = new Audio("./media/audios/success.mp3");
// Función para mostrar el resultado
const showResult = () => {
  questionElement.innerHTML =
    "<img src='./media/img/giphy.gif' style='width: 8vmin; margin-bottom: 3vmin'><br><small>Cargando tu Equipo 😀</small>";
  questionElement.innerHTML =
    "<img src='./media/img/giphy.gif' style='width: 8vmin; margin-bottom: 3vmin'><br><small>Analizando match de equipo 😵</small>";

  setTimeout(() => {
    questionElement.innerHTML =
      '<h2>🎉🥳 <span id="teamColor"></span></h2><br><img id="cupcake" src="" alt="Cupcake"><br>';

    const teamColorElement = document.getElementById("teamColor");
    const cupcakeElement = document.getElementById("cupcake");

    const greenPoints = questions.filter((q) => q.color === "Verde").length;
    const purplePoints = questions.filter((q) => q.color === "Morado").length;

    console.log("Verdes => ", greenPoints);
    console.log("Morados => ", purplePoints);

    if (greenPoints > purplePoints) {
      teamColor = "Soy del Equipo Verde";
      teamColorElement.style.color = "green";
      cupcakeElement.src = "./media/img/CupCakeGreen.png";
      cupcakeElement.style.width = "35vmin";
    } else {
      teamColor = "Soy del Equipo Morado";
      teamColorElement.style.color = "purple";
      cupcakeElement.src = "./media/img/CupCakePurple.png";
      cupcakeElement.style.width = "35vmin";
    }

    const name = getNameFromStorage(); // Obtener el nombre del almacenamiento del navegador
    teamColorElement.textContent = `${name}, quedaste en el ${teamColor}`;
    //Reproduce al dar el resultado
    resultAudio.play();
    questionElement.innerHTML +=
      '<button onclick="shareOnSocialMedia()">Descargar y Compartir</button>';
  }, 3000);

  // captureResultImage(); // Generar imagen con el resultado
};

// Función para compartir en redes sociales
const shareOnSocialMedia = async () => {
  const name = getNameFromStorage();
  const image = document.querySelector(".picture");

  let textColor = "brown";
  let teamColorHTML = "";

  if (teamColor === "Equipo Morado") {
    teamColorHTML = `<br><img src="./media/img/CupCakePurple.png" style="width: 20vmin"><br><span style="color: purple">${teamColor}</span>`;
  } else {
    teamColorHTML = `<br><img src="./media/img/CupCakeGreen.png" style="width: 20vmin"><br><span style="color: green">${teamColor}</span>`;
  }

  const mensaje = `🎉🥳 ¡Soy ${name}! 🎉🥳<br>`;

  image.innerHTML = `<img src="./media/img/logo.png"><p style="color: ${textColor}">${mensaje}</p>${teamColorHTML}`;

  image.style.display = "block";

  await convertImage(image);
};

const convertImage = (content) => {
  // Crear un lienzo Canvas
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Establecer el tamaño del lienzo según el contenido
  canvas.width = 1500;
  canvas.height = 1020;

  // Dibujar el contenido en el lienzo
  html2canvas(content).then((canvas) => {
    const image = canvas.toDataURL();

    Swal.fire({
      title: "¡Descarga y Comparte! 🎁",
      text: "Haz clic en el botón para descargar la imagen o cierra esta ventana para verla aquí.",
      imageUrl: image,
      imageAlt: "Team Match Result",
      showCancelButton: true,
      confirmButtonText: "Descargar imagen",
      cancelButtonText: "Cerrar",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
        image: "swal2-no-border",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
        image: "swal2-no-border",
      },
      customClass: {
        title: "resultado-title",
        htmlContainer: "resultado-html-container",
        image: "swal2-image",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const link = document.createElement("a");
        link.href = image;
        link.download = "team_match_result.png";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.style.width = "100%";

        Swal.fire({
          title: "Resultado del Team Match 🎁",
          html: imgElement.outerHTML,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
            image: "swal2-no-border",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
            image: "swal2-no-border",
          },
          customClass: {
            title: "resultado-title",
            htmlContainer: "resultado-html-container",
            image: "swal2-image",
          },
        });
      }
    });

    const imagenDOM = document.querySelector(".picture");
    imagenDOM.style.display = "none";
  });
};

const recargarSitio = () => {
  Swal.fire(
    "¡Gracias por participar!",
    "Esperamos ver la imagen de tu equipo 😀",
    "success"
  );
  setTimeout(() => {
    localStorage.removeItem("teamMatchName");
    window.location.reload();
  }, 5000);
};

// Función para obtener un arreglo de preguntas en orden aleatorio
const getRandomQuestions = () => {
  const randomQuestions = [...questions];
  for (let i = randomQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomQuestions[i], randomQuestions[j]] = [
      randomQuestions[j],
      randomQuestions[i],
    ];
  }
  return randomQuestions;
};

// Mostrar las preguntas en orden aleatorio
const randomQuestions = getRandomQuestions();
questions.splice(0, questions.length, ...randomQuestions);

const backgroundMusic = document.getElementById("backgroundMusic");
const playButton = document.getElementById("playButton");

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    playButton.innerHTML = "<img src='./media/img/Pause.png' alt='Pause'>";
  } else {
    backgroundMusic.pause();
    playButton.innerHTML = "<img src='./media/img/Play.png' alt='Pause'>";
  }
  backgroundMusic.volume = 0.5;
}

function playAudioAnswer() {
  const audioElement = document.getElementById("musicAnswer");
  audioElement.play();
}
