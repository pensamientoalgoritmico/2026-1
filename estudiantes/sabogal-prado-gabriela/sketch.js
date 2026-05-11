// Plantilla para la entrega final
// Gabriela Sabogal Prado
// Nombre del proyecto: Ecuanimity
//
// Ecuanimity se interpreta como un pequeño refugio digital para descansar un poco
// del mundo. Cada escena propone una acción tranquila, respirar, escuchar, ordenar,
// soltar, contemplar y cerrar. La intención no es diagnosticar ni pedir una
// explicación emocional, sino abrir una pausa sensible donde el usuario pueda bajar
// el ruido mental, explorar sin presión y volver a sí mismo por un momento.
//
// Funcionalidades:
// El programa permite cambiar la atmósfera de color con un selector, navegar entre
// seis escenas con botones o teclas, activar y mezclar sonidos con checkboxes y
// sliders, guiar la respiración con una figura que cambia suavemente, arrastrar
// piezas para ordenar una composición, escribir palabras para liberarlas y crear
// ondas de luz al mantener presionado el mouse en la escena Contemplar.
//
// Uso de inteligencia artificial:
// Para este proyecto utilicé ChatGPT como apoyo para reorganizar el código según
// la estructura solicitada en clase. La herramienta me ayudó a separar las clases en archivos aparte.

// Descripción breve:
// Ecuanimity es una experiencia generativa e interactiva de calma.
// El programa tiene seis escenas: Respirar, Escuchar, Ordenar, Soltar,
// Contemplar y Cerrar. Cada escena propone una forma distinta de bajar
// el ritmo, organizar la atención, mezclar sonidos, ordenar elementos,
// liberar palabras, contemplar una atmósfera o cerrar suavemente.
//
// Links a referentes:
// p5.js Reference: https://p5js.org/reference/
// Se usó para consultar funciones como createCanvas(), createInput(),
// createSelect(), createCheckbox(), createSlider(), loadSound(),
// mousePressed(), keyPressed(), fill(), stroke(), line(), circle(),
// ellipse(), arc(), beginShape(), vertex(), bezierVertex(), text(),
// textFont(), random(), push(), pop(), translate(), rotate(), angleMode(),
// p5.FFT(), p5.Amplitude(), analyze(), getEnergy() y getLevel().
//
// Moby Gratis: https://mobygratis.com/
// Se usó como referente para los sonidos de la escena Escuchar.



// CLASES EN OTROS ARCHIVOS

// PiezaOrden está en PiezaOrden.js
// HuellaLuz está en HuellaLuz.js


// Inicio código

// VARIABLES GLOBALES

let fuenteTitulo;
let fuenteCuerpo;
let fuenteBoton;

let escena = 0;
let movimientoFondo = 0;

// Controles generales
let selectorAtmosfera;
let entradaTexto;

// Sonidos de la escena Escuchar
let song1;
let song2;
let rain;
let sound1;

// Análisis de sonido
let fft;
let amp;

let bass = 0;
let nivelSonido = 0;

// Checkboxes para activar sonidos
let checkSong1;
let checkSong2;
let checkRain;
let checkSound1;

// Sliders para controlar volumen
let sliderSong1;
let sliderSong2;
let sliderRain;
let sliderSound1;

// Variables para la escena Respirar
let respirarActivo = false;
let tamRespirar = 0;
let direccionRespirar = 1;

// Piezas de la escena Ordenar
let pieza1;
let pieza2;
let pieza3;
let pieza4;
let pieza5;

let piezaSeleccionada = 0;

// Variables para palabras liberadas en Soltar
let siguientePalabra = 1;

let palabra1 = "";
let palabra1X = 0;
let palabra1Y = 0;
let contador1 = 0;
let activa1 = false;

let palabra2 = "";
let palabra2X = 0;
let palabra2Y = 0;
let contador2 = 0;
let activa2 = false;

let palabra3 = "";
let palabra3X = 0;
let palabra3Y = 0;
let contador3 = 0;
let activa3 = false;

let palabra4 = "";
let palabra4X = 0;
let palabra4Y = 0;
let contador4 = 0;
let activa4 = false;

let palabra5 = "";
let palabra5X = 0;
let palabra5Y = 0;
let contador5 = 0;
let activa5 = false;

// Contador para la escena final
let contadorCerrar = 0;

// Huellas de luz para la escena Contemplar
let huellas = [];
let contadorHuella = 0;


// PRELOAD

function preload() {
  fuenteTitulo = loadFont("fonts/Le Jardin Secret.ttf");
  fuenteCuerpo = loadFont("fonts/Comfortaa-Regular.ttf");
  fuenteBoton = loadFont("fonts/Comfortaa-Bold.ttf");

  soundFormats("mp3", "ogg");

  song1 = loadSound("songs/song1.mp3");
  song2 = loadSound("songs/song2.mp3");

  rain = loadSound("sounds/rain.mp3");
  sound1 = loadSound("sounds/sound1.mp3");
}


// SETUP

