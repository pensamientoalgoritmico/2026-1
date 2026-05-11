// Nombre: Maria José Pedroza Rusinque
// Nombre del proyecto: Sky Collector
// Descripción: App que usa la cámara para detectar la iluminación
// del entorno, asigna un cielo y deja pintar con sus colores.
// La música suena mientras pintas y se apaga cuando paras.

//// CONCEPTO:
// Sky Collector nace de la idea de que la luz que te rodea.La cámara lee esa luz, te asigna un cielo, y tú lo conviertes en una pintura única. Decidí cambiar la idea completamente porque lo otro no me producía nada en verdad no me terminaba de convencer. 


// Referentes:
// Reel de Instagram de app antiprocastinadora con cámara.
// Me inspiré en usar la cámara como sensor activo, no solo foto.
//https://www.instagram.com/reel/DWWhIGAEfaN/?igsh=MTBtcDh0bHRnbXdxYg==

// Uso de IA (Claude de Anthropic):
//1.. Entender cómo funciona createCapture() y cómo dibujar el video en el canvas con image()
//2. Aprender a leer el color de un pixel de la cámara con camara.get() y calcular luminosidad
//3. Corregir errores cuando me lanzaba errores que no lograba corregir faltantes en arrays, variables no declaradas arriba
//4. Separar la lógica de pantallas en funciones distintas para tener un solo draw() 
//5. Ayuda con el CSS para que el canvas ocupara toda la pantalla con position: fixed


// VARIABLES GENERALES
let fotos = [];
let totalFotos = 20;
let indiceAsignado = 0;
let pantalla = "intro";
let gotas = [];

let camara, sliderOpacidad;
let track;
let miFuente;

let btnInicio, btnVolver, btnFoto;

let colorFondo = [250, 245, 235];
let colorTexto = [80, 70, 60];

// PRELOAD
// Carga archivos antes de arrancar
function preload() {
  miFuente = loadFont("Cute Notes.ttf");
  for (let i = 0; i < totalFotos; i++) {
    fotos[i] = loadImage("cielo" + i + ".jpg");
  }
  track = loadSound("lenta.mp3");
}

// SETUP
// Corre una sola vez al inicio
function setup() {
  // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");
  background(colorFondo);

  // CAMARA — prende la cámara, se dibuja en canvas con image()
  camara = createCapture(VIDEO);
  camara.size(320, 240);
  camara.hide();

  // SLIDER — controla transparencia de las gotas, le pedi ayuda a chat 
  sliderOpacidad = createSlider(5, 150, 60);
  sliderOpacidad.position(425, 650);
  sliderOpacidad.style("width", "200px");
  sliderOpacidad.style("cursor", "pointer");
  sliderOpacidad.style("accent-color", "#50463C");
  sliderOpacidad.hide();

  // BOTON INICIO — lleva del intro al escáner
  btnInicio = createButton("INICIAR ESCÁNER");
  btnInicio.position(windowWidth / 2 - 100, windowHeight / 2 + 200);
  btnInicio.size(200, 50);
  estiloBotonPrincipal(btnInicio);
  btnInicio.mouseOver(function() {
    btnInicio.style("background-color", "#8a7a6e");
  });
  btnInicio.mouseOut(function() {
    btnInicio.style("background-color", "#50463C");
  });
  btnInicio.mousePressed(function() {
    pantalla = "escaner";
    btnInicio.hide();
  });

  // BOTON REINICIAR — vuelve a intro
  btnVolver = createButton("NUEVA BÚSQUEDA 🔄");
  btnVolver.position(150, 640);
  btnVolver.size(180, 40);
  estiloBoton(btnVolver);
  btnVolver.mouseOver(function() {
    btnVolver.style("background-color", "#50463C");
    btnVolver.style("color", "#FAF5EB");
  });
  btnVolver.mouseOut(function() {
    btnVolver.style("background-color", "transparent");
    btnVolver.style("color", "#50463C");
  });
  btnVolver.mousePressed(reiniciar);
  btnVolver.hide();

  // BOTON GUARDAR — guarda el canvas como imagen jpg
  btnFoto = createButton("GUARDAR OBRA ⬇️");
  btnFoto.position(950, 640);
  btnFoto.size(180, 40);
  estiloBoton(btnFoto);
  btnFoto.mouseOver(function() {
    btnFoto.style("background-color", "#50463C");
    btnFoto.style("color", "#FAF5EB");
  });
  btnFoto.mouseOut(function() {
    btnFoto.style("background-color", "transparent");
    btnFoto.style("color", "#50463C");
  });
  btnFoto.mousePressed(function() {
    saveCanvas("mi mood en un cielo", "jpg");
  });
  btnFoto.hide();
}

// DRAW
// Corre 60 veces por segundo — un solo draw
function draw() {
  if (pantalla == "intro") {
    background(colorFondo);
    diseñoIntro();
  } else if (pantalla == "escaner") {
    diseñoEscaner();
  } else if (pantalla == "pintura") {
    diseñoPintura();
  }
}

// PANTALLA INTRO
function diseñoIntro() {
  tint(255, 80);
  imageMode(CENTER);
  image(fotos[0], width / 2, height / 2, 1000, 600);
  noTint();

  stroke(colorTexto[0], colorTexto[1], colorTexto[2], 60);
  strokeWeight(0.5);
  line(100, 120, width - 100, 120);
  noStroke();

  textAlign(CENTER);
  fill(colorTexto[0], colorTexto[1], colorTexto[2]);
  textFont(miFuente);
  textSize(80);
  text("Sky Collector", width / 2, height / 2 - 20);

  textFont("Courier New");
  textSize(16);
  fill(colorTexto[0], colorTexto[1], colorTexto[2], 180);
  text("tu luz revela tu vibe", width / 2, height / 2 + 40);

  stroke(colorTexto[0], colorTexto[1], colorTexto[2], 60);
  strokeWeight(0.5);
  line(100, height - 120, width - 100, height - 120);
  noStroke();
}

