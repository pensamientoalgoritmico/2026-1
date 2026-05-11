// SANTIAGO GIRALDO
// RECONFIGURADOR EMOCIONAL
// PROYECTO FINAL

let font;

let puntos = [];
let particulas = [];
let residuos = [];

let inputTexto;

let intensidad = 50;
let fractura = 0;

let texture1;
let texture2;
let texture3;

let scan1;
let scan2;
let scan3;

let smoke1;
let smoke2;

let ambient;
let glitch;
let heartbeat;

let mic;
let micLevel = 0;

let glitchMode = false;

let procesando = false;

let emotionColor;

let overlayScale = 1.2;

// ======================================================
// PRELOAD
// ======================================================

function preload() {

  font = loadFont('assets/emotion.ttf');

  texture1 = loadImage('assets/texture1.jpg');
  texture2 = loadImage('assets/texture2.jpg');
  texture3 = loadImage('assets/texture3.jpg');

  scan1 = loadImage('assets/scan1.jpg');
  scan2 = loadImage('assets/scan2.jpg');
  scan3 = loadImage('assets/scan3.jpg');

  smoke1 = loadImage('assets/smoke1.png');
  smoke2 = loadImage('assets/smoke2.png');

  soundFormats('mp3');

  ambient = loadSound('assets/ambient.mp3');
  glitch = loadSound('assets/glitch.mp3');
  heartbeat = loadSound('assets/heartbeat.mp3');
}

// ======================================================
// SETUP
// ======================================================

function setup() {

  createCanvas(windowWidth, windowHeight);

  userStartAudio();

  noCursor();

  textFont(font);

  emotionColor = color(255);

  // INPUT

  inputTexto = createInput();

  inputTexto.position(40, 40);

  inputTexto.size(320);

  inputTexto.style('background', 'black');
  inputTexto.style('color', 'white');
  inputTexto.style('border', '1px solid white');
  inputTexto.style('padding', '10px');
  inputTexto.style('font-size', '14px');
  inputTexto.style('font-family', 'monospace');
  inputTexto.style('outline', 'none');

  // MICRÓFONO

  mic = new p5.AudioIn();
  mic.start();

  // AUDIO

  ambient.loop();
  ambient.setVolume(0.45);

  heartbeat.loop();
  heartbeat.setVolume(0.5);

  generarTextoInicial();
}

// ======================================================
// DRAW
// ======================================================