function setup() {
  // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");

  // sigue como siempre
  background(255, 255, 255);
  angleMode(DEGREES);

  selectorAtmosfera = createSelect();
  selectorAtmosfera.position(55, 50);
  selectorAtmosfera.size(220, 30);

  selectorAtmosfera.option("cielo suave");
  selectorAtmosfera.option("rosa descanso");
  selectorAtmosfera.option("lila nube");
  selectorAtmosfera.option("azul silencio");

  selectorAtmosfera.selected("cielo suave");

  personalizarSelector(selectorAtmosfera);

  entradaTexto = createInput("");
  entradaTexto.position(55, 380);
  entradaTexto.size(360, 30);
  entradaTexto.hide();

  entradaTexto.style("background-color", "#FFFFFF");
  entradaTexto.style("border", "4px solid #FFFFFF");
  entradaTexto.style("border-radius", "20px");
  entradaTexto.style("color", "#8F7BE8");
  entradaTexto.style("font-size", "14px");
  entradaTexto.style("font-family", "Comfortaa");
  entradaTexto.style("padding", "4px");

  crearControlesSonido();
  crearPiezasOrden();

  fft = new p5.FFT();
  amp = new p5.Amplitude();

  ocultarControlesSonido();
}


// DRAW

function draw() {
  dibujarFondo();

  actualizarRespiracion();

  fft.analyze();
  bass = fft.getEnergy("bass");
  nivelSonido = amp.getLevel();

  if (escena === 2) {
    actualizarSonidos();
  }

  if (escena !== 2) {
    detenerSonidos();
  }

  if (escena === 0) {
    dibujarPortada();
  }

  if (escena === 1) {
    dibujarEscenaRespirar();
  }

  if (escena === 2) {
    dibujarEscenaEscuchar();
  }

  if (escena === 3) {
    dibujarEscenaOrdenar();
  }

  if (escena === 4) {
    dibujarEscenaSoltar();
  }

  if (escena === 5) {
    dibujarEscenaContemplar();
  }

  if (escena === 6) {
    dibujarEscenaCerrar();
  }

  dibujarPalabrasLiberadas();
  actualizarControles();
  actualizarCursor();

  movimientoFondo = movimientoFondo + 0.4;
}


// FUNCIONES DE CONTROLES

function crearControlesSonido() {
  checkSong1 = createCheckbox("Song 1");
  checkSong1.position(100, 300);
  checkSong1.size(200, 30);
  personalizarCheckbox(checkSong1);

  sliderSong1 = createSlider(0, 1, 0.4, 0.01);
  sliderSong1.position(350, 310);
  sliderSong1.size(230);
  personalizarSlider(sliderSong1);

  checkRain = createCheckbox("Lluvia");
  checkRain.position(100, 350);
  checkRain.size(200, 30);
  personalizarCheckbox(checkRain);

  sliderRain = createSlider(0, 1, 0.4, 0.01);
  sliderRain.position(350, 360);
  sliderRain.size(230);
  personalizarSlider(sliderRain);

  checkSong2 = createCheckbox("Song 2");
  checkSong2.position(100, 400);
  checkSong2.size(200, 30);
  personalizarCheckbox(checkSong2);

  sliderSong2 = createSlider(0, 1, 0.4, 0.01);
  sliderSong2.position(350, 410);
  sliderSong2.size(230);
  personalizarSlider(sliderSong2);

  checkSound1 = createCheckbox("Ambiente");
  checkSound1.position(100, 450);
  checkSound1.size(200, 30);
  personalizarCheckbox(checkSound1);

  sliderSound1 = createSlider(0, 1, 0.4, 0.01);
  sliderSound1.position(350, 460);
  sliderSound1.size(230);
  personalizarSlider(sliderSound1);
}

function personalizarSelector(selector) {
  selector.style("background-color", "#EFA6C8");
  selector.style("border", "2px solid #FFFFFF");
  selector.style("border-radius", "20px");
  selector.style("color", "#FFFFFF");
  selector.style("font-size", "13px");
  selector.style("text-align", "center");
  selector.style("font-family", "Comfortaa");
  selector.style("cursor", "pointer");
  selector.style("padding", "4px 18px 4px 10px");
}

function personalizarCheckbox(check) {
  check.style("background-color", "#EFA6C8");
  check.style("border", "2px solid #FFFFFF");
  check.style("border-radius", "20px");
  check.style("color", "#FFFFFF");
  check.style("font-size", "15px");
  check.style("font-family", "Comfortaa");
  check.style("cursor", "pointer");
  check.style("padding", "6px 10px 5px 10px");
}

function personalizarSlider(slider) {
  slider.style("cursor", "pointer");
  slider.style("accent-color", "#D982AC");
  slider.style("background-color", "transparent");
}

function actualizarControles() {
  selectorAtmosfera.show();

  if (escena === 2) {
    mostrarControlesSonido();
  } else {
    ocultarControlesSonido();
  }

  if (escena === 4) {
    entradaTexto.show();
  } else {
    entradaTexto.hide();
  }
}

function mostrarControlesSonido() {
  checkSong1.show();
  checkSong2.show();
  checkRain.show();
  checkSound1.show();

  sliderSong1.show();
  sliderSong2.show();
  sliderRain.show();
  sliderSound1.show();
}

function ocultarControlesSonido() {
  checkSong1.hide();
  checkSong2.hide();
  checkRain.hide();
  checkSound1.hide();

  sliderSong1.hide();
  sliderSong2.hide();
  sliderRain.hide();
  sliderSound1.hide();
}


// FUNCIONES DE NAVEGACIÓN

