/*
  FAMILIAR  
  Asistente virtual de bienestar y cuidado mientra trabajas largas jornadas
  
  Alejandro Claros - 202122208

*/

// Variables Globales

let Gato1,
  Gato2,
  Gato3,
  Canino1,
  Canino2,
  Canino3,
  Robot1,
  Robot2,
  Robot3,
    Anima1,
Anima2,
Anima3,
  Nube;
let entradaNombreUsuario,
  entradaNombreAsistente,
  selectorFormaAsistente,
  botonAvanzar,
  botonDespertar,
  botonVamos,
  botonReiniciar,
  botonPausaReanudar;
let checkAgua, sliderAgua, checkEstirar, sliderEstirar, checkVida, sliderVida, checkDescanso, sliderDescanso;
let todosLosElementos = [];
let Fuente1, Fuente2;

let estadoDelAsistente = "durmiendo";
let sistemaActivo = false;
let pantallaActual = 1;
let avisoBloqueo = false;
let relojAgua, relojConversación, relojEstiramiento, relojDescando;
let colorFondoArriba, colorFondoAbajo;

let radioTransicion = 0;
let estadoTransicion = "reposo";
let siguientePantalla = 1;

// Base de datos para los mensajes emergentes deacuerdo a cada Familiar

const descripciones = {
  Anima:
    "El Ánima es equilibrio y paz; una guía espiritual para mantener la calma en tus entregas.",
  Robot:
    "El Robot es precisión técnica; un sistema avanzado programado para optimizar tu rendimiento.",
  Felino:
    "El Gato es inteligente y curioso; un observador ágil listo para ayudarte con todo.",
  Canino:
    "El Perro es leal y valiente; un guerrero que está para proteger tu bienestar.",
};

const personalidades = {
  Robot: {
    agua: [
      "PROTOCOLO HIDRATACIÓN: Consumir H2O.",
      "ADVERTENCIA: Niveles bajos.",
      "BIP! Ingerir 250ml.",
    ],
    estirar: [
      "DETECCIÓN: Postura no óptima.",
      "BUP! Inicie estiramiento.",
      "SISTEMA: Alineación correctiva.",
    ],
    vida: [
      "DATO: Diseño = Solución.",
      "BIP! Necesita descanso.",
      "ANALIZANDO: Enfoque.",
    
    ],
  },
  Anima: {
    agua: [
      "Buen momento para agua.",
      "Mantente hidratado, [nombre].",
      "Tu cuerpo necesita agua.",
    ],
    estirar: [
      "Te invito a estirarte.",
      "Levantarte te ayudará.",
      "Cuida tu postura.",
    ],
    vida: ["Gran trabajo.", "El descanso es vital.", "¿Cómo te sientes?"],
  },
  Felino: {
    agua: [
      "¡Miau! Tienes sed, [nombre].",
      "*Purrr*... Bebe agüita.",
      "¡Miau! No te seques.",
    ],
    estirar: [
      "¡Estírate como gatito!",
      "Miau... muévete.",
      "*Miau*... Espalda tensa.",
    ],
    vida: [
      "¡Miau! Eres genial.",
      "*Purrr*... Todo saldrá bien.",
      "¡Sigue creando!",
    ],
  },
  Canino: {
    agua: ["¡Guau! Tengo sed, ¿tú?", "¡Lame! Bebe agua.", "¿Vamos por agua?"],
    estirar: [
      "¡A estirarse!",
      "¡Guau! Juguemos un poco.",
      "*Wuff*... ¡Sacúdete!",
    ],
    vida: [
      "¡Buen humano!",
      "¡Guau! Diseños geniales.",
      "¡Guau! Líder de la manada.",
    ],
  },
};

// Precargas

