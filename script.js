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
  <p class="mensajeWelcome">¿Sabes a qué equipo perteneces? <br>¡Averigüémoslo!</p>
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
    function getRandomColor() {
      const colors = ['#800080', '#02C627'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }

    const randomBackgroundColor = getRandomColor();

    Swal.fire({
      title: 'Por favor, ingresa un nombre',
      width: 600,
      padding: '3em',
      color: '#864c24',
      confirmButtonColor: randomBackgroundColor,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      backdrop: `
        rgba(0,0,123,0.4)
        url("/media/gif/nyan-cat.gif")
        left top
        no-repeat
      `,
    });

    playAudioError();

    return;
  }

  // Validamos que no posea números
  const numeros = '0123456789';

  for (let i = 0; i < name.length; i++) {
    if (numeros.indexOf(name.charAt(i), 0) != -1) {
      function getRandomColor() {
        const colors = ['#800080', '#02C627'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      }

      const randomBackgroundColor = getRandomColor();

      Swal.fire({
        title: 'Por favor, no ingreses números',
        width: 600,
        padding: '3em',
        color: '#864c24',
        confirmButtonColor: randomBackgroundColor,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
        backdrop: `
        rgba(0,0,123,0.4)
        url("/media/gif/nyan-cat.gif")
        left top
        no-repeat
      `,
      });

      playAudioError();

      return;
    }
  }

  //  Validamos caracteres especiales
  const especiales = '><!#$%&/()=?*¿¡¨][{}-+.';

  for (let i = 0; i < name.length; i++) {
    if (especiales.indexOf(name.charAt(i), 0) != -1) {
      function getRandomColor() {
        const colors = ['#800080', '#02C627'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      }

      const randomBackgroundColor = getRandomColor();

      Swal.fire({
        title: 'Por favor, cambia tu nombre',
        width: 600,
        padding: '3em',
        color: '#864c24',
        confirmButtonColor: randomBackgroundColor,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
        backdrop: `
        rgba(0,0,123,0.4)
        url("/media/gif/nyan-cat.gif")
        left top
        no-repeat
      `,
      });

      playAudioError();

      return;
    }
  }

  // Capitalización del nombre
  name = name.replace(/^\w/, (c) => c.toUpperCase());

  saveNameToStorage(name);

  const answer = document.querySelector('#answer');

  const clickedButton = event.target;

  // Obtener el valor del botón
  const buttonValue = clickedButton.value;

  if (!answer) {
    function getRandomColor() {
      const colors = ['#800080', '#02C627'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }

    const randomBackgroundColor = getRandomColor();

    Swal.fire({
      title: 'Por favor, selecciona una respuesta',
      width: 600,
      padding: '3em',
      color: '#864c24',
      confirmButtonColor: randomBackgroundColor,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      backdrop: `
      rgba(0,0,123,0.4)
      url("./media/gif/nyan-cat.gif")
      left top
      no-repeat
    `,
    });

    playAudioError();

    return;
  }

  if (pointGreenCalc.some((item) => item.name === buttonValue)) {
    greenCount++;
  } else if (pointPurpleCalc.some((item) => item.name === buttonValue)) {
    purpleCount++;
  }

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
  const radioButtons = document.getElementsByName('answer');
  radioButtons[optionIndex].checked = true;
};
//Variable que contiene el audio del resultado
const resultAudio = new Audio('./media/audios/success.mp3');
// Función para mostrar el resultado
const showResult = () => {
  questionElement.innerHTML =
    "<img src='./media/img/CupCake.gif' style='width: 20vmin; margin-bottom: 3vmin'><br><small style='color: #864c24; font-size: 38px;'>Analizando match de equipo 🥳</small>";

  setTimeout(() => {
    questionElement.innerHTML = `
      <div id="miDescarga" class="miDescarga" style="">
        <h2>🥳 <span id="teamColor"></span></h2>
        </div>
        `;

    const teamColorElement = document.getElementById('teamColor');

    const greenPoints = questions.filter((q) => q.color === 'Verde').length;
    const purplePoints = questions.filter((q) => q.color === 'Morado').length;

    if (greenPoints > purplePoints) {
      teamColor = 'Eres del Equipo Verde';
      teamColorElement.style.color = 'green';

      // Obtén una referencia a la div
      const miDescargaElement = document.getElementById('miDescarga');
      miDescargaElement.style.backgroundImage =
        "url('./media/img/Ponquesito-Verde.jpg')";
    } else {
      teamColor = 'Eres del Equipo Morado';
      teamColorElement.style.color = 'purple';
      const miDescargaElement = document.getElementById('miDescarga');
      miDescargaElement.style.backgroundImage =
        "url('./media/img/Ponquesito-Morado.jpg')";
    }

    const name = getNameFromStorage(); // Obtener el nombre del almacenamiento del navegador
    teamColorElement.textContent = `${name}, ${teamColor}`;
    //Reproduce al dar el resultado
    resultAudio.play();
    questionElement.innerHTML +=
      '<button class="descarga" onclick="descarga()">Descargar y Compartir</button>';
  }, 3000);
};

// Función para compartir en redes sociales
const shareOnSocialMedia = async () => {
  const name = getNameFromStorage();
  const image = document.querySelector('.picture');

  let textColor = 'brown';
  let teamColorHTML = '';

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
      width: 600,
      padding: '3em',
      color: '#864c24',
      text: 'Haz clic en el botón para descargar la imagen o cierra esta ventana para verla aquí.',
      imageUrl: lowQualityImage,
      imageAlt: 'Team Match Result',
      showCancelButton: true,
      confirmButtonText: 'Descargar imagen',
      confirmButtonColor: randomBackgroundColor,
      cancelButtonText: 'Cerrar',
      cancelButtonColor: randomBackgroundColor,
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
      backdrop: `
      rgba(0,0,123,0.4)
      url("/media/gif/nyan-cat.gif")
      left top
      no-repeat
    `,
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
          width: 600,
          padding: '3em',
          color: '#864c24',
          html: imgElement.outerHTML,
          confirmButtonColor: randomBackgroundColor,
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
          backdrop: `
          rgba(0,0,123,0.4)
          url("/media/gif/nyan-cat.gif")
          left top
          no-repeat
        `,
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

function playAudioError() {
  const audioElement = document.getElementById('audioError');
  audioElement.play();
}

function descarga() {
  // Captura la div utilizando html2canvas
  html2canvas(document.getElementById('miDescarga')).then(function (canvas) {
    // Crea un enlace para descargar la imagen
    let link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'Mi-Equipo-23.jpg';

    let event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    link.dispatchEvent(event);
  });

  //targetDescarga()
}
function targetDescarga() {
  // Captura la div utilizando html2canvas
  let event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  link.dispatchEvent(event);
}
