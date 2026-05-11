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
      link.textContent = `${est.first} ${est.last}`;
      link.classList.add("magnet-item");

      li.appendChild(link);
      lista.appendChild(li);
    });

    prepararTitulo();
  });

/**
 * 2. Preparación del título
 */
function prepararTitulo() {
  const titulo = document.getElementById("tituloPrincipal");
  const texto = titulo.textContent;
  titulo.innerHTML = "";

  texto.split("").forEach((letra) => {
    const span = document.createElement("span");
    span.textContent = letra === " " ? "\u00A0" : letra;
    span.style.display = "inline-block";
    titulo.appendChild(span);
  });
}

/**
 * 3. Efecto "Imán" (Repulsión)
 */
document.addEventListener("mousemove", (e) => {
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
      const fuerza = (radioEfecto - distance) / 2;
      const moveX = (distanceX / distance) * -fuerza;
      const moveY = (distanceY / distance) * -fuerza;

      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      el.style.color = "#8dd1ff";
    } else {
      el.style.transform = `translate(0, 0)`;
      el.style.color = "";
    }
  });
});

/**
 * 4. Efecto de Click: Círculo de la palabra "DISEÑAR"
 */
document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A" || e.target.closest("#lista-estudiantes"))
    return;

  const palabra = "DISEÑAR";
  const letras = palabra.split("");
  const radio = 60; // Radio del círculo en píxeles

  letras.forEach((letra, i) => {
    const el = document.createElement("div");
    el.classList.add("trail-text");
    el.textContent = letra;

    // Calcular posición en el círculo usando seno y coseno
    const angulo = (i / letras.length) * (Math.PI * 2);
    const x = Math.cos(angulo) * radio;
    const y = Math.sin(angulo) * radio;

    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;

    // Pasamos las coordenadas de destino a CSS mediante variables
    el.style.setProperty("--dest-x", `${x}px`);
    el.style.setProperty("--dest-y", `${y}px`);

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 2000);
  });
});