function preload() {
  Gato1 = loadImage("assets/Gato1.png");
  Gato2 = loadImage("assets/Gato2.png");
  Gato3 = loadImage("assets/Gato3.png");
  Canino1 = loadImage("assets/Canino1.png");
  Canino2 = loadImage("assets/Canino2.png");
  Canino3 = loadImage("assets/Canino3.png");
  Robot1 = loadImage("assets/Robot1.png");
  Robot2 = loadImage("assets/Robot2.png");
  Robot3 = loadImage("assets/Robot3.png");
  Anima1 = loadImage("assets/Anima1.png");
  Anima2 = loadImage("assets/Anima2.png");
  Anima3 = loadImage("assets/Anima3.png");
  Nube = loadImage("assets/Nube.png");
  Fuente1 = loadFont("assets/Fuente1.otf");
  Fuente2 = loadFont("assets/Fuente2.ttf");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight).parent("canvasContainer");
  cnv.style("z-index", "10");
  colorFondoArriba = color(105, 105, 169);
  colorFondoAbajo = color(140, 25, 220);

// Estilo para los botones html

  let bloqueEstilo = createElement('style', `
    @font-face {
      font-family: 'Fuente2'; 
      src: url('assets/Fuente2.ttf');
    }
    
    button, input, select {
      font-family: 'Fuente2', sans-serif !important;
    }
  `);

  crearElementosUI();
  actualizarVisibilidad();
}

// Cracion de Elementos de interacción, estan divididos por cada pantalla visible

function crearElementosUI() {

  // PANTALLA 1
  entradaNombreUsuario = createInput("").attribute("placeholder", "Tu nombre");
  entradaNombreUsuario.position(width / 2 - 130, height * 0.5);
  estilizarElemento(entradaNombreUsuario, false);

  botonAvanzar = createButton("AVANZAR");
  botonAvanzar.position(width / 2 - 130, height * 0.58);
  estilizarElemento(botonAvanzar, true);
  botonAvanzar.mousePressed(() => {
    iniciarTransicion(2);
  });

  // PANTALLA 2
  entradaNombreAsistente = createInput("").attribute(
    "placeholder",
    "Nombre del asistente"
  );
  entradaNombreAsistente.position(width / 2 - 130, height * 0.7);
  estilizarElemento(entradaNombreAsistente, false);

  selectorFormaAsistente = createSelect();
  selectorFormaAsistente.position(width / 2 - 130, height * 0.77);
  selectorFormaAsistente.option("Anima");
  selectorFormaAsistente.option("Robot");
  selectorFormaAsistente.option("Felino");
  selectorFormaAsistente.option("Canino");
  estilizarElemento(selectorFormaAsistente, false);

  botonDespertar = createButton("DESPERTAR A FAMILIAR");
  botonDespertar.position(width / 2 - 130, height * 0.85);
  estilizarElemento(botonDespertar, true);
  botonDespertar.mousePressed(() => {
    iniciarTransicion(3);
  });

  // PANTALLA 3
  let posX = width - 320;
  let posY = height * 0.22;
  checkAgua = createCheckbox(" AGUA", true);
  checkAgua.position(posX, posY);
  sliderAgua = createSlider(1, 60, 10);
  sliderAgua.position(posX, posY + 35);
  sliderAgua.size(250);

  checkEstirar = createCheckbox(" ESTIRAR", true);
  checkEstirar.position(posX, posY + 110);
  sliderEstirar = createSlider(1, 60, 20);
  sliderEstirar.position(posX, posY + 145);
  sliderEstirar.size(250);

  checkVida = createCheckbox(" VIDA", true);
  checkVida.position(posX, posY + 220);
  sliderVida = createSlider(1, 60, 5);
  sliderVida.position(posX, posY + 255);
  sliderVida.size(250);
  
  checkDescanso = createCheckbox(" DESCANSO", true);
  checkDescanso.position(posX, posY + 330);
  sliderDescanso = createSlider(1, 60, 5);
  sliderDescanso.position(posX, posY + 365);
  sliderDescanso.size(250);

  botonVamos = createButton("¡EMPEZAR!");
  botonVamos.position(posX, posY + 475);
  estilizarElemento(botonVamos, true);
  botonVamos.size(250, 50);
  botonVamos.mousePressed(() => {
    iniciarSistema();
    iniciarTransicion(4);
  });

  // PANTALLA 4
  botonPausaReanudar = createButton("PAUSAR ALERTAS");
  botonPausaReanudar.position(width * 0.75 - 125, height / 2 - 25);
  estilizarElemento(botonPausaReanudar, true);
  botonPausaReanudar.style("background-color", "#E67E22");
  botonPausaReanudar.mousePressed(alternarRelojes);

  // GLOBAL
  botonReiniciar = createButton("REINICIAR");
  botonReiniciar.position(50, height - 70);
  estilizarElemento(botonReiniciar, true);
  botonReiniciar.size(150, 40);
  botonReiniciar.style("background-color", "#E74C3C");
  botonReiniciar.mousePressed(() => window.location.reload());

  todosLosElementos = [
    entradaNombreUsuario,
    botonAvanzar,
    entradaNombreAsistente,
    selectorFormaAsistente,
    botonDespertar,
    checkAgua,
    sliderAgua,
    checkEstirar,
    sliderEstirar,
    checkVida,
    sliderVida,
    checkDescanso,
    sliderDescanso,
    botonVamos,
    botonReiniciar,
    botonPausaReanudar,
  ];
}

