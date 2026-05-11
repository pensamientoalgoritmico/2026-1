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

let nombresEstudiantes = [];

/**
 * 1. Carga de datos y generación de la lista
 */
fetch("estudiantes.json")
  .then((response) => response.json())
  .then((data) => {
    nombresEstudiantes = data.map((est) => est.first);
    const lista = document.getElementById("lista-estudiantes");

    data.forEach((est) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const folderName = `${normalizeText(est.last)}-${normalizeText(est.first)}`;

      link.href = `estudiantes/${folderName}/index.html`;
      link.textContent = `${est.first} ${est.last}`;

      // Clase para el efecto de imán
      link.classList.add("magnet-item");

      li.appendChild(link);
      lista.appendChild(li);
    });

    // Inicializar el título después de cargar los datos para asegurar orden
    prepararTitulo();
  });

/**
 * 2. Preparación del título (división en letras)
 */
function prepararTitulo() {
  const titulo = document.getElementById("tituloPrincipal");
  const texto = titulo.textContent;
  titulo.innerHTML = "";

  texto.split("").forEach((letra) => {
    const span = document.createElement("span");
    // Preservar espacios en blanco
    span.textContent = letra === " " ? "\u00A0" : letra;
    span.style.display = "inline-block";
    titulo.appendChild(span);
  });
}

/**
 * 3. Efecto "Imán" (Repulsión) para Título y Nombres
 */
document.addEventListener("mousemove", (e) => {
  // Seleccionamos spans del título y enlaces de la lista
  const elementosAnimados = document.querySelectorAll(
    "#tituloPrincipal span, .magnet-item",
  );

  elementosAnimados.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    const radioEfecto = 100;

    if (distance < radioEfecto) {
      // Calcular fuerza de repulsión
      const fuerza = (radioEfecto - distance) / 2;
      const moveX = (distanceX / distance) * -fuerza;
      const moveY = (distanceY / distance) * -fuerza;

      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      el.style.color = "#ff69b4"; // Cambia a rosa al acercarse
    } else {
      el.style.transform = `translate(0, 0)`;
      el.style.color = ""; // Vuelve al color original
    }
  });
});

/**
 * 4. Efecto de Click: Rastro de nombres
 */
document.body.addEventListener("click", (e) => {
  // Evitar que se active si haces click en enlaces
  if (e.target.tagName === "A" || e.target.closest("#lista-estudiantes"))
    return;

  const rastro = document.createElement("div");
  rastro.classList.add("trail-text");

  // Posición del click
  rastro.style.left = `${e.clientX}px`;
  rastro.style.top = `${e.clientY}px`;

  // Seleccionar un nombre aleatorio de la lista del semestre
  const nombreAzar =
    nombresEstudiantes[Math.floor(Math.random() * nombresEstudiantes.length)];
  rastro.textContent = nombreAzar || "Algoritmos";

  // Rotación aleatoria para la animación CSS
  const rotacion = Math.random() * 40 - 20;
  rastro.style.setProperty("--rotation", `${rotacion}deg`);

  document.body.appendChild(rastro);

  // Eliminar elemento después de que termine la animación (2s)
  setTimeout(() => rastro.remove(), 2000);
});