function dibujarMenuInferior() {
  dibujarBotonP5(55, height - 50, 100, 30, "Respirar");
  dibujarBotonP5(165, height - 50, 100, 30, "Escuchar");
  dibujarBotonP5(275, height - 50, 100, 30, "Ordenar");
  dibujarBotonP5(385, height - 50, 100, 30, "Soltar");
  dibujarBotonP5(495, height - 50, 110, 30, "Contemplar");
  dibujarBotonP5(615, height - 50, 90, 30, "Cerrar");
  dibujarBotonP5(720, height - 50, 90, 30, "Inicio");
}

function dibujarBotonP5(x, y, ancho, alto, textoBoton) {
  let r = 239;
  let g = 166;
  let b = 200;

  let botonActivo = false;

  if (textoBoton === "Respirar") {
    r = 190;
    g = 220;
    b = 255;

    if (escena === 1) {
      botonActivo = true;
    }
  }

  if (textoBoton === "Escuchar") {
    r = 200;
    g = 230;
    b = 255;

    if (escena === 2) {
      botonActivo = true;
    }
  }

  if (textoBoton === "Ordenar") {
    r = 230;
    g = 200;
    b = 255;

    if (escena === 3) {
      botonActivo = true;
    }
  }

  if (textoBoton === "Soltar") {
    r = 255;
    g = 200;
    b = 225;

    if (escena === 4) {
      botonActivo = true;
    }
  }

  if (textoBoton === "Contemplar") {
    r = 255;
    g = 220;
    b = 245;

    if (escena === 5) {
      botonActivo = true;
    }
  }

  if (textoBoton === "Cerrar") {
    r = 210;
    g = 215;
    b = 255;

    if (escena === 6) {
      botonActivo = true;
    }
  }

  if (textoBoton === "Inicio") {
    r = 239;
    g = 166;
    b = 200;

    if (escena === 0) {
      botonActivo = true;
    }
  }

  if (
    mouseX > x &&
    mouseX < x + ancho &&
    mouseY > y &&
    mouseY < y + alto
  ) {
    fill(r, g, b, 255);
  } else {
    fill(r, g, b, 220);
  }

  noStroke();
  rect(x, y, ancho, alto, 20);

  if (botonActivo === true) {
    stroke(255, 255, 255);
    strokeWeight(4);
  } else {
    stroke(255, 255, 255, 180);
    strokeWeight(2);
  }

  noFill();
  rect(x, y, ancho, alto, 20);

  noStroke();

  fill(120, 100, 170, 70);
  textFont(fuenteBoton);
  textSize(12);

  let textoX = x + 15;

  if (textoBoton === "Contemplar") {
    textoX = x + 11;
  }

  if (textoBoton === "Escuchar") {
    textoX = x + 16;
  }

  if (textoBoton === "Ordenar") {
    textoX = x + 18;
  }

  if (textoBoton === "Cerrar") {
    textoX = x + 21;
  }

  if (textoBoton === "Inicio") {
    textoX = x + 22;
  }

  text(textoBoton, textoX + 1, y + 21);

  fill(255, 255, 255);
  text(textoBoton, textoX, y + 20);
}

function revisarClickMenu() {
  if (mouseX > 55 && mouseX < 155 && mouseY > height - 50 && mouseY < height - 20) {
    escena = 1;
    contadorCerrar = 0;
    huellas = [];
  }

  if (mouseX > 165 && mouseX < 265 && mouseY > height - 50 && mouseY < height - 20) {
    escena = 2;
    contadorCerrar = 0;
    huellas = [];
  }

  if (mouseX > 275 && mouseX < 375 && mouseY > height - 50 && mouseY < height - 20) {
    escena = 3;
    contadorCerrar = 0;
    huellas = [];
  }

  if (mouseX > 385 && mouseX < 485 && mouseY > height - 50 && mouseY < height - 20) {
    escena = 4;
    contadorCerrar = 0;
    huellas = [];
  }

  if (mouseX > 495 && mouseX < 605 && mouseY > height - 50 && mouseY < height - 20) {
    escena = 5;
    contadorCerrar = 0;
  }

  if (mouseX > 615 && mouseX < 705 && mouseY > height - 50 && mouseY < height - 20) {
    escena = 6;
    contadorCerrar = 0;
    huellas = [];
  }

  if (mouseX > 720 && mouseX < 810 && mouseY > height - 50 && mouseY < height - 20) {
    escena = 0;
    contadorCerrar = 0;
    respirarActivo = false;
    tamRespirar = 0;
    limpiarPalabras();
    entradaTexto.value("");
    huellas = [];
  }
}

function actualizarCursor() {
  let estaSobreBoton = false;

  if (mouseX > 55 && mouseX < 155 && mouseY > height - 50 && mouseY < height - 20) {
    estaSobreBoton = true;
  }

  if (mouseX > 165 && mouseX < 265 && mouseY > height - 50 && mouseY < height - 20) {
    estaSobreBoton = true;
  }

  if (mouseX > 275 && mouseX < 375 && mouseY > height - 50 && mouseY < height - 20) {
    estaSobreBoton = true;
  }

  if (mouseX > 385 && mouseX < 485 && mouseY > height - 50 && mouseY < height - 20) {
    estaSobreBoton = true;
  }

  if (mouseX > 495 && mouseX < 605 && mouseY > height - 50 && mouseY < height - 20) {
    estaSobreBoton = true;
  }

  if (mouseX > 615 && mouseX < 705 && mouseY > height - 50 && mouseY < height - 20) {
    estaSobreBoton = true;
  }

  if (mouseX > 720 && mouseX < 810 && mouseY > height - 50 && mouseY < height - 20) {
    estaSobreBoton = true;
  }

  if (escena === 1) {
    if (
      mouseX > width / 2 - 170 &&
      mouseX < width / 2 + 170 &&
      mouseY > 170 &&
      mouseY < 510
    ) {
      estaSobreBoton = true;
    }
  }

  if (estaSobreBoton === true) {
    cursor("pointer");
  } else {
    cursor("default");
  }
}