// Esta parte la construyo la IA, es una forma de dividir las funiones de draw de acuerdo a la pantalla que corresponde.

function draw() {
  dibujarFondoDegradado();

  switch (pantallaActual) {
    case 1:
      menuBienvenida();
      break;
    case 2:
      menuPersonalizacion();
      break;
    case 3:
      menuConfiguracion();
      break;
    case 4:
      menuMonitoreo();
      break;
  }

  if (avisoBloqueo) {
    fill(255, 200, 0);
    textAlign(CENTER);
    textSize(16);
    textStyle(BOLD);
    text("⚠️ ACTIVA LAS VENTANAS EMERGENTES", width / 2, height * 0.95);
  }

  manejarTransicion();
}

// Bloques de texto

function menuBienvenida() {
  textAlign(CENTER);
  fill(255);
  textSize(80);
  textStyle(BOLD);
  textFont(Fuente1);
  text("BIENVENIDO A FAMILIAR", width / 2, height * 0.4);
  textFont('sans-serif');
}

function menuPersonalizacion() {
  dibujarCuerpoAsistente(width / 2);
  textAlign(LEFT);
  fill(255);
  textSize(24);
  textStyle(BOLD);
  textFont(Fuente1);
  text("PERSONALIZA TU COMPAÑERO", 80, height * 0.3);
  textFont('sans-serif');
  textSize(16);
  textStyle(NORMAL);
  text(descripciones[selectorFormaAsistente.value()], 80, height * 0.35, 300);
}

function menuConfiguracion() {
  dibujarInstrucciones();
  dibujarInterfazNarrativa();
  dibujarTextosDerecha();
  dibujarCuerpoAsistente(width / 2);
}

function menuMonitoreo() {
  dibujarCuerpoAsistente(width * 0.3);
  textAlign(CENTER);
  fill(255);
  textSize(26);
  textStyle(BOLD);
  text("ADELANTE, AQUI ESTOY", width * 0.75, height / 2 - 120);
  textSize(16);
  textStyle(NORMAL);
  let estadoTxt = sistemaActivo ? "SISTEMA: ACTIVO" : "SISTEMA: EN PAUSA";
  text(estadoTxt, width * 0.75, height / 2);
}

// Dibujo de los cuerpos de los Asistentes

function dibujarCuerpoAsistente(posX) {
  let forma = selectorFormaAsistente.value();
  let movY = sin(frameCount / 50) * 15;
  push();
  translate(posX, height / 2 + movY);
  imageMode(CENTER);
  if (forma === "Felino") {
    if (estadoDelAsistente === "despierto") {
      image(Gato2, 0, 0, 900, 675);
      image(
        Gato3,
        map(mouseX, 0, width, -5, 5),
        map(mouseY, 0, height, -5, 5),
        900,
        675
      );
    } else {
      image(Gato1, 0, 0, 600, 450);
    }
  } else if (forma === "Canino") {
    if (estadoDelAsistente === "despierto") {
      image(Canino2, 0, 0, 900, 675);
      image(
        Canino3,
        map(mouseX, 0, width, -2, 2),
        map(mouseY, 0, height, -2, 2),
        900,
        675
      );
    } else {
      image(Canino1, 0, 0, 600, 450);
    }
  } else if (forma === "Robot") {
    if (estadoDelAsistente === "despierto") {
      image(Robot2, 0, 0, 900, 675);
      image(
        Robot3,
        map(mouseX, 0, width, -5, 5),
        map(mouseY, 0, height, -5, 5),
        900,
        675
      );
    } else {
      image(Robot1, 0, 0, 600, 450);
    }
  } else if (forma === "Anima") {
    if (estadoDelAsistente === "despierto") {
     
      image(Anima2, 0, 0, 900, 675);
      image(
        Anima3,
        map(mouseX, 0, width, -5, 5),
        map(mouseY, 0, height, -5, 5),
        900,
        675
      );
    } else {
   
      image(Anima1, 0, 0, 600, 450);
    }
  }
  pop();
}

