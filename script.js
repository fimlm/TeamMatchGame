// Limpiar la caché al iniciar el juego
localStorage.clear();

// Array de preguntas y respuestas
const questions = [
  {
    question: '🎨 ¿Qué Artista Prefieres?',
    options: ['Shakira', 'Karol G', 'Juan Gabriel', 'Joan Sebastian'],
    color: '',
  },
  {
    question: '🎵 ¿Qué Canción Prefieres?',
    options: [
      'Monotonía de Shakira',
      'Acróstico de Shakira',
      'Como tú decidas Joan Sebastian',
      'Oiga de Joan Sebastian',
    ],
    color: '',
  },
  {
    question: '✈️ ¿Qué Destino Prefieres Para Viajar?',
    options: ['Ciudad de Panamá', 'Punta Cana', 'Dubai', 'Singapur'],
    color: '',
  },
  {
    question: '🍹 ¿Qué Bebida Prefieres?',
    options: ['Coca-Cola', 'Limonada de Coco', 'Matcha', 'Té de Jamaica'],
    color: '',
  },
  {
    question: '🎥 ¿Qué Película Prefieres?',
    options: [
      'Lo que el viento se llevó',
      'Volver al futuro',
      'Harry Potter',
      'Matrix',
    ],
    color: '',
  },
  {
    question: '🚗 ¿Qué Carro Prefieres?',
    options: ['BMW', 'Mercedes', 'Porsche', 'Ferrari'],
    color: '',
  },
  {
    question: '💐 ¿Qué Flor Prefieres?',
    options: ['Margarita', 'Rosas', 'Tulipanes', 'Orquídeas'],
    color: '',
  },
  {
    question: '🍦 ¿Qué Sabor De Helado Prefieres?',
    options: ['Chocolate', 'Vainilla', 'Limón', 'Mandarina'],
    color: '',
  },
  {
    question: '📚 ¿Qué Libro Prefieres?',
    options: [
      'Crónica de una muerte anunciada',
      '1984',
      'La Biblia',
      'La historia de Europa',
    ],
    color: '',
  },
  {
    question: '🏈 ¿Qué Deporte Prefieres?',
    options: ['Fútbol', 'Ajedrez', 'Básquet', 'Tenis'],
    color: '',
  },
  {
    question: '🌈 ¿Qué Color Prefieres?',
    options: ['Rojo', 'Negro', 'Turquesa', 'Fucsia'],
    color: '',
  },
];

const pointGreenCalc = [
  { name: 'Shakira' },
  { name: 'Karol G' },
  { name: 'Monotonía de Shakira' },
  { name: 'Acróstico de Shakira' },
  { name: 'Ciudad de Panamá' },
  { name: 'Bocas del Toro' },
  { name: 'Coca-Cola' },
  { name: 'Limonada de Coco' },
  { name: 'Lo que el viento se llevó' },
  { name: 'Volver al futuro' },
  { name: 'BMW' },
  { name: 'Mercedes' },
  { name: 'Margarita' },
  { name: 'Rosas' },
  { name: 'Chocolate' },
  { name: 'Vainilla' },
  { name: 'Crónicas de una muerte anunciada' },
  { name: '1984' },
  { name: 'Fútbol' },
  { name: 'Ajedrez' },
  { name: 'Rojo' },
  { name: 'Negro' },
];

const pointPurpleCalc = [
  { name: 'Juan Gabriel' },
  { name: 'Joan Sebastian' },
  { name: 'Como tú decidas' },
  { name: 'Oiga de Joan Sebastian' },
  { name: 'Dubai' },
  { name: 'Singapur' },
  { name: 'Matcha' },
  { name: 'Té de Jamaica' },
  { name: 'Harry Potter' },
  { name: 'Matrix' },
  { name: 'Porsche' },
  { name: 'Ferrari' },
  { name: 'Tulipanes' },
  { name: 'Orquídeas' },
  { name: 'Limón' },
  { name: 'Mandarina' },
  { name: 'La Biblia' },
  { name: 'La historia de Europa' },
  { name: 'Básquet' },
  { name: 'Tenis' },
  { name: 'Turquesa' },
  { name: 'Fucsia' },
];

