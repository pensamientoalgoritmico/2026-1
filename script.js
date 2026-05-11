function normalizeText(text) {
  return text
    .normalize("NFD") // separa caracteres con tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/ñ/g, "n") // reemplaza ñ por n
    .toLowerCase()
    .replace(/\s+/g, "-"); // espacios por guiones
}

fetch("estudiantes.json")
  .then((response) => response.json())
  .then((data) => {
    const lista = document.getElementById("lista-estudiantes");
    data.forEach((est) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const folderName = `${normalizeText(est.last)}-${normalizeText(
        est.first
      )}`;
      link.href = `estudiantes/${folderName}/index.html`;
      link.textContent = `${est.first} ${est.last}`;
      li.appendChild(link);
      lista.appendChild(li);
    });
  });

const titulo = document.getElementById("tituloPrincipal");
const texto = titulo.textContent;
titulo.textContent = "";

texto.split("").forEach((letra) => {
  const span = document.createElement("span");
  span.textContent = letra;
  titulo.appendChild(span);
});

const letras = titulo.querySelectorAll("span");
let tiempo = 0;

function animar() {
  tiempo += 0.045; // más lento
  letras.forEach((span, i) => {
    const desplazamiento = Math.sin(tiempo + i * 0.5) * 10;
    span.style.transform = `translateY(${desplazamiento}px)`;

    // Colores dinámicos para la estela tipo glitch
    // const r = Math.floor(128 + 128 * Math.sin(tiempo + i));
    // const g = Math.floor(128 + 128 * Math.sin(tiempo + i + 2));
    // const b = Math.floor(128 + 128 * Math.sin(tiempo + i + 4));

    // span.style.textShadow = `
    //     0 ${desplazamiento / 2}px 8px rgba(${r},${g},${b},0.8),
    //     0 ${desplazamiento / 2}px 15px rgba(${r},${g},${b},0.4)
    //   `;
    // span.style.transform = `translateY(${desplazamiento}px) rotate(${
    //   Math.sin(tiempo + i) * 10
    // }deg)`;
  });
  requestAnimationFrame(animar);
}

animar();

document.body.addEventListener("click", (e) => {
  // Evitar que se active si haces click en enlaces o lista
  if (e.target.tagName === "A" || e.target.closest("#lista-estudiantes"))
    return;

  const figura = document.createElement("div");
  figura.classList.add("figura");

  // Posición del click
  figura.style.left = `${e.clientX}px`;
  figura.style.top = `${e.clientY}px`;

  // Color: rosado o amarillo
  const colores = ["#ff69b4", "#ffd700"]; // rosa y amarillo
  figura.style.color = colores[Math.floor(Math.random() * colores.length)];

  // Carácter especial aleatorio
  const caracteres = ["★", "✦", "❖", "✺", "✿", "☼", "∞", "♥", "✧", "☯"];
  figura.textContent =
    caracteres[Math.floor(Math.random() * caracteres.length)];

  document.body.appendChild(figura);

  // Eliminar después de 3s
  setTimeout(() => figura.remove(), 8000);
});