// Mas texto

function dibujarInterfazNarrativa() {
  fill(255);
  textAlign(CENTER);
  textSize(28);
  textStyle(BOLD);
  textFont(Fuente1);
  let nombre = (entradaNombreAsistente.value() || "FAMILIAR").toUpperCase();
  text(nombre, width / 2, height / 2 - 305); //
  textFont('sans-serif');

  let bX = width / 2 + 260;
  let bY = height / 2 - 120;
  push();
  imageMode(CENTER);
  image(Nube, bX, bY, 350, 250);
  pop();
  fill(21, 67, 96);
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  let saludo =
    "¡Hola, " +
    (entradaNombreUsuario.value() || "Usuario") +
    "!\nSoy " +
    nombre +
    ".\n¿Empezamos?";
  text(saludo, bX, bY - 20);
}

function dibujarInstrucciones() {
  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(24);
  textFont(Fuente1) 
  text("CÓMO USAR A TU FAMILIAR", 60, 80);
  textFont('sans-serif');
  textSize(16);
  textStyle(NORMAL);
  text(
    "Has despertado a un Familiar, una entidad que custodia tu bienestar mientras te sumerges en el trabajo profundo.\n\n1. Calibrar el Vínculo: Ajusta los ciclos de alerta en el panel derecho.\n2. Iniciar el Resguardo: Presiona ¡EMPEZAR! para activar la vigilancia activa.\n3. Atender el Llamado: Tu compañero se manifestará para restaurar tu equilibrio.",
    60,
    130,
    300
  );
}

function dibujarTextosDerecha() {
  let posX = width - 320;
  let iY = height * 0.22;
  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(22);
  textFont(Fuente1)
  text("¿Que te recuerdo?", posX, iY - 45);
  textSize(20);
  textStyle(NORMAL);
  text("CADA: " + sliderAgua.value() + " MIN", posX + 170, iY + 10);
  text("CADA: " + sliderEstirar.value() + " MIN", posX + 170, iY + 120);
  text("CADA: " + sliderVida.value() + " MIN", posX + 170, iY + 230);
  text("CADA: " + sliderDescanso.value() + " MIN", posX + 170, iY + 340);
}

// Sistema de Alertas, el corazon de todo el proyecto, boton de inicio y apagado de los relojes

function alternarRelojes() {
  if (sistemaActivo) {
    pararSistema();
    botonPausaReanudar.html("REANUDAR ALERTAS");
    botonPausaReanudar.style("background-color", "#27AE60");
  } else {
    iniciarSistema();
    botonPausaReanudar.html("PAUSAR ALERTAS");
    botonPausaReanudar.style("background-color", "#E67E22");
  }
}

function iniciarSistema() {
  sistemaActivo = true;
  let f = selectorFormaAsistente.value();
  if (checkAgua.checked())
    relojAgua = setInterval(
      () => lanzarAlerta(personalidades[f]["agua"], "#3498db"),
      sliderAgua.value() * 60000
    );
  if (checkEstirar.checked())
    relojEstiramiento = setInterval(
      () => lanzarAlerta(personalidades[f]["estirar"], "#8E44AD"),
      sliderEstirar.value() * 60000
    );
  if (checkVida.checked())
    relojVida = setInterval(
      () => lanzarAlerta(personalidades[f]["vida"], "#1ABC9C"),
      sliderVida.value() * 60000
    );
  if (checkDescanso.checked())
    relojDescanso = setInterval(
      () => lanzarAlerta(personalidades[f]["Descanso"], "#1ABC9C"),
      sliderDescanso.value() * 60000
    );
}

