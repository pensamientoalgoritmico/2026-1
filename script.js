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

      // --- Fragmentar nombre en letras individuales ---
      const nombreCompleto = `${est.first} ${est.last}`;
      nombreCompleto.split("").forEach((letra) => {
        const span = document.createElement("span");
        span.textContent = letra === " " ? "\u00A0" : letra;
        span.classList.add("letra-desajustada"); // Clase limpia para la distorsión vertical
        link.appendChild(span);
      });

      // --- EFECTO POR FILA: Detectar cuando el mouse entra a este enlace específico ---
      link.addEventListener("mouseenter", () => {
        const spans = link.querySelectorAll(".letra-desajustada");
        spans.forEach((span) => {
          // Genera un desfase de altura aleatorio individual entre -12px y 12px
          const desalineacionAleatoria = (Math.random() - 0.5) * 24;
          span.style.transform = `translateY(${desalineacionAleatoria}px)`;
        });
      });

      // --- EFECTO POR FILA: Detectar cuando el mouse sale de este enlace para regresar a su sitio ---
      link.addEventListener("mouseleave", () => {
        const spans = link.querySelectorAll(".letra-desajustada");
        spans.forEach((span) => {
          span.style.transform = `translateY(0px)`;
        });
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
    span.classList.add("letra-magnetica");
    titulo.appendChild(span);
  });
}

/**
 * 3. Gestión de Interacción Global y Estela de Estrellitas
 * - Control de variables para arrastrar/presionar el mouse.
 * - Efecto imán del título principal.
 */
let mousePresionado = false;

// Detectar click inicial para activar la estela instantáneamente
document.addEventListener("mousedown", (e) => {
  mousePresionado = true;
  crearEstrellaEstela(e.clientX, e.clientY);
});

// Desactivar la estela al soltar el click
document.addEventListener("mouseup", () => {
  mousePresionado = false;
});

// Desactivar de forma segura si el mouse sale de la ventana del navegador
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
  // Solo dibuja la estela si el usuario tiene el mouse presionado
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

  // Valores aleatorios para que la estela se vea orgánica y dinámica
  const size = Math.random() * 12 + 8; // Tamaños entre 8px y 20px
  const offsetX = (Math.random() - 0.5) * 15; // Pequeña dispersión horizontal
  const offsetY = (Math.random() - 0.5) * 15; // Pequeña dispersión vertical

  estrella.style.left = `${x + offsetX}px`;
  estrella.style.top = `${y + offsetY}px`;
  estrella.style.fontSize = `${size}px`;

  // Paleta de colores brillantes para las estrellas
  const colores = ["#99ff00", "#8dd1ff", "#ff3700", "#ffffff", "#ffff00"];
  estrella.style.color = colores[Math.floor(Math.random() * colores.length)];

  document.body.appendChild(estrella);

  // Remueve el elemento del DOM una vez que la animación CSS termina (1.2s)
  setTimeout(() => {
    estrella.remove();
  }, 1200);
}