// FUNCIONES DE FONDO GENERAL

function dibujarFondo() {
  let atmosfera = selectorAtmosfera.selected();

  for (let y = 0; y < height; y = y + 1) {
    let r = 170;
    let g = 205;
    let b = 255;

    if (atmosfera === "cielo suave") {
      r = 170 + y / 8;
      g = 205 - y / 12;
      b = 255 - y / 20;
    }

    if (atmosfera === "rosa descanso") {
      r = 230 + y / 20;
      g = 185 - y / 25;
      b = 235 - y / 40;
    }

    if (atmosfera === "lila nube") {
      r = 200 + y / 18;
      g = 185 - y / 30;
      b = 255 - y / 35;
    }

    if (atmosfera === "azul silencio") {
      r = 145 + y / 18;
      g = 190 - y / 18;
      b = 255 - y / 45;
    }

    if (r > 255) {
      r = 255;
    }

    if (r < 120) {
      r = 120;
    }

    if (g > 255) {
      g = 255;
    }

    if (g < 130) {
      g = 130;
    }

    if (b > 255) {
      b = 255;
    }

    if (b < 190) {
      b = 190;
    }

    stroke(r, g, b);
    line(0, y, width, y);
  }

  noStroke();

  fill(255, 170, 245, 80);
  circle(width - 240 + movimientoFondo / 20, 180, 520);

  fill(190, 165, 255, 60);
  circle(width / 2 - 40, 300 + movimientoFondo / 30, 430);

  fill(160, 210, 255, 70);
  circle(90, height - 80, 390);
}


// FUNCIONES DE ESCENAS

function dibujarPortada() {
  dibujarOndas();

  noStroke();
  fill(255, 255, 255);

  textFont(fuenteTitulo);
  textSize(105);
  text("Ecuanimity", 55, 290);

  textFont(fuenteCuerpo);
  textSize(24);
  text("A veces no necesitamos que nos pidan más,", 55, 335);
  text("sino un espacio donde podamos llegar con", 55, 365);
  text("calma.", 55, 395);

  textSize(14);
  text("Elige una atmósfera de color.", 60, 43);
  text("Usa el menú inferior para recorrer la experiencia.", 55, 475);
  text("También puedes usar las teclas 1, 2, 3, 4, 5 y 6.", 55, 500);

  dibujarEspiralBase(width - 235, 295, 100, 160);
  dibujarEstrella(width - 360, 430);

  dibujarMenuInferior();
}

function dibujarEscenaRespirar() {
  escribirTituloEscena(
    "1. Respirar",
    "Haz click en el círculo para activar "
  );

  text("o pausar la respiración.", 55, 270);
  text("Inhala durante 7 segundos y exhala", 55, 300);
  text("durante 7 segundos con el espiral.", 55, 315);

  let centroX = width / 2;
  let centroY = 340;

  fill(255, 255, 255, 80);
  circle(centroX, centroY, 310 + tamRespirar * 5);

  fill(205, 90, 230, 90);
  circle(centroX, centroY, 240 + tamRespirar * 3);

  fill(220, 120, 245, 70);
  circle(centroX, centroY, 170 + tamRespirar * 2);

  dibujarEspiralBase(
    centroX,
    centroY,
    180 + tamRespirar * 3,
    260 + tamRespirar * 4
  );

  textFont(fuenteTitulo);
  textSize(25);
  fill(255, 255, 255);

  if (direccionRespirar === 1 && respirarActivo === true) {
    text("Inhala lentamente", centroX - 65, 525);
  }

  if (direccionRespirar === -1 && respirarActivo === true) {
    text("Exhala suavemente", centroX - 70, 525);
  }

  if (respirarActivo === false) {
    text("Haz clic en el círculo para empezar", centroX - 110, 535);
  }

  dibujarMenuInferior();
}