// HTML de las alertas emergentes

function lanzarAlerta(lista, colorTema) {
  let frase = random(lista).replace("[nombre]", entradaNombreUsuario.value());
  let popup = window.open("", "_blank", "width=400,height=300");
  if (popup) {
    popup.document.write(
      `<html><body style="background:#154360; color:white; font-family:sans-serif; text-align:center; display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; margin:0; border: 15px solid ${colorTema};"><h3>${entradaNombreAsistente
        .value()
        .toUpperCase()} DICE:</h3><h2 style="padding:20px;">"${frase}"</h2><button onclick="window.close()" style="background:${colorTema}; color:white; border:none; padding:15px 30px; border-radius:30px; cursor:pointer; font-weight:bold; font-size:18px;">¡Entendido!</button></body></html>`
    );
  } else {
    avisoBloqueo = true;
  }
}

function pararSistema() {
  sistemaActivo = false;
  clearInterval(relojAgua);
  clearInterval(relojEstiramiento);
  clearInterval(relojVida);
  clearInterval(relojDescanso);
}

// Transición, la IA me ayudo aca, para que un elemento correspondiente a un bloque de pantalla aparezca el circulo debe ser igual a la diagonal de la pantalla para que se dibujen y asi tener una transición

function manejarTransicion() {
  if (estadoTransicion === "reposo") return;
  push();
  noStroke();
  fill(21, 67, 96);
  if (estadoTransicion === "creciendo") {
    radioTransicion += 85;
    let cobertura = dist(width / 2, height / 2, width, height) * 2;
    if (radioTransicion > cobertura) {
      if (siguientePantalla === 3) estadoDelAsistente = "despierto";
      pantallaActual = siguientePantalla;
      actualizarVisibilidad();
      estadoTransicion = "encogiendo";
    }
  } else if (estadoTransicion === "encogiendo") {
    radioTransicion -= 85;
    if (radioTransicion <= 0) {
      radioTransicion = 0;
      estadoTransicion = "reposo";
      todosLosElementos.forEach((e) => e.style("z-index", "20"));
    }
  }
  circle(width / 2, height / 2, radioTransicion);
  pop();
}

function iniciarTransicion(proxima) {
  estadoTransicion = "creciendo";
  siguientePantalla = proxima;
  radioTransicion = 1;
  todosLosElementos.forEach((e) => e.style("z-index", "-1"));
}

// Esto oculta los elementos entre las pantallas

function actualizarVisibilidad() {
  todosLosElementos.forEach((e) => e.hide());
  if (pantallaActual === 1) {
    entradaNombreUsuario.show();
    botonAvanzar.show();
  } else if (pantallaActual === 2) {
    entradaNombreAsistente.show();
    selectorFormaAsistente.show();
    botonDespertar.show();
  } else if (pantallaActual === 3) {
    [
      checkAgua,
      sliderAgua,
      checkEstirar,
      sliderEstirar,
      checkVida,
      sliderVida,
      checkDescanso,
      sliderDescanso,
      botonVamos,
      botonReiniciar,
    ].forEach((e) => e.show());
  } else if (pantallaActual === 4) {
    botonPausaReanudar.show();
    botonReiniciar.show();
  }
}

function dibujarFondoDegradado() {
  for (let y = 0; y < height; y++) {
    stroke(
      lerpColor(colorFondoArriba, colorFondoAbajo, map(y, 0, height, 0, 1))
    );
    line(0, y, width, y);
  }
}

//Estilo del HTML

function estilizarElemento(elem, esBoton) {
  elem.style("border", "none");
  elem.style("border-radius", "25px");
  elem.size(260, 45);
  elem.style('font-family', 'Fuente2');
  if (esBoton) {
    elem.style("background-color", "#154360");
    elem.style("color", "white");
    elem.style("font-weight", "normal");
    elem.style("cursor", "pointer");
    elem.style('font-size', '22px');
  } else {
    elem.style("background-color", "rgba(255, 255, 255, 0.9)");
    elem.style("padding-left", "15px");
    elem.style("font-size", "20px");
  }
  elem.style("z-index", "20");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  actualizarVisibilidad();
}