function draw() {

  background(0, 45);

  micLevel = mic.getLevel();

  // ======================================================
  // VARIABLES
  // ======================================================

  intensidad = map(
    mouseX,
    0,
    width,
    0,
    100
  );

  fractura = map(
    micLevel,
    0,
    0.15,
    0,
    100
  );

  fractura = constrain(
    fractura,
    0,
    100
  );

  // ======================================================
  // COLOR EMOCIONAL
  // ======================================================

  let textoActual =
    inputTexto.value().toLowerCase();

  // SUAVES

  if(

    textoActual.includes('amor') ||
    textoActual.includes('calma') ||
    textoActual.includes('feliz') ||
    textoActual.includes('tranquilo') ||
    textoActual.includes('paz') ||
    textoActual.includes('alegria')

  ){

    emotionColor = lerpColor(

      emotionColor,

      color(255, 240, 180),

      0.03
    );
  }

  // FUERTES

  else if(

    textoActual.includes('rabia') ||
    textoActual.includes('odio') ||
    textoActual.includes('enojo') ||
    textoActual.includes('estres') ||
    textoActual.includes('miedo') ||
    textoActual.includes('ansiedad')

  ){

    emotionColor = lerpColor(

      emotionColor,

      color(255, 40, 40),

      0.03
    );
  }

  // TRISTES

  else if(

    textoActual.includes('triste') ||
    textoActual.includes('vacío') ||
    textoActual.includes('solo') ||
    textoActual.includes('nostalgia')

  ){

    emotionColor = lerpColor(

      emotionColor,

      color(120, 170, 255),

      0.03
    );
  }

  // NEUTRAL

  else{

    emotionColor = lerpColor(

      emotionColor,

      color(255),

      0.03
    );
  }

  // ======================================================
  // FONDO REACTIVO
  // ======================================================

  fill(
    red(emotionColor) * 0.15,
    green(emotionColor) * 0.15,
    blue(emotionColor) * 0.15,
    30
  );

  rect(0, 0, width, height);

  // ======================================================
  // TEXTURAS
  // ======================================================

  blendMode(BLEND);

  tint(255, 15);
  image(texture1, 0, 0, width, height);

  tint(255, 10);
  image(texture2, 0, 0, width, height);

  if(glitchMode || fractura > 65){

    blendMode(ADD);

    tint(255, 18);

    image(texture3, 0, 0, width, height);

    blendMode(BLEND);
  }

  // ======================================================
  // SCANS
  // ======================================================

  if(glitchMode || fractura > 65){

    blendMode(SCREEN);

    tint(255, 12);

    let extraW = width * overlayScale;
    let extraH = height * overlayScale;

    image(
      scan1,
      -width * 0.1,
      -height * 0.1,
      extraW,
      extraH
    );

    tint(255, 20);

    image(
      scan2,

      sin(frameCount * 0.01) * 40 - width * 0.1,

      -height * 0.1,

      extraW,
      extraH
    );

    tint(255, 16);

    image(
      scan3,

      random(-8, 8) - width * 0.1,

      random(-8, 8) - height * 0.1,

      extraW,
      extraH
    );

    blendMode(BLEND);
  }

  // ======================================================
  // FLASHES
  // ======================================================

  if(glitchMode || fractura > 65){

    if(random(1) < 0.02){

      fill(255, 20);

      rect(
        0,
        random(height),
        width,
        random(5, 30)
      );
    }
  }

  // ======================================================
  // INTERFAZ
  // ======================================================

  mostrarInterfaz();

  // ======================================================
  // TEXTO
  // ======================================================

  push();

  translate(width/2, height/2);

  let escala = map(
    intensidad,
    0,
    100,
    0.8,
    2
  );

  scale(escala);

  if(glitchMode || fractura > 65){

    rotate(
      sin(frameCount * 0.02) * 0.03
    );
  }

  for(let i = 0; i < puntos.length; i++){

    let p = puntos[i];

    let ruido = noise(
      p.x * 0.01,
      p.y * 0.01,
      frameCount * 0.01
    );

    let movimiento = map(
      ruido,
      0,
      1,
      -fractura,
      fractura
    );

    let audioReact =
      micLevel * 1200;

    let x =
      p.x -
      width/2 +
      movimiento +
      random(-audioReact, audioReact);

    let y =
      p.y -
      height/2 +
      movimiento +
      random(-audioReact, audioReact);

    let respiracion =
      sin(frameCount * 0.05 + i) * 1.5;

    let size =
      map(intensidad, 0, 100, 2, 8)
      + respiracion;

    noStroke();

    fill(

      red(emotionColor),

      green(emotionColor),

      blue(emotionColor),

      map(fractura, 0, 100, 120, 255)
    );

    ellipse(x, y, size);

    // RESIDUOS

    if(random(1) < 0.02){

      residuos.push({

        x: x,
        y: y,

        alpha: 255,

        size: random(2, 6)
      });
    }
  }

  pop();

  // ======================================================
  // RESIDUOS
  // ======================================================

  actualizarResiduos();

  // ======================================================
  // PARTICULAS
  // ======================================================

  actualizarParticulas();

  // ======================================================
  // HUMO
  // ======================================================

  efectoHumo();

  // ======================================================
  // AUDIO
  // ======================================================

  controlarAudio();

  // ======================================================
  // MENSAJE
  // ======================================================

  if(procesando){

    fill(255);

    stroke(0);
    strokeWeight(4);

    textSize(18);

    text(
      'procesando emoción...',
      width/2 - 110,
      height/2 + 220
    );
  }

  // ======================================================
  // CURSOR
  // ======================================================

  dibujarCursor();
}

// ======================================================
// TEXTO INICIAL
// ======================================================

function generarTextoInicial(){

  puntos = font.textToPoints(

    'escribe algo',

    width/2 - 220,
    height/2,

    140,

    {
      sampleFactor: 0.18,
      simplifyThreshold: 0
    }
  );
}

// ======================================================
// GENERAR TEXTO
// ======================================================

function generarTexto(){

  let texto = inputTexto.value();

  if(texto.length < 1){

    return;
  }

  puntos = font.textToPoints(

    texto,

    width/2 - 220,
    height/2,

    140,

    {
      sampleFactor: 0.18,
      simplifyThreshold: 0
    }
  );
}

// ======================================================
// INTERFAZ
// ======================================================