function dibujarEscenaEscuchar() {
  let centroSonidoX = width - 240;
  let centroSonidoY = 210;

  let reaccionAmplitud = nivelSonido * 1200;
  let reaccionBass = bass / 3;

  noStroke();
  fill(255, 255, 255);

  textFont(fuenteTitulo);
  textSize(65);
  text("Ecuanimity", 55, 150);

  textFont(fuenteCuerpo);
  textSize(24);
  text("2. Escuchar", 55, 205);

  textSize(17);
  text("Activa los sonidos que quieras y mezcla su volumen.", 55, 220);

  textFont(fuenteTitulo);
  textSize(20);
  text("Construye tu propia atmósfera de calma.", 55, 250);

  textFont(fuenteCuerpo);
  textSize(13);
  text("Marca los sonidos que quieres escuchar y ajusta su intensidad.", 55, 265);

  fill(255, 255, 255, 70);
  circle(centroSonidoX, centroSonidoY, 150 + reaccionAmplitud + reaccionBass);

  if (checkSong1.checked() === true) {
    fill(255, 210, 250, 70);
    circle(centroSonidoX, centroSonidoY, 190 + tamRespirar + reaccionAmplitud);
  }

  if (checkSong2.checked() === true) {
    fill(190, 220, 255, 65);
    circle(centroSonidoX, centroSonidoY, 230 + tamRespirar + reaccionBass);
  }

  if (checkRain.checked() === true) {
    fill(255, 255, 255, 45);
    circle(centroSonidoX, centroSonidoY, 270 + tamRespirar + reaccionAmplitud);
  }

  if (checkSound1.checked() === true) {
    fill(230, 190, 255, 50);
    circle(centroSonidoX, centroSonidoY, 310 + tamRespirar + reaccionBass);
  }

  dibujarEspiralBase(
    centroSonidoX,
    centroSonidoY,
    75 + reaccionBass * 1.5,
    120 + reaccionAmplitud
  );

  if (checkRain.checked() === true) {
    dibujarLluvia();
  }

  if (checkSound1.checked() === true) {
    dibujarViento();
  }

  if (
    checkSong1.checked() === false &&
    checkSong2.checked() === false &&
    checkRain.checked() === false &&
    checkSound1.checked() === false
  ) {
    fill(255, 255, 255, 90);
    circle(centroSonidoX, centroSonidoY, 150);
    dibujarEspiralBase(centroSonidoX, centroSonidoY, 75, 120);
  }

  dibujarMenuInferior();
}

function dibujarEscenaOrdenar() {
  escribirTituloEscena(
    "3. Ordenar",
    "Arrastra las formas hacia la zona de calma."
  );

  text("Ordena poco a poco para transformar el", 55, 280);
  text("caos en calma.", 55, 295);

  fill(255, 255, 255, 45);
  stroke(255, 255, 255, 120);
  strokeWeight(2);
  rect(width / 2 - 100, 140, 400, 400);

  noStroke();

  pieza1.dibujar();
  pieza2.dibujar();
  pieza3.dibujar();
  pieza4.dibujar();
  pieza5.dibujar();

  fill(255, 255, 255);
  textFont(fuenteCuerpo);
  textSize(13);
  text("zona de calma", width / 2 - 100, 120);

  textSize(13);
  text("Presiona R para generar nuevas posiciones.", 55, 330);

  if (
    pieza1.estaEnZona() === true &&
    pieza2.estaEnZona() === true &&
    pieza3.estaEnZona() === true &&
    pieza4.estaEnZona() === true &&
    pieza5.estaEnZona() === true
  ) {
    fill(255, 255, 255);
    textFont(fuenteTitulo);
    textSize(24);
    text("la composición encontró calma", width / 2 + 30, 505);
  }

  dibujarMenuInferior();
}

function dibujarEscenaSoltar() {
  escribirTituloEscena(
    "4. Soltar",
    "Escribe una palabra o preocupación y presiona ENTER para liberarla."
  );

  textFont(fuenteCuerpo);
  textSize(14);
  fill(255, 255, 255);
  text("Escribe aquí las palabras y preocupaciones que quieras liberar", 55, 370);

  textSize(13);
  fill(255, 230, 245);
  text("Presiona ENTER para liberar otra palabra", 55, 355);

  fill(255, 255, 255, 80);
  circle(width - 260, 295, 180 + tamRespirar * 2);

  dibujarEspiralBase(width - 260, 295, 100, 160);

  dibujarMenuInferior();
}

function dibujarEscenaContemplar() {
  escribirTituloEscena(
    "5. Contemplar",
    "Observa cómo la atmósfera respira lentamente."
  );

  text("Mantén presionado el mouse para dejar ondas como agua.", 55, 270);

  let centroX = width - 300;
  let centroY = 310;

  let respirarVisual = 20;

  if (movimientoFondo % 240 < 120) {
    respirarVisual = movimientoFondo % 120;
  } else {
    respirarVisual = 120 - movimientoFondo % 120;
  }

  respirarVisual = respirarVisual / 4;

  let cambio = movimientoFondo % 360;

  let r1 = 255;
  let g1 = 210;
  let b1 = 245;

  let r2 = 185;
  let g2 = 220;
  let b2 = 255;

  let r3 = 225;
  let g3 = 195;
  let b3 = 255;

  if (cambio > 90) {
    r1 = 235;
    g1 = 200;
    b1 = 255;

    r2 = 200;
    g2 = 230;
    b2 = 255;

    r3 = 255;
    g3 = 215;
    b3 = 245;
  }

  if (cambio > 180) {
    r1 = 200;
    g1 = 225;
    b1 = 255;

    r2 = 250;
    g2 = 215;
    b2 = 245;

    r3 = 220;
    g3 = 200;
    b3 = 255;
  }

  if (cambio > 270) {
    r1 = 255;
    g1 = 225;
    b1 = 240;

    r2 = 210;
    g2 = 215;
    b2 = 255;

    r3 = 190;
    g3 = 230;
    b3 = 255;
  }

  let luz = 45;

  if (mouseIsPressed === true) {
    luz = 65;
  }

  noStroke();

  dibujarNubeContemplar(560 + movimientoFondo / 22, 210, 1.1, 25);
  dibujarNubeContemplar(width - 220 - movimientoFondo / 28, 430, 0.9, 22);
  dibujarNubeContemplar(width - 100 - movimientoFondo / 35, 250, 0.7, 18);

  fill(r1, g1, b1, luz);
  circle(centroX, centroY, 260 + respirarVisual);

  fill(r2, g2, b2, luz);
  circle(
    centroX + 80 + respirarVisual / 2,
    centroY - 45,
    155 + respirarVisual
  );

  fill(r3, g3, b3, luz);
  circle(
    centroX - 85,
    centroY + 65 + respirarVisual / 3,
    190 + respirarVisual
  );

  fill(255, 255, 255, 28);
  circle(centroX + movimientoFondo / 18, centroY - 95, 120);

  fill(255, 255, 255, 22);
  circle(centroX - movimientoFondo / 22, centroY + 105, 160);

  noFill();
  stroke(255, 255, 255, 95);
  strokeWeight(1);

  for (let i = 0; i < 7; i = i + 1) {
    ellipse(
      centroX,
      centroY,
      140 + i * 34 + respirarVisual,
      55 + i * 14 + respirarVisual / 2
    );
  }

  dibujarEspiralBase(
    centroX,
    centroY,
    95 + respirarVisual / 2,
    150 + respirarVisual
  );

  if (mouseIsPressed === true) {
    contadorHuella = contadorHuella + 1;

    if (contadorHuella > 8) {
      huellas.push(new HuellaLuz(mouseX, mouseY));
      contadorHuella = 0;
    }
  }

  dibujarHuellasLuz();

  dibujarEstrella(centroX + 175, centroY - 125);
  dibujarEstrella(centroX - 160, centroY + 120);

  fill(255, 255, 255);
  textFont(fuenteCuerpo);
  textSize(13);
  text("La atmósfera respira, y el mouse la toca como agua.", 55, 300);

  dibujarMenuInferior();
}

