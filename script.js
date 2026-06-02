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
 * Función reutilizable para añadir el efecto de vibración vertical en hover a un elemento contenedor
 */
function aplicarEfectoLetrasVibrantes(elementoContenedor) {
  elementoContenedor.addEventListener("mouseenter", () => {
    const spans = elementoContenedor.querySelectorAll(".letra-vibrante");
    spans.forEach((span) => {
      // Genera un desfase de altura aleatorio individual entre -12px y 12px
      const desalineacionAleatoria = (Math.random() - 0.5) * 24;
      span.style.transform = `translateY(${desalineacionAleatoria}px)`;
    });
  });

  elementoContenedor.addEventListener("mouseleave", () => {
    const spans = elementoContenedor.querySelectorAll(".letra-vibrante");
    spans.forEach((span) => {
      span.style.transform = `translateY(0px)`;
    });
  });
}

/**
 * 1. Carga de datos y generación de la lista de estudiantes
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
      link.classList.add("enlace-estudiante");

      // --- Fragmentar nombre en letras individuales ---
      const nombreCompleto = `${est.first} ${est.last}`;
      nombreCompleto.split("").forEach((letra) => {
        const span = document.createElement("span");
        span.textContent = letra === " " ? "\u00A0" : letra;
        span.classList.add("letra-vibrante");
        link.appendChild(span);
      });

      // Asignar los eventos de hover al enlace del estudiante
      aplicarEfectoLetrasVibrantes(link);

      li.appendChild(link);
      lista.appendChild(li);
    });

    // Una vez cargada la lista, preparamos el título y los textos del cuerpo
    prepararTitulo();
    prepararTextosParrafos();
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
    span.classList.add("letra-magnetica");
    titulo.appendChild(span);
  });
}

/**
 * 3. NUEVO: Preparación de palabras clave dentro de los párrafos del HTML
 */
function prepararTextosParrafos() {
  const frasesAFraccionar = document.querySelectorAll(".vibrar-frase");

  frasesAFraccionar.forEach((contenedor) => {
    const textoOriginal = contenedor.textContent;
    contenedor.innerHTML = ""; // Limpiamos el texto plano
    contenedor.classList.add("texto-vibrante-contenedor");

    // Convertimos cada letra de la palabra destacada en spans independientes
    textoOriginal.split("").forEach((letra) => {
      const span = document.createElement("span");
      span.textContent = letra === " " ? "\u00A0" : letra;
      span.classList.add("letra-vibrante");
      contenedor.appendChild(span);
    });

    // Le aplicamos la misma lógica de hover que tienen los estudiantes
    aplicarEfectoLetrasVibrantes(contenedor);
  });
}

/**
 * 4. Gestión de Interacción Global y Estela de Estrellitas
 */
let mousePresionado = false;

document.addEventListener("mousedown", (e) => {
  mousePresionado = true;
  crearEstrellaEstela(e.clientX, e.clientY);
});

document.addEventListener("mouseup", () => {
  mousePresionado = false;
});

document.addEventListener("mouseleave", () => {
  mousePresionado = false;
});

document.addEventListener("mousemove", (e) => {
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

  // --- B. EFECTO: ESTELA DE ESTRELLITAS CONDICIONAL ---
  if (mousePresionado) {
    crearEstrellaEstela(e.clientX, e.clientY);
  }
});

/**
 * Función auxiliar para generar las estrellas de la estela
 */
function crearEstrellaEstela(x, y) {
  const estrella = document.createElement("div");
  estrella.classList.add("star-trail");
  estrella.textContent = "★";

  const size = Math.random() * 12 + 8;
  const offsetX = (Math.random() - 0.5) * 15;
  const offsetY = (Math.random() - 0.5) * 15;

  estrella.style.left = `${x + offsetX}px`;
  estrella.style.top = `${y + offsetY}px`;
  estrella.style.fontSize = `${size}px`;

  const colores = ["#99ff00", "#8dd1ff", "#ff3700", "#ffffff", "#ffff00"];
  estrella.style.color = colores[Math.floor(Math.random() * colores.length)];

  document.body.appendChild(estrella);

  setTimeout(() => {
    estrella.remove();
  }, 1200);
}