function mostrarInterfaz(){

  fill(255);

  stroke(0);
  strokeWeight(4);

  textSize(15);

  text(
    'RECONFIGURADOR EMOCIONAL',
    40,
    115
  );

  textSize(14);

  text(
    'deja algo que no puedas controlar',
    40,
    150
  );

  text(
    'la intensidad altera el sistema',
    40,
    175
  );

  text(
    'tu voz fractura el sistema',
    40,
    200
  );

  text(
    'ENTER → procesar emoción',
    40,
    245
  );

  text(
    'G → activar glitch',
    40,
    270
  );

  text(
    'S → guardar imagen',
    40,
    295
  );

  noStroke();

  // intensidad

  fill(255, 40);

  rect(
    40,
    height - 75,
    240,
    8
  );

  fill(
    red(emotionColor),
    green(emotionColor),
    blue(emotionColor)
  );

  rect(
    40,
    height - 75,
    intensidad * 2.4,
    8
  );

  fill(255);

  text(
    'intensidad',
    40,
    height - 85
  );

  // fractura

  fill(255, 40);

  rect(
    40,
    height - 40,
    240,
    8
  );

  fill(
    red(emotionColor),
    green(emotionColor),
    blue(emotionColor)
  );

  rect(
    40,
    height - 40,
    fractura * 2.4,
    8
  );

  fill(255);

  text(
    'fractura',
    40,
    height - 50
  );
}

// ======================================================
// RESIDUOS
// ======================================================

function actualizarResiduos(){

  push();

  translate(width/2, height/2);

  for(let i = residuos.length - 1; i >= 0; i--){

    let r = residuos[i];

    noStroke();

    fill(

      red(emotionColor),

      green(emotionColor),

      blue(emotionColor),

      r.alpha
    );

    ellipse(
      r.x,
      r.y,
      r.size
    );

    r.alpha -= 2;

    if(r.alpha <= 0){

      residuos.splice(i, 1);
    }
  }

  pop();
}

// ======================================================
// PARTICULAS
// ======================================================

function actualizarParticulas(){

  for(let i = particulas.length - 1; i >= 0; i--){

    let p = particulas[i];

    noStroke();

    fill(
      red(emotionColor),
      green(emotionColor),
      blue(emotionColor),
      p.alpha
    );

    ellipse(
      p.x,
      p.y,
      p.size
    );

    p.x += p.vx;
    p.y += p.vy;

    p.alpha -= 4;

    if(p.alpha <= 0){

      particulas.splice(i, 1);
    }
  }
}

// ======================================================
// HUMO
// ======================================================

function efectoHumo(){

  push();

  blendMode(SCREEN);

  tint(
    red(emotionColor),
    green(emotionColor),
    blue(emotionColor),
    20
  );

  image(
    smoke1,
    mouseX - 250,
    mouseY - 250,
    500,
    500
  );

  tint(
    red(emotionColor),
    green(emotionColor),
    blue(emotionColor),
    14
  );

  image(
    smoke2,
    width - mouseX - 300,
    height - mouseY - 300,
    600,
    600
  );

  blendMode(BLEND);

  pop();
}

// ======================================================
// AUDIO
// ======================================================

function controlarAudio(){

  let velocidad = map(
    intensidad,
    0,
    100,
    0.7,
    1.4
  );

  ambient.rate(velocidad);

  let heartbeatRate = map(
    fractura,
    0,
    100,
    0.8,
    1.8
  );

  heartbeat.rate(heartbeatRate);

  let volumenRespiracion = map(
    micLevel,
    0,
    0.1,
    0.4,
    1
  );

  heartbeat.setVolume(
    volumenRespiracion
  );
}

// ======================================================
// CURSOR
// ======================================================

function dibujarCursor(){

  noFill();

  stroke(
    red(emotionColor),
    green(emotionColor),
    blue(emotionColor),
    150
  );

  strokeWeight(1);

  ellipse(
    mouseX,
    mouseY,
    40 + sin(frameCount * 0.1) * 10
  );

  line(
    mouseX - 10,
    mouseY,
    mouseX + 10,
    mouseY
  );

  line(
    mouseX,
    mouseY - 10,
    mouseX,
    mouseY + 10
  );
}

// ======================================================
// CLICK
// ======================================================

function mousePressed(){

  glitch.play();

  for(let i = 0; i < 60; i++){

    particulas.push({

      x: mouseX,
      y: mouseY,

      vx: random(-5, 5),
      vy: random(-5, 5),

      alpha: 255,

      size: random(2, 10)
    });
  }
}

// ======================================================
// TECLAS
// ======================================================

function keyPressed(){

  if(keyCode === ENTER){

    procesando = true;

    setTimeout(() => {

      generarTexto();

      procesando = false;

    }, 1200);
  }

  if(key === 's' || key === 'S'){

    saveCanvas(
      'emocion',
      'png'
    );
  }

  if(key === 'g' || key === 'G'){

    glitchMode = !glitchMode;
  }
}

// ======================================================
// RESIZE
// ======================================================

function windowResized(){

  resizeCanvas(
    windowWidth,
    windowHeight
  );
}