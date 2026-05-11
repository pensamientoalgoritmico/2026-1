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

      // --- NUEVO: Fragmentar nombre en letras ---
      const nombreCompleto = `${est.first} ${est.last}`;
      nombreCompleto.split("").forEach((letra) => {
        const span = document.createElement("span");
        span.textContent = letra === " " ? "\u00A0" : letra;
        span.classList.add("letra-magnetica"); // Clase común para el efecto
        link.appendChild(span);
      });

      li.appendChild(link);
      lista.appendChild(li);
    });

    prepararTitulo();
  });

/**
 * 2. Preparación del título (letras individuales)
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
 * 3. Efecto "Imán" (Repulsión letra por letra)
 */
document.addEventListener("mousemove", (e) => {
  // Seleccionamos todos los spans con la clase común
  const letras = document.querySelectorAll(".letra-magnetica");

  letras.forEach((span) => {
    const rect = span.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    const radioEfecto = 80; // Un poco más pequeño para precisión letra a letra

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
});

/**
 * 4. Efecto de Click: Círculo de "DISEÑAR"
 */
document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A" || e.target.closest("#lista-estudiantes"))
    return;

  const palabra = "algoritmo";
  const radio = 70;

  palabra.split("").forEach((letra, i) => {
    const el = document.createElement("div");
    el.classList.add("trail-text");
    el.textContent = letra;

    const angulo = (i / palabra.length) * (Math.PI * 2);
    const x = Math.cos(angulo) * radio;
    const y = Math.sin(angulo) * radio;

    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
    el.style.setProperty("--dest-x", `${x}px`);
    el.style.setProperty("--dest-y", `${y}px`);

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  });
});