function dibujarEscenaCerrar() {
  contadorCerrar = contadorCerrar + 1;

  escribirTituloEscena(
    "6. Cerrar",
    "La experiencia baja el ritmo para que puedas salir con suavidad."
  );

  let tamCierre = 260 - contadorCerrar / 2;

  if (tamCierre < 90) {
    tamCierre = 90;
  }

  fill(255, 255, 255, 70);
  circle(width - 260, 280, tamCierre);

  dibujarEspiralBase(width - 260, 280, tamCierre / 2, tamCierre / 1.5);

  textFont(fuenteCuerpo);
  textSize(18);
  fill(255, 255, 255);
  text("Respira una última vez", width - 390, 430);

  textSize(13);
  text("Puedes volver al inicio cuando quieras", width - 390, 455);
  text("Gracias por habitar este momento", width - 390, 480);

  dibujarMenuInferior();
}


// FUNCIONES DE MOVIMIENTO Y LÓGICA

function actualizarRespiracion() {
  if (respirarActivo === true) {
    tamRespirar = tamRespirar + 0.043 * direccionRespirar;

    if (tamRespirar > 18) {
      direccionRespirar = -1;
    }

    if (tamRespirar < 0) {
      direccionRespirar = 1;
    }
  }

  if (respirarActivo === false) {
    if (tamRespirar > 0) {
      tamRespirar = tamRespirar - 0.08;
    }

    if (tamRespirar < 0) {
      tamRespirar = 0;
    }
  }
}

function actualizarSonidos() {
  song1.setVolume(sliderSong1.value());
  song2.setVolume(sliderSong2.value());
  rain.setVolume(sliderRain.value());
  sound1.setVolume(sliderSound1.value());

  if (checkSong1.checked() === true) {
    if (song1.isPlaying() === false) {
      song1.loop();
    }
  } else {
    if (song1.isPlaying() === true) {
      song1.stop();
    }
  }

  if (checkSong2.checked() === true) {
    if (song2.isPlaying() === false) {
      song2.loop();
    }
  } else {
    if (song2.isPlaying() === true) {
      song2.stop();
    }
  }

  if (checkRain.checked() === true) {
    if (rain.isPlaying() === false) {
      rain.loop();
    }
  } else {
    if (rain.isPlaying() === true) {
      rain.stop();
    }
  }

  if (checkSound1.checked() === true) {
    if (sound1.isPlaying() === false) {
      sound1.loop();
    }
  } else {
    if (sound1.isPlaying() === true) {
      sound1.stop();
    }
  }
}

function detenerSonidos() {
  if (song1.isPlaying() === true) {
    song1.stop();
  }

  if (song2.isPlaying() === true) {
    song2.stop();
  }

  if (rain.isPlaying() === true) {
    rain.stop();
  }

  if (sound1.isPlaying() === true) {
    sound1.stop();
  }
}

function crearPiezasOrden() {
  let x1 = generarXFueraZona();
  let y1 = random(170, 500);

  let x2 = generarXFueraZona();
  let y2 = random(170, 500);

  let x3 = generarXFueraZona();
  let y3 = random(170, 500);

  let x4 = generarXFueraZona();
  let y4 = random(170, 500);

  let x5 = generarXFueraZona();
  let y5 = random(170, 500);

  pieza1 = new PiezaOrden(x1, y1, 70, 70, "estrella", 255, 255, 255, 190, 90);
  pieza2 = new PiezaOrden(x2, y2, 90, 90, "orbita", 255, 210, 245, 170, 110);
  pieza3 = new PiezaOrden(x3, y3, 80, 80, "flor", 200, 225, 255, 170, 100);
  pieza4 = new PiezaOrden(x4, y4, 95, 95, "circulo", 255, 255, 255, 130, 110);
  pieza5 = new PiezaOrden(x5, y5, 75, 75, "estrella", 245, 225, 255, 230, 95);
}

