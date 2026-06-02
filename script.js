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

//**
//  * 3. Gestión de Movimiento e Interacción del Mouse:
//  * - Variable de control para saber si el mouse está presionado.
//  * - Efecto Imán para el Título Principal (siempre activo al mover el mouse).
//  * - Efecto Desaparecer para los Nombres de Estudiantes (siempre activo al mover el mouse).
//  * - Creación de la Estela de Estrellitas (SOLO si el mouse está presionado).

let mousePresionado = false; // Variable de control para la estela

// Detectar cuando el usuario presiona el click en cualquier parte de la página
document.addEventListener("mousedown", (e) => {
  mousePresionado = true;
  // Generar una primera estrella inmediatamente en el punto del click
  crearEstrellaEstela(e.clientX, e.clientY);
});

// Detectar cuando el usuario suelta el click
document.addEventListener("mouseup", () => {
  mousePresionado = false;
});

// Detectar si el mouse sale de la ventana para apagar el efecto de forma segura
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

  // --- B. NUEVO EFECTO: DISTORSIÓN DE BASELINE ALEATORIA (Para las letras de los estudiantes) ---
  const letrasDesaparecen = document.querySelectorAll(".letra-desaparece"); // Mantenemos la clase por compatibilidad
  letrasDesaparecen.forEach((span) => {
    const rect = span.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    const radioEfecto = 70; // Distancia a la que el mouse empieza a desordenar las letras

    if (distance < radioEfecto) {
      // Si el mouse está cerca y la letra no se ha movido en este ciclo, le asignamos una altura loca
      // Usamos un atributo personalizado para que no cambie de posición miles de veces por segundo de forma epiléptica
      if (!span.dataset.movido) {
        // Genera un número aleatorio entre -15px (arriba) y 15px (abajo)
        const desalineacionAleatoria = (Math.random() - 0.5) * 30;

        span.style.transform = `translateY(${desalineacionAleatoria}px)`;
        span.style.color = "#ff3700"; // Opcional: cambia a tu color de acento rojo/naranja al alterarse
        span.dataset.movido = "true";
      }
    } else {
      // Si el mouse se aleja, la letra regresa suavemente a su renglón original
      span.style.transform = `translateY(0px)`;
      span.style.color = "";
      span.removeAttribute("data-movido");
    }
  });

  // --- C. EFECTO: ESTELA DE ESTRELLITAS (CONDICIONAL) ---
  // Solo se ejecuta si la variable mousePresionado es verdadera (true)
  if (mousePresionado) {
    crearEstrellaEstela(e.clientX, e.clientY);
  }
});

/**
 * Función auxiliar para generar las estrellas de la estela (Se mantiene igual)
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

/**
 * Función de utilidad matemática tipo map() de p5.js (Se mantiene igual)
 */
function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
