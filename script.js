// Array de preguntas y respuestas
const questions = [
    { question: 'Artistas: ¿Shakira y Karol G (A) o Juan Gabriel y Jean Sebastian (B)?', color: '' },
    { question: 'Canciones: ¿Monotonía y Acróstico de Shakira (A) o Como tú decidas y Oiga de Joan Sebastian (B)?', color: '' },
    { question: 'Destinos a los que te gustaría viajar: ¿Ciudad de Panamá y Bocas del Toro (A) o Dubai y Singapur (B)?', color: '' },
    { question: 'Bebidas: ¿Coca cola y Limonada de coco (A) o Matcha y Té de Jamaica (B)?', color: '' },
    { question: 'Películas: ¿Lo que el viento se llevó y Volver al futuro (A) o Harry Potter y Matrix (B)?', color: '' },
    { question: 'Carros: ¿BMW y Mercedes (A) o Porsche y Ferrari (B)?', color: '' },
    { question: 'Flores: ¿Margarita y Rosas (A) o Tulipanes y Orquídeas (B)?', color: '' },
    { question: 'Sabores de helado: ¿Chocolate y Vainilla (A) o Limón y Mandarina (B)?', color: '' },
    { question: 'Libros: ¿Crónicas de una muerte anunciada y 1984 (A) o La Biblia y La historia de Europa (B)?', color: '' },
    { question: 'Deportes o juegos: ¿Fútbol y Ajedrez (A) o Básquet y Tenis (B)?', color: '' },
    { question: 'Colores: ¿Rojo y Negro (A) o Turquesa y Fucsia (B)?', color: '' }
];

let currentQuestion = 0;
let teamColor = '';

// Obtener el nombre del almacenamiento del navegador (localStorage)
function getNameFromStorage() {
    const name = localStorage.getItem('teamMatchName');
    return name ? name : '';
}

// Guardar el nombre en el almacenamiento del navegador (localStorage)
function saveNameToStorage(name) {
    localStorage.setItem('teamMatchName', name);
}

// Función para calcular el equipo
function calculateTeam() {
    const name = document.getElementById('name').value.trim();
    
    if (name === '') {
        alert('Por favor, ingresa tu nombre.');
        return;
    }
    
    saveNameToStorage(name); // Guardar el nombre en el almacenamiento del navegador
    
    const answer = document.querySelector('input[name="answer"]:checked');
    
    if (!answer) {
        alert('Por favor, selecciona una respuesta.');
        return;
    }
    
    questions[currentQuestion].color = answer.value;
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

// Función para mostrar la pregunta actual
function showQuestion() {
    const questionElement = document.getElementById('questions');
    questionElement.innerHTML = `
        <label for="name">Nombre:</label>
        <input type="text" id="name" value="${getNameFromStorage()}"><br><br>
        <h2>${questions[currentQuestion].question}</h2>
        <input type="radio" name="answer" value="A"> A
        <input type="radio" name="answer" value="B"> B
        <br><br>
        <button onclick="calculateTeam()">Siguiente pregunta</button>
    `;
}

// Función para mostrar el resultado
function showResult() {
    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';
    
    const teamColorElement = document.getElementById('teamColor');
    const cupcakeElement = document.getElementById('cupcake');
    
    if (questions.filter(q => q.color === 'A').length > questions.filter(q => q.color === 'B').length) {
        teamColor = 'verde';
        teamColorElement.style.color = 'green';
        cupcakeElement.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqm7Qj7afcE3BPS6Lg4a0gF0hwtZx87xr2g&usqp=CAU?w=200';
    } else {
        teamColor = 'morado';
        teamColorElement.style.color = 'purple';
        cupcakeElement.src = 'https://img.freepik.com/premium-vector/cupcake-blueberry-cream-sweet-cake-desert-vector-illustration_526280-678.jpg?w=200';
    }
    
    const name = getNameFromStorage(); // Obtener el nombre del almacenamiento del navegador
    teamColorElement.textContent = `${name}, tu equipo es el ${teamColor}`;
}

// Función para compartir en redes sociales
function shareOnSocialMedia() {
    // Aquí puedes agregar la lógica para compartir en redes sociales
    alert(`Compartiendo en redes sociales: ¡Soy del equipo ${teamColor}!`);
}

// Mostrar la primera pregunta al cargar la página
showQuestion();
