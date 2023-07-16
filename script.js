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

questionElement.innerHTML = '<h1>¡Hola!</h1>soy el juego Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velioves pain itself, who seeks after it and wants to have it, simply because it is pain<br><button style="margin-top: 5vmin" onclick="showQuestion()">Iniciar el juego</button>';

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

    saveNameToStorage(name); // Guardar el nombre en el almacenamiento del navegador

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

    const optionIndex = parseInt(answer.value);
    questions[currentQuestion].color =
        questions[currentQuestion].options[optionIndex];

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
        <button value='${i}' onclick="calculateTeam()" name="answer" id='answer'> ${options[i]} </button><br>
    `;
    }
    return optionsHTML;
};

// Función para seleccionar una respuesta
const selectAnswer = (optionIndex) => {
    const radioButtons = document.getElementsByName("answer");
    radioButtons[optionIndex].checked = true;
};

// Función para mostrar el resultado
const showResult = () => {
    questionElement.innerHTML =
        "<img src='./media/img/giphy.gif' style='width: 8vmin; margin-bottom: 3vmin'><br><small>Cargando tu Equipo 😀</small>";

    setTimeout(() => {
        questionElement.innerHTML =
            '<h2>🧁🎉🥳 <span id="teamColor"></span></h2><br><img id="cupcake" src="" alt="Cupcake"><br><button onclick="shareOnSocialMedia()">Imagen de recordatorio</button>';

        const teamColorElement = document.getElementById("teamColor");
        const cupcakeElement = document.getElementById("cupcake");

        const greenPoints = questions.filter(
            (q) => q.color === "Equipo Verde"
        ).length;
        const purplePoints = questions.filter(
            (q) => q.color === "Equipo Morado"
        ).length;

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

// Función para capturar y descargar la imagen del resultado
const captureResultImage = () => {
    const resultElement = document.getElementById("result");

    // Crea un nuevo elemento <div> para clonar el contenido del resultado
    const clone = resultElement.cloneNode(true);
    clone.style.width = `390px`; // Establece el ancho del clon igual al ancho original
    clone.style.height = `844px`; // Establece la altura del clon igual a la altura original
    clone.style.overflow = "visible"; // Asegura que el contenido completo sea visible
    // Agregué el clon al documento
    document.body.appendChild(clone);

    // Uso html2canvas para capturar el clon y convertirlo en un canvas
    html2canvas(clone).then(function (canvas) {
        // Obtiene la imagen como base64
        const dataUrl = canvas.toDataURL();

        // Crea un enlace de descarga con la imagen generada
        const link = document.createElement("a");
        link.href = dataUrl; // Establece la URL de la imagen generada
        link.download = "Cumpleaños FIMLM.png"; // Nombre del archivo de descarga
        link.textContent = "Descargar imagen";

        // Agrega el enlace de descarga sin borrar el contenido anterior
        resultElement.appendChild(link);

        // Remueve el clon del documento
        document.body.removeChild(clone);
    });
    setTimeout(() => {
        questionElement.innerHTML =
            '<h2>🧁🎉🥳 <span id="teamColor"></span></h2><div><button onclick="shareOnSocialMedia()">Descargar recordatorio para compartir en redes sociales</button></div>';

        const teamColorElement = document.getElementById("teamColor");
        const cupcakeElement = document.getElementById("cupcake");

        const greenPoints = questions.filter(
            (q) => q.color === "Equipo Verde"
        ).length;
        const purplePoints = questions.filter(
            (q) => q.color === "Equipo Morado"
        ).length;

        if (greenPoints > purplePoints) {
            teamColor = "Equipo Verde";
            teamColorElement.style.color = "green";
            cupcakeElement.src = "./media/img/cupcake.verde.png?w=200";
        } else {
            teamColor = "Equipo Morado";
            teamColorElement.style.color = "purple";
            cupcakeElement.src = "./media/img/cupcake.morado.png?w=200";
        }

        const name = getNameFromStorage(); // Obtener el nombre del almacenamiento del navegador
        teamColorElement.textContent = `${name}, quedaste en el ${teamColor}`;
    }, 2000);
};

// Función para compartir en redes sociales
const shareOnSocialMedia = () => {
    const name = getNameFromStorage();

    let mensaje = `¡Hola ${name}! Tu equipo es ${teamColor}`;

    // alert(`Compartiendo en redes sociales: ¡Soy del ${teamColor}!`);
    Swal.fire({
        title: '💚 TeamMatch FIMLM 💜',
        text: mensaje,
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Imagen TeamMatch FIMLM',
    })
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
}