// PANTALLA ESCANER
// Muestra la cámara y analiza la luminosidad del pixel central
function diseñoEscaner() {
  background(colorFondo);
  imageMode(CENTER);

  noStroke();
  fill(235, 230, 220);
  rectMode(CENTER);
  rect(width / 2, height / 2, 500, 380, 20);

  image(camara, width / 2, height / 2);

  fill(colorTexto[0], colorTexto[1], colorTexto[2]);
  textFont("Courier New");
  textSize(13);
  textAlign(CENTER);
  text("posiciónate bien iluminado — presiona ESPACIO cuando estés listo", width / 2, height / 2 + 230);

  // Lee el pixel central y calcula luminosidad promedio
  let c = camara.get(camara.width / 2, camara.height / 2);
  let lum = (red(c) + green(c) + blue(c)) / 3;

  // Asigna cielo según luminosidad
  textSize(18);
  if (lum > 160) {
    indiceAsignado = 1;
    text("ILUMINACIÓN: CÁLIDA / ALTA ☀️", width / 2, 620);
  } else if (lum > 90) {
    indiceAsignado = 7;
    text("ILUMINACIÓN: SUAVE / MEDIA 🌅", width / 2, 620);
  } else {
    indiceAsignado = 15;
    text("ILUMINACIÓN: DARK / BAJA 🌑", width / 2, 620);
  }

  // Mira central — indica dónde se lee la luminosidad
  noFill();
  stroke(colorTexto[0], colorTexto[1], colorTexto[2], 100);
  strokeWeight(1);
  rectMode(CENTER);
  rect(width / 2, height / 2, 120, 80);
  noStroke();
}

// PANTALLA PINTURA
// Sin background() para que las gotas se acumulen
function diseñoPintura() {
  if (mouseIsPressed && mouseY < 620) {
    // Arranca música al empezar a pintar
    if (track.isPlaying() == false) {
      track.setVolume(1);
      track.loop();
    }

    let v = dist(pmouseX, pmouseY, mouseX, mouseY);

    // Toma el color del pixel del cielo en la posición del mouse
    let imgActual = fotos[indiceAsignado];
    let col = imgActual.get(
      map(mouseX, 0, width, 0, imgActual.width),
      map(mouseY, 0, height, 0, imgActual.height)
    );

    gotas.push(new Gota(mouseX, mouseY, col, v));

  } else {
    // Baja el volumen cuando suelta el mouse
    if (track.isPlaying() == true) {
      track.setVolume(0, 1);
    }
  }

  for (let i = 0; i < gotas.length; i++) {
    gotas[i].dibujar();
  }

  dibujarHUD();
  btnVolver.show();
  btnFoto.show();
  sliderOpacidad.show();
}

// HUD
// el HUD es la barra que siempre queda encima del canvas y evita que las gotas se pinten ahí. El rect(0, 0, width, 60) dibuja un rectángulo semitransparente en la parte superior de ancho a ancho, y como se dibuja al final de diseñoPintura() siempre tapa lo que haya debajo.

function dibujarHUD() {
  noStroke();
  fill(colorFondo[0], colorFondo[1], colorFondo[2], 220);
  rectMode(CORNER);
  rect(0, 0, width, 60);

  fill(colorTexto[0], colorTexto[1], colorTexto[2]);
  textFont(miFuente);
  textSize(30);
  textAlign(LEFT);
  text("MIRA TU CIELO", 30, 45);

  textFont("Courier New");
  textSize(11);
  fill(colorTexto[0], colorTexto[1], colorTexto[2], 160);
  text("opacidad", 390, 643);
}

// REINICIAR
function reiniciar() {
  pantalla = "intro";
  gotas = [];
  track.stop();
  btnVolver.hide();
  btnFoto.hide();
  sliderOpacidad.hide();
  btnInicio.show();
}

// TECLA ESPACIO
// Confirma iluminación y pasa a pintar
function keyPressed() {
  if (pantalla == "escaner" && key == " ") {
    pantalla = "pintura";
    sliderOpacidad.show();
    background(colorFondo);
  }
}

// CLASE GOTA
// Plantilla para cada "pincelada" PARA CADA CIRCULITO EN LA "BROCHA"
class Gota {
  constructor(x, y, c, v) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.tam = map(v, 0, 50, 30, 120); // tamaño según velocidad
    this.ang = random(TWO_PI);          // ángulo aleatorio dependiendo de la persona
  }

  dibujar() {
    push();
    translate(this.x, this.y);
    rotate(this.ang);
    noStroke();
    fill(red(this.c), green(this.c), blue(this.c), sliderOpacidad.value());
    ellipse(0, 0, this.tam, this.tam);
    pop();
  }
}

// ESTILOS DE BOTONES
// Referencia: p5js.org/reference/#/p5.Element/style

function estiloBoton(b) {
  b.style("background-color", "transparent");
  b.style("color", "#50463C");
  b.style("border", "1px solid #50463C");
  b.style("font-family", "Courier New");
  b.style("font-size", "13px");
  b.style("cursor", "pointer");
}

function estiloBotonPrincipal(b) {
  b.style("background-color", "#50463C");
  b.style("color", "#FAF5EB");
  b.style("border", "none");
  b.style("font-family", "Impact");
  b.style("font-size", "15px");
  b.style("letter-spacing", "2px");
  b.style("cursor", "pointer");
}