function generarXFueraZona() {
  let lado = random(0, 2);
  let nuevaX = 0;

  if (lado < 1) {
    nuevaX = random(70, 330);
  } else {
    nuevaX = random(width - 150, width - 70);
  }

  return nuevaX;
}

function reiniciarOrden() {
  crearPiezasOrden();
}

function liberarPalabraNueva() {
  let nuevaPalabra = entradaTexto.value();

  if (nuevaPalabra !== "") {
    if (siguientePalabra === 1) {
      palabra1 = nuevaPalabra;
      palabra1X = random(430, width - 180);
      palabra1Y = random(120, 460);
      contador1 = 0;
      activa1 = true;
      siguientePalabra = 2;
    } else if (siguientePalabra === 2) {
      palabra2 = nuevaPalabra;
      palabra2X = random(430, width - 180);
      palabra2Y = random(120, 460);
      contador2 = 0;
      activa2 = true;
      siguientePalabra = 3;
    } else if (siguientePalabra === 3) {
      palabra3 = nuevaPalabra;
      palabra3X = random(430, width - 180);
      palabra3Y = random(120, 460);
      contador3 = 0;
      activa3 = true;
      siguientePalabra = 4;
    } else if (siguientePalabra === 4) {
      palabra4 = nuevaPalabra;
      palabra4X = random(430, width - 180);
      palabra4Y = random(120, 460);
      contador4 = 0;
      activa4 = true;
      siguientePalabra = 5;
    } else if (siguientePalabra === 5) {
      palabra5 = nuevaPalabra;
      palabra5X = random(430, width - 180);
      palabra5Y = random(120, 460);
      contador5 = 0;
      activa5 = true;
      siguientePalabra = 1;
    }

    entradaTexto.value("");
  }
}


// FUNCIONES DE DIBUJO

function escribirTituloEscena(titulo, descripcion) {
  noStroke();
  fill(255, 255, 255);

  textFont(fuenteTitulo);
  textSize(65);
  text("Ecuanimity", 55, 170);

  textFont(fuenteCuerpo);
  textSize(23);
  text(titulo, 55, 225);

  textSize(15);
  text(descripcion, 55, 255);
}

function dibujarOndas() {
  noFill();
  stroke(255, 255, 255);
  strokeWeight(2);

  push();
  translate(120, 200);

  for (let i = 0; i < 3; i = i + 1) {
    arc(0 + i * 35, 0 + i * 8, 150, 90, 185, 350);
  }

  pop();
}

function dibujarEspiralBase(x, y, ancho, alto) {
  push();
  translate(x, y);
  noFill();
  stroke(255, 255, 255);
  strokeWeight(1);

  for (let i = 0; i < 18; i = i + 1) {
    push();
    rotate(i * 10 + movimientoFondo / 4);
    ellipse(0, 0, ancho, alto);
    pop();
  }

  pop();
}

function dibujarEstrella(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(255, 255, 255);

  beginShape();
  vertex(0, -42);
  bezierVertex(6, -10, 10, -6, 42, 0);
  bezierVertex(10, 6, 6, 10, 0, 42);
  bezierVertex(-6, 10, -10, 6, -42, 0);
  bezierVertex(-10, -6, -6, -10, 0, -42);
  endShape();

  pop();
}

function dibujarLluvia() {
  stroke(255, 255, 255, 120);
  strokeWeight(1);

  for (let i = 0; i < 30; i = i + 1) {
    let x = width / 2 + 20 + i * 13;
    let y = 120 + ((movimientoFondo * 3 + i * 20) % 300);
    line(x, y, x - 10, y + 25);
  }
}

function dibujarViento() {
  noFill();
  stroke(255, 255, 255, 130);
  strokeWeight(2);

  for (let i = 0; i < 5; i = i + 1) {
    arc(width / 2 + 50, 180 + i * 55, 300 + i * 20, 60, 190, 350);
  }
}

function dibujarHuellasLuz() {
  let i = huellas.length - 1;

  while (i >= 0) {
    huellas[i].actualizar();
    huellas[i].dibujar();

    if (huellas[i].vida <= 0) {
      huellas.splice(i, 1);
    }

    i = i - 1;
  }
}

function dibujarNubeContemplar(x, y, escala, opacidad) {
  push();
  translate(x, y);
  scale(escala);

  noStroke();
  fill(255, 255, 255, opacidad);

  circle(-45, 5, 85);
  circle(0, -10, 120);
  circle(55, 8, 90);
  ellipse(5, 25, 180, 55);

  pop();
}


// FUNCIONES PARA PALABRAS LIBERADAS

function dibujarPalabrasLiberadas() {
  dibujarPalabra1();
  dibujarPalabra2();
  dibujarPalabra3();
  dibujarPalabra4();
  dibujarPalabra5();
}

function dibujarPalabra1() {
  if (activa1 === true) {
    let alpha1 = 255 - contador1 * 3;

    if (alpha1 < 0) {
      alpha1 = 0;
    }

    noStroke();
    fill(255, 255, 255, alpha1 / 3);
    circle(palabra1X + 30, palabra1Y - 8, 35 + contador1);

    fill(255, 255, 255, alpha1);
    textFont(fuenteCuerpo);
    textSize(22);
    text(palabra1, palabra1X, palabra1Y);

    contador1 = contador1 + 1;

    if (contador1 > 80) {
      activa1 = false;
      palabra1 = "";
      contador1 = 0;
    }
  }
}

