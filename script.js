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
      "Como tú decidas",
      "Oiga de Joan Sebastian",
    ],
    color: "",
  },
  {
    question: "✈️ ¿Qué destino prefieres para viajar?",
    options: ["Ciudad de Panamá", "Bocas del Toro", "Dubai", "Singapur"],
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

let currentQuestion = 0;
let teamColor = "";
const questionElement = document.getElementById("questions");

questionElement.innerHTML =
  '<h1 class="subtitle">💜 Morados vs Verdes 💚</h1><p class="mensajeWelcome">¿Ya sabes a que equipo perteneces?. ¡Averigüémoslo!</p><button style="margin-top: 5vmin" onclick="showQuestion()">Iniciar el juego</button>';

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
      title: "Por favor, ingresa un nombre 🥺",
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
        title: "Por favor, ingresa un nombre 🥺",
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
        title: "Por favor, ingresa un nombre 🥺",
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

  const answer = document.querySelector("#answer");

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

  let optionIndex = parseInt(answer.value.length);

  console.log(optionIndex);

  if (optionIndex <= 11) {
    questions[currentQuestion].color = "Verde";
  } else {
    questions[currentQuestion].color = "Morado";
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResult();
  }
};

// Función para mostrar la pregunta actual
const showQuestion = () => {
  questionElement.innerHTML = `
    <input placeholder="💚 Tu Nombre 💜" type="text" id="name" value="${getNameFromStorage()}"><br>
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
  const radioButtons = document.getElementsByName("answer");
  radioButtons[optionIndex].checked = true;
};
//Variable que contiene el audio del resultado
const resultAudio = new Audio("./media/audios/success.mp3");
// Función para mostrar el resultado
const showResult = () => {
  questionElement.innerHTML =
    "<img src='./media/img/giphy.gif' style='width: 8vmin; margin-bottom: 3vmin'><br><small>Cargando tu Equipo 😀</small>";

  setTimeout(() => {
    questionElement.innerHTML =
      '<h2>🧁🎉🥳 <span id="teamColor"></span></h2><br><img id="cupcake" src="" alt="Cupcake"><br><button onclick="shareOnSocialMedia()">Imagen de recordatorio</button>';

    const teamColorElement = document.getElementById("teamColor");
    const cupcakeElement = document.getElementById("cupcake");

    const greenPoints = questions.filter((q) => q.color === "Verde").length;
    const purplePoints = questions.filter((q) => q.color === "Morado").length;

    console.log("Verdes => ", greenPoints);
    console.log("Morados => ", purplePoints);

    if (greenPoints > purplePoints) {
      teamColor = "Equipo Verde";
      teamColorElement.style.color = "green";
      cupcakeElement.src = "./media/img/CupCakeGreen.png";
      cupcakeElement.style.width = "20vmin";
    } else {
      teamColor = "Equipo Morado";
      teamColorElement.style.color = "purple";
      cupcakeElement.src = "./media/img/CupCakePurple.png";
      cupcakeElement.style.width = "20vmin";
    }

    const name = getNameFromStorage(); // Obtener el nombre del almacenamiento del navegador
    teamColorElement.textContent = `${name}, tu equipo es ${teamColor}`;
  }, 3000);
  // captureResultImage(); // Generar imagen con el resultado
};

// Función para compartir en redes sociales
const shareOnSocialMedia = async () => {
  const name = getNameFromStorage();
  const image = document.querySelector(".picture");

  if (teamColor === "Equipo Morado") {
    teamColor = `<br><img src="./media/img/CupCakePurple.png" styly="width: 20vmin"><br><span style="color: purple">${teamColor}</span>`;
  } else {
    teamColor = `<br><img src="./media/img/CupCakeGreen.png" styly="width: 20vmin"><br><span style="color: green">${teamColor}</span>`;
  }

  const mensaje = `🧁🎉🥳 ¡Hola ${name}!🧁🎉🥳<br>Tu equipo es ${teamColor}`;

  image.innerHTML = `<img src="./media/img/logo.png"><p>${mensaje}</p>`;

  image.style.display = "block";

  await convertImage(image);
};

const convertImage = (content) => {
  // Crear un lienzo Canvas
  const canvas = document.createElement("canvas");
  // const context = canvas.getContext('2d');

  // Establecer el tamaño del lienzo según el contenido
  canvas.width = 1500;
  canvas.height = 1020;

  // Dibujar el contenido en el lienzo
  html2canvas(content).then((canvas) => {
    return new Promise((resolve, reject) => {
      html2canvas(content)
        .then((canvas) => {
          const image = canvas.toDataURL();

          Swal.fire({
            title: "💚 TeamMatch  💜",
            text: `🧁🎉🥳 ¡Descarga y Comparte! 🧁🎉🥳`,
            imageUrl: image,
            imageWidth: 350,
            imageHeight: 300,
            imageAlt: "Imagen TeamMatch ",
          });

          const imagenDOM = document.querySelector(".picture");
          imagenDOM.style.display = "none";

          setTimeout(() => {
            recargarSitio();
          }, 10000);

          resolve(image);
        })
        .catch((error) => {
          reject(error);
        });
    });
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

const toggleMusic = () => {
  // Music
  const backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.volume = 0.1; // Establecer el volumen al 30%
  backgroundMusic.play();
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    playButton.textContent = "⏯️";
  } else {
    backgroundMusic.pause();
    playButton.textContent = "▶️";
  }
};
