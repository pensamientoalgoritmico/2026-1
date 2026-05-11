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

      // Clase para el efecto de imán
      link.classList.add("magnet-item");

      li.appendChild(link);
      lista.appendChild(li);
    });

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
    span.textContent = letra === " " ? "\u00A0" : letra;
    span.style.display = "inline-block";
    titulo.appendChild(span);
  });
}

/**
 * 3. Efecto "Imán" (Repulsión) para Título y Nombres
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
      el.style.color = "#ff69b4";
    } else {
      el.style.transform = `translate(0, 0)`;
      el.style.color = "";
    }
  });
});

/**
 * 4. Efecto de Click: Glifos Abstractos
 */
document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A" || e.target.closest("#lista-estudiantes"))
    return;

  const figura = document.createElement("div");
  figura.classList.add("trail-text"); // Reutilizamos la clase CSS para la animación

  // Caracteres especiales aleatorios (estilo original)
  const caracteres = ["★", "✦", "❖", "✺", "✿", "☼", "∞", "♥", "✧", "☯"];
  figura.textContent =
    caracteres[Math.floor(Math.random() * caracteres.length)];

  figura.style.left = `${e.clientX}px`;
  figura.style.top = `${e.clientY}px`;

  const rotacion = Math.random() * 80 - 40;
  figura.style.setProperty("--rotation", `${rotacion}deg`);

  document.body.appendChild(figura);

  setTimeout(() => figura.remove(), 2000);
});