function dibujarPalabra2() {
  if (activa2 === true) {
    let alpha2 = 255 - contador2 * 3;

    if (alpha2 < 0) {
      alpha2 = 0;
    }

    noStroke();
    fill(255, 255, 255, alpha2 / 3);
    circle(palabra2X + 30, palabra2Y - 8, 35 + contador2);

    fill(255, 255, 255, alpha2);
    textFont(fuenteCuerpo);
    textSize(22);
    text(palabra2, palabra2X, palabra2Y);

    contador2 = contador2 + 1;

    if (contador2 > 80) {
      activa2 = false;
      palabra2 = "";
      contador2 = 0;
    }
  }
}

function dibujarPalabra3() {
  if (activa3 === true) {
    let alpha3 = 255 - contador3 * 3;

    if (alpha3 < 0) {
      alpha3 = 0;
    }

    noStroke();
    fill(255, 255, 255, alpha3 / 3);
    circle(palabra3X + 30, palabra3Y - 8, 35 + contador3);

    fill(255, 255, 255, alpha3);
    textFont(fuenteCuerpo);
    textSize(22);
    text(palabra3, palabra3X, palabra3Y);

    contador3 = contador3 + 1;

    if (contador3 > 80) {
      activa3 = false;
      palabra3 = "";
      contador3 = 0;
    }
  }
}

function dibujarPalabra4() {
  if (activa4 === true) {
    let alpha4 = 255 - contador4 * 3;

    if (alpha4 < 0) {
      alpha4 = 0;
    }

    noStroke();
    fill(255, 255, 255, alpha4 / 3);
    circle(palabra4X + 30, palabra4Y - 8, 35 + contador4);

    fill(255, 255, 255, alpha4);
    textFont(fuenteCuerpo);
    textSize(22);
    text(palabra4, palabra4X, palabra4Y);

    contador4 = contador4 + 1;

    if (contador4 > 80) {
      activa4 = false;
      palabra4 = "";
      contador4 = 0;
    }
  }
}

function dibujarPalabra5() {
  if (activa5 === true) {
    let alpha5 = 255 - contador5 * 3;

    if (alpha5 < 0) {
      alpha5 = 0;
    }

    noStroke();
    fill(255, 255, 255, alpha5 / 3);
    circle(palabra5X + 30, palabra5Y - 8, 35 + contador5);

    fill(255, 255, 255, alpha5);
    textFont(fuenteCuerpo);
    textSize(22);
    text(palabra5, palabra5X, palabra5Y);

    contador5 = contador5 + 1;

    if (contador5 > 80) {
      activa5 = false;
      palabra5 = "";
      contador5 = 0;
    }
  }
}

function limpiarPalabras() {
  palabra1 = "";
  contador1 = 0;
  activa1 = false;

  palabra2 = "";
  contador2 = 0;
  activa2 = false;

  palabra3 = "";
  contador3 = 0;
  activa3 = false;

  palabra4 = "";
  contador4 = 0;
  activa4 = false;

  palabra5 = "";
  contador5 = 0;
  activa5 = false;
}


// EVENTOS

function keyPressed() {
  if (keyCode === ENTER && escena === 4) {
    liberarPalabraNueva();
  }

  if (key === "r" || key === "R") {
    if (escena === 3) {
      reiniciarOrden();
    }
  }

  if (key === "1") {
    escena = 1;
    huellas = [];
  }

  if (key === "2") {
    escena = 2;
    huellas = [];
  }

  if (key === "3") {
    escena = 3;
    huellas = [];
  }

  if (key === "4") {
    escena = 4;
    huellas = [];
  }

  if (key === "5") {
    escena = 5;
  }

  if (key === "6") {
    escena = 6;
    huellas = [];
  }

  if (key === "0") {
    escena = 0;
    huellas = [];
  }
}

function mousePressed() {
  print(mouseX, mouseY);

  revisarClickMenu();

  if (escena === 1) {
    if (
      mouseX > width / 2 - 170 &&
      mouseX < width / 2 + 170 &&
      mouseY > 170 &&
      mouseY < 510
    ) {
      if (respirarActivo === false) {
        respirarActivo = true;
      } else {
        respirarActivo = false;
      }
    }
  }

  if (escena === 3) {
    if (pieza1.estaEncima() === true) {
      piezaSeleccionada = 1;
    } else if (pieza2.estaEncima() === true) {
      piezaSeleccionada = 2;
    } else if (pieza3.estaEncima() === true) {
      piezaSeleccionada = 3;
    } else if (pieza4.estaEncima() === true) {
      piezaSeleccionada = 4;
    } else if (pieza5.estaEncima() === true) {
      piezaSeleccionada = 5;
    }
  }
}

function mouseDragged() {
  if (escena === 3) {
    if (piezaSeleccionada === 1) {
      pieza1.mover();
    }

    if (piezaSeleccionada === 2) {
      pieza2.mover();
    }

    if (piezaSeleccionada === 3) {
      pieza3.mover();
    }

    if (piezaSeleccionada === 4) {
      pieza4.mover();
    }

    if (piezaSeleccionada === 5) {
      pieza5.mover();
    }
  }
}

function mouseReleased() {
  piezaSeleccionada = 0;
}


// Ajustar el tamaño cuando cambia el tamaño de la pantalla

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

