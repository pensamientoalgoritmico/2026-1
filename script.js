/**
 * Configuración y utilidades
 */
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

/**
 * 1. Carga de datos y generación de la lista
 */
fetch("estudiantes.json")
  .then((response) => response.json())
  .then((data) => {
    const lista = document.getElementById("lista-estudiantes");

    data.forEach((est) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const folderName = `${normalizeText(est.last)}-${normalizeText(est.first)}`;

      link.href = `estudiantes/${folderName}/index.html`;

      // --- Fragmentar nombre en letras ---
      const nombreCompleto = `${est.first} ${est.last}`;
      nombreCompleto.split("").forEach((letra) => {
        const span = document.createElement("span");
        span.textContent = letra === " " ? "\u00A0" : letra;
        span.classList.add("letra-desaparece"); // Nueva clase para el efecto de desvanecimiento
        link.appendChild(span);
      });

      li.appendChild(link);
      lista.appendChild(li);
    });

    prepararTitulo();
  });

/**
 * 2. Preparación del título (letras individuales que mantienen el efecto imán original)
 */
function prepararTitulo() {
  const titulo = document.getElementById("tituloPrincipal");
  const texto = titulo.textContent;
  titulo.innerHTML = "";

  texto.split("").forEach((letra) => {
    const span = document.createElement("span");
    span.textContent = letra === " " ? "\u00A0" : letra;
    span.classList.add("letra-magnetica"); // El título sigue usando el imán
    titulo.appendChild(span);
  });
}

/**
 * 3. Gestión de Movimiento del Mouse:
 * - Efecto Imán para el Título Principal
 * - Efecto Desaparecer para los Nombres de Estudiantes
 * - Creación de la Estela de Estrellitas
 */
document.addEventListener("mousemove", (e) => {
  const actualTime = Date.now();

  // --- A. EFECTO IMÁN (Solo para el título principal) ---
  const letrasMagneticas = document.querySelectorAll(".letra-magnetica");
  letrasMagneticas.forEach((span) => {
    const rect = span.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const radioEfecto = 80;

    if (distance < radioEfecto) {
      const fuerza = (radioEfecto - distance) / 2;
      const moveX = (distanceX / distance) * -fuerza;
      const moveY = (distanceY / distance) * -fuerza;

      span.style.transform = `translate(${moveX}px, ${moveY}px)`;
      span.style.color = "#99ff00";
    } else {
      span.style.transform = `translate(0, 0)`;
      span.style.color = "";
    }
  });

  // --- B. NUEVO EFECTO: DESAPARECER (Para las letras de los estudiantes) ---
  const letrasDesaparecen = document.querySelectorAll(".letra-desaparece");
  letrasDesaparecen.forEach((span) => {
    const rect = span.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    const radioDesvanecer = 60; // Distancia en píxeles a la que empiezan a desaparecer

    if (distance < radioDesvanecer) {
      // Mapea la opacidad de forma que entre más cerca esté el mouse, más invisible sea (0)
      let opacidad = mapRange(distance, 0, radioDesvanecer, 0, 1);
      span.style.opacity = opacidad;
    } else {
      span.style.opacity = 1; // Totalmente visible si el mouse está lejos
    }
  });

  // --- C. NUEVO EFECTO: ESTELA DE ESTRELLITAS ---
  crearEstrellaEstela(e.clientX, e.clientY);
});

/**
 * Función auxiliar para generar las estrellas de la estela
 */
function crearEstrellaEstela(x, y) {
  const estrella = document.createElement("div");
  estrella.classList.add("star-trail");
  estrella.textContent = "★";

  // Variaciones aleatorias para un look orgánico y mágico
  const size = Math.random() * 12 + 8; // Tamaños aleatorios entre 8px y 20px
  const offsetX = (Math.random() - 0.5) * 15; // Pequeña dispersión horizontal
  const offsetY = (Math.random() - 0.5) * 15; // Pequeña dispersión vertical

  estrella.style.left = `${x + offsetX}px`;
  estrella.style.top = `${y + offsetY}px`;
  estrella.style.fontSize = `${size}px`;

  // Colores aleatorios brillantes (puedes ajustar esta paleta si lo deseas)
  const colores = ["#99ff00", "#8dd1ff", "#ff3700", "#ffffff", "#ffff00"];
  estrella.style.color = colores[Math.floor(Math.random() * colores.length)];

  document.body.appendChild(estrella);

  // Se remueve de la pantalla una vez termine su animación CSS (1.2 segundos)
  setTimeout(() => {
    estrella.remove();
  }, 1200);
}

/**
 * Función de utilidad matemática tipo map() de p5.js
 */
function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