let currentQuestion = 0;
let teamColor = '';
let greenCount = 0;
let purpleCount = 0;
const questionElement = document.getElementById('questions');

questionElement.innerHTML = `<h1 class="subtitle">
<span class="green">Verdes</span>
    <img src="https://em-content.zobj.net/thumbs/120/twitter/348/crossed-swords_2694-fe0f.png" alt="vs" class="vs-image"> 
    <span class="purple"> Morados</span> 
  </h1>
  <p class="mensajeWelcome">¿Ya Sabes A Qué Equipo Perteneces? ¡Averigüémoslo!</p>
  <button style="margin-top: 5vmin" onclick="showQuestion(); toggleMusic()">Iniciar El Juego</button>`;

// Obtener el nombre del almacenamiento del navegador (localStorage)
const getNameFromStorage = () => {
  const name = localStorage.getItem('teamMatchName');
  return name ? name : '';
};

// Guardar el nombre en el almacenamiento del navegador (localStorage)
const saveNameToStorage = (name) => {
  localStorage.setItem('teamMatchName', name);
};

// Función para calcular el equipo
const calculateTeam = () => {
  let name = document.getElementById('name').value.trim();

  if (name === '') {
    return Swal.fire({
      title: 'Por Favor, Ingresa Un Nombre 🥺',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  // Validamos que no posea números
  const numeros = '0123456789';

  for (let i = 0; i < name.length; i++) {
    if (numeros.indexOf(name.charAt(i), 0) != -1) {
      return Swal.fire({
        title: 'Por Favor, Ingresa Un Nombre 🥺',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
    }
  }

  //  Validamos caracteres especiales
  const especiales = '!#$%&/()=?*¿¡¨][{}-+.';

  for (let i = 0; i < name.length; i++) {
    if (especiales.indexOf(name.charAt(i), 0) != -1) {
      return Swal.fire({
        title: 'Por Favor, Ingresa Un Nombre 🥺',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
    }
  }

  // Capitalización del nombre
  name = name.replace(/^\w/, (c) => c.toUpperCase());

  saveNameToStorage(name);

  const answer = document.querySelector('#answer');

  const clickedButton = event.target;

  // Obtener el valor del botón
  const buttonValue = clickedButton.value;

  console.log(buttonValue);

  if (!answer) {
    return Swal.fire({
      title: 'Por Favor, Selecciona Una Respuesta',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  if (pointGreenCalc.some((item) => item.name === buttonValue)) {
    greenCount++;
  } else if (pointPurpleCalc.some((item) => item.name === buttonValue)) {
    purpleCount++;
  }

  console.log(greenCount);

  if (greenCount > purpleCount) {
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
    <input autoComplete='off' placeholder="🧁 Nombre" type="text" id="name" value="${getNameFromStorage()}"><br>
    <h2 class='questionText'>${questions[currentQuestion].question}</h2>
    ${getOptionsHTML(questions[currentQuestion].options)}
  `;
};

// Función para obtener el HTML de las opciones de respuesta
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const getOptionsHTML = (options) => {
  let shuffledOptions = shuffleArray(options);
  let optionsHTML = '';
  for (const element of shuffledOptions) {
    optionsHTML += `
        <button value='${element}' onclick="calculateTeam()" name="answer" id='answer'> ${element} </button><br>
    `;
  }
  return optionsHTML;
};

// Función para seleccionar una respuesta
const selectAnswer = (optionIndex) => {
  console.log(optionIndex);
  const radioButtons = document.getElementsByName('answer');
  radioButtons[optionIndex].checked = true;
};
//Variable que contiene el audio del resultado
const resultAudio = new Audio('./media/audios/success.mp3');
// Función para mostrar el resultado
const showResult = () => {
  questionElement.innerHTML =
    "<img src='./media/img/giphy.gif' style='width: 8vmin; margin-bottom: 3vmin'><br><small style='color: #864c24; font-size: 38px;'>Cargando tu Equipo 😀</small>";

  questionElement.innerHTML =
    "<img src='./media/img/giphy.gif' style='width: 8vmin; margin-bottom: 3vmin'><br><small style='color: #864c24; font-size: 38px;'>Analizando match de equipo 😵</small>";

  setTimeout(() => {
    questionElement.innerHTML =
      '<h2>🎉🥳 <span id="teamColor"></span></h2><br><img id="cupcake" src="" alt="Cupcake"><br>';

    const teamColorElement = document.getElementById('teamColor');
    const cupcakeElement = document.getElementById('cupcake');

    const greenPoints = questions.filter((q) => q.color === 'Verde').length;
    const purplePoints = questions.filter((q) => q.color === 'Morado').length;

    console.log('Verdes => ', greenPoints);
    console.log('Morados => ', purplePoints);

    if (greenPoints > purplePoints) {
      teamColor = 'Eres Del Equipo Verde';
      teamColorElement.style.color = 'green';
      cupcakeElement.src = './media/img/CupCakeGreen.png';
      cupcakeElement.style.width = '35vmin';
    } else {
      teamColor = 'Eres Del Equipo Morado';
      teamColorElement.style.color = 'purple';
      cupcakeElement.src = './media/img/CupCakePurple.png';
      cupcakeElement.style.width = '35vmin';
    }

    const name = getNameFromStorage(); // Obtener el nombre del almacenamiento del navegador
    teamColorElement.textContent = `${name}, ${teamColor}`;
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
  const image = document.querySelector('.picture');

  let textColor = 'brown';
  let teamColorHTML = '';

  console.log(teamColor);

  if (teamColor === 'Eres Del Equipo Morado') {
    teamColorHTML = `<br><img src="./media/img/CupCakePurple.png" style="width: 20vmin"><br><span style="color: purple">${teamColor}</span>`;
  } else {
    teamColorHTML = `<br><img src="./media/img/CupCakeGreen.png" style="width: 20vmin"><br><span style="color: green">${teamColor}</span>`;
  }

  const mensaje = `🎉🥳 ¡Soy ${name}! 🎉🥳<br>`;

  image.innerHTML = `<img src="./media/img/logo.png"><p style="color: ${textColor}">${mensaje}</p>${teamColorHTML}`;

  image.style.display = 'block';

  convertImage(image);
};

const convertImage = (content) => {
  // Crear un lienzo Canvas
  const canvas = document.createElement('canvas');

  // Establecer el tamaño del lienzo según el contenido
  canvas.width = 3000;
  canvas.height = 2040;

  // Dibujar el contenido en el lienzo
  html2canvas(content).then((canvas) => {
    const highQualityImage = canvas.toDataURL('image/png', 1);
    const lowQualityImage = canvas.toDataURL('image/png', 0.5);

    Swal.fire({
      title: '¡Descarga y Comparte! 🎁',
      text: 'Haz clic en el botón para descargar la imagen o cierra esta ventana para verla aquí.',
      imageUrl: lowQualityImage,
      imageAlt: 'Team Match Result',
      showCancelButton: true,
      confirmButtonText: 'Descargar imagen',
      cancelButtonText: 'Cerrar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
        image: 'swal2-no-border',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
        image: 'swal2-no-border',
      },
      customClass: {
        title: 'resultado-title',
        htmlContainer: 'resultado-html-container',
        image: 'swal2-image',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const link = document.createElement('a');
        link.href = highQualityImage;
        link.download = 'team_match_result.png';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const imgElement = document.createElement('img');
        imgElement.src = highQualityImage;
        imgElement.style.width = '50%';

        Swal.fire({
          title: 'Resultado Del Team Match 🎁',
          html: imgElement.outerHTML,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
            image: 'swal2-no-border',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
            image: 'swal2-no-border',
          },
          customClass: {
            title: 'resultado-title',
            htmlContainer: 'resultado-html-container',
            image: 'swal2-image',
          },
        });
      }
    });

    const imagenDOM = document.querySelector('.picture');
    imagenDOM.style.display = 'none';
  });
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

const backgroundMusic = document.getElementById('backgroundMusic');
const playButton = document.getElementById('playButtonMenu');

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    const pausar =
      '<svg class="play" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>';
    playButton.innerHTML = 'Pausar Música ' + pausar;
  } else {
    backgroundMusic.pause();
    const play =
      '<svg class="play" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>';
    playButton.innerHTML = 'Iniciar Música ' + play;
  }
  backgroundMusic.volume = 0.5;
}

function playAudioAnswer() {
  const audioElement = document.getElementById('musicAnswer');
  audioElement.play();
}
