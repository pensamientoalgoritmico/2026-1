// Función de normalización (se mantiene igual para los enlaces)
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

// Cargar lista de estudiantes y preparar nombres para el efecto de click
let nombresEstudiantes = [];
fetch("estudiantes.json")
  .then((res) => res.json())
  .then((data) => {
    nombresEstudiantes = data.map((est) => est.first); // Guardamos nombres para el efecto
    const lista = document.getElementById("lista-estudiantes");
    data.forEach((est) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const folderName = `${normalizeText(est.last)}-${normalizeText(est.first)}`;
      link.href = `estudiantes/${folderName}/index.html`;
      link.textContent = `${est.first} ${est.last}`;
      li.appendChild(link);
      lista.appendChild(li);
    });
  });

// --- EFECTO 1: Título Magnético ---
const titulo = document.getElementById("tituloPrincipal");
const contenido = titulo.textContent;
titulo.innerHTML = "";

contenido.split("").forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char === " " ? "\u00A0" : char;
  span.style.display = "inline-block";
  span.style.transition = "transform 0.2s ease-out";
  titulo.appendChild(span);
});

document.addEventListener("mousemove", (e) => {
  const spans = titulo.querySelectorAll("span");
  spans.forEach((span) => {
    const rect = span.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calcular distancia entre cursor y letra
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < 100) {
      const force = (100 - distance) / 2;
      const moveX = (distanceX / distance) * -force;
      const moveY = (distanceY / distance) * -force;
      span.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
    } else {
      span.style.transform = `translate(0, 0) rotate(0deg)`;
    }
  });
});

// --- EFECTO 2: Estela de Nombres al Click ---
document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A" || e.target.closest("#lista-estudiantes"))
    return;

  const rastro = document.createElement("div");
  rastro.className = "trail-text";

  // Elegir un nombre aleatorio de la nueva lista
  const nombreAzar =
    nombresEstudiantes[Math.floor(Math.random() * nombresEstudiantes.length)];
  rastro.textContent = nombreAzar || "Algoritmos";

  rastro.style.left = `${e.clientX}px`;
  rastro.style.top = `${e.clientY}px`;

  // Rotación aleatoria para dinamismo
  const rot = Math.random() * 40 - 20;
  rastro.style.setProperty("--rotation", `${rot}deg`);

  document.body.appendChild(rastro);
  setTimeout(() => rastro.remove(), 2000);
});
