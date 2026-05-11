// Plantilla para la entrega final
// Sara Valeria Bustamante
//
// Descripción:
// "Estado interno" es una herramienta emocional contemplativa.
// No está pensada para producir algo útil en términos prácticos,
// sino para ayudar a regular el estado interno del usuario.
//
// Interacciones:
//   - Click del mouse: activa la visualización principal (modo "Grito")
//   - Movimiento del mouse (eje X): controla el tamaño/densidad de los círculos
//   - Micrófono: el nivel de sonido desplaza el patrón de ruido (offset)
//   - Tecla "a": muestra la visualización de ansiedad (ruido pixel a pixel en loop)
//   - Tecla "c": activa/desactiva la visualización de calma (ondas animadas en loop)
//   - Tecla "t": muestra la visualización de tristeza (gradiente con movimiento lento)
//   - Tecla "f": Activa la pantalla de cierre.

// Referencias y uso de IA:
//   - Perlin noise con p5.js: https://p5js.org/reference/p5/noise/
//   - Entrada de micrófono: https://p5js.org/reference/p5.AudioIn/
//   - loadFont con preload: https://p5js.org/reference/p5/loadFont/
//   - La IA se usó para depurar la lógica del while peligroso
//     y para entender cómo mapear correctamente los niveles del micrófono.

p5.disableFriendlyErrors = true;

// --- Variables globales ---
let xScale = 0.015; // Escala horizontal del ruido Perlin
let yScale = 0.02; // Escala vertical del ruido Perlin

let font; // Fuente tipográfica (cargada en preload)
let mic; // Entrada de micrófono
let fondo; // Color de fondo (reservado para futuros usos)
let m = 0; // Contador horizontal para dibujar líneas de inicio
let t = false; // Estado modo grito: false = pantalla inicial, true = visualización activa
let modoCalma = false; // Estado modo calma: true = draw() llama calma() en cada frame
let modoAnsiedad = false; // Estado modo ansiedad: true = draw() llama ansiedad() en cada frame
let offset; // Desplazamiento del ruido basado en el micrófono
let modoTristeza = false; // Estado modo tristeza
let modoFinal = false; // Estado modo fiinal
//noprotect

// --- preload: se ejecuta ANTES de setup, garantiza que la fuente esté lista ---
function preload() {
  // Cargar la fuente aquí evita demoras y errores al usarla en setup/draw
  // Referencia: https://p5js.org/reference/p5/loadFont/
  font = loadFont("Assets/CormorantInfant-VariableFont_wght (1).ttf");
}

function setup() {
  // Crea el canvas a pantalla completa y lo ancla en el contenedor web
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");

  // Configuración inicial del micrófono (NO se inicia el audio aquí;
  // userStartAudio() se llama dentro de mouseClicked() para que los
  // navegadores no bloqueen el audio por política de autoplay)
  mic = new p5.AudioIn();
  mic.start();

  fondo = 255;
  t = false;

  // Dibujar las líneas verticales de la pantalla inicial usando un for
  // (se reemplazó el while peligroso: podía generar un loop infinito
  //  porque frameCount no avanza fuera de draw, y m nunca llegaba a windowWidth)
  background(111, 163, 200);
  for (let i = 0; i < windowWidth; i++) {
    dibujarLineaInicio(i);
  }

  // Textos de bienvenida
  noStroke();
  fill(30, 42, 56);
  textFont(font);
  textSize(35);
  text("Estado interno", windowWidth / 2 - 110, 40);
  textSize(50);
  text("¿Cómo estás hoy?", windowWidth / 2 - 180, windowHeight / 2);
  textSize(25);
  text("Clickea para empezar", windowWidth / 2 - 125, windowHeight / 2 + 35);
}

function draw() {
  // Modo grito: se activa con click, dibuja círculos reactivos al micrófono y mouse
  if (t === true) {
    background(111, 163, 200);
    grito();
  }
  // Modo ansiedad: se activa con tecla "a", anima ruido pixel a pixel en azules y morados
  // loadPixels/updatePixels dentro de ansiedad() se encargan de redibujar el canvas completo
  if (modoAnsiedad === true) {
    ansiedad();
  }
  // Modo calma: se activa con tecla "c", anima ondas fluidas en cada frame
  // No tiene background() propio porque calma() lo dibuja internamente
  if (modoCalma === true) {
    calma();
  }
  // Modo tristeza: se activa con la tecla "t" anima un gradiente que ocupa toda la pantalla
  if (modoTristeza === true) {
    tristeza();
  }
  if (modoFinal === true) {
    final();
  }
}

// Ajusta el canvas cuando cambia el tamaño de la ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// --- grito: visualización principal basada en ruido Perlin y micrófono ---
// Los círculos se distribuyen en una grilla; su tamaño varía con el ruido.
// El mouse controla la densidad (gap) y el micrófono desplaza el patrón.
function grito() {
  noStroke();
  fill(242, 198, 216); // Rosa suave

  // gap: distancia entre círculos, controlada por la posición X del mouse
  let gap = mouseX * 0.1;

  // Mapear el nivel del micrófono (0.0–1.0) a un rango visible de offset
  // Sin map(), los cambios son imperceptibles porque los valores son muy pequeños
  let nivelMic = mic.getLevel();
  offset = map(nivelMic, 0, 1, 0, 10000);

  // Recorrer la pantalla en una grilla definida por gap
  for (let x = gap / 2; x < width; x += gap) {
    for (let y = gap / 2; y < height; y += gap) {
      // Calcular el valor de ruido Perlin para esta posición + offset del micrófono
      let noiseValue = noise((x + offset) * xScale, (y + offset) * yScale);

      // El diámetro del círculo es proporcional al ruido (entre 0 y gap)
      let diameter = noiseValue * gap;
      circle(x, y, diameter);
    }
  }
}

// --- ansiedad: visualización de ruido pixel a pixel en azules y morados ---
// Manipula el array pixels[] directamente en memoria en lugar de llamar point()
// millones de veces, lo que es significativamente más eficiente.
// El color de cada píxel se construye asignando el valor de ruido de forma
// distinta a cada canal RGB: más azul y rojo que verde produce la paleta
// azul-morado. Usa frameCount en la tercera dimensión del ruido para animar.
function ansiedad() {
  let noiseScale = 0.009; // Escala del ruido (más pequeño = manchas más grandes)
  // nt se calcula una sola vez fuera del loop para no repetir la multiplicación
  // en cada uno de los width*height píxeles
  let nt = noiseScale * frameCount;

  // loadPixels() carga el array pixels[] con el estado actual del canvas.
  // Cada píxel ocupa 4 posiciones consecutivas: [R, G, B, A]
  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Valor de ruido Perlin entre 0 y 1 para esta posición y momento
      let n = noise(noiseScale * x, noiseScale * y, nt);

      // Paleta azul-morado: el rojo y el azul siguen el ruido,
      // pero el verde se suprime para evitar tonos cálidos o grises.
      // Cuando n es alto → azul claro / lavanda
      // Cuando n es bajo → azul oscuro / morado profundo
      let r = n * 180; // componente rojo moderado (da el tono morado)
      let g = n * 60; // verde muy suprimido (evita verdes y grises neutros)
      let b = n * 255; // azul al máximo (canal dominante)

      // Índice en el array: cada fila tiene width*4 valores,
      // cada columna avanza 4 posiciones (R, G, B, A)
      let idx = 4 * (x + y * width);
      pixels[idx] = r;
      pixels[idx + 1] = g;
      pixels[idx + 2] = b;
      pixels[idx + 3] = 255; // Alpha: 255 = completamente opaco
    }
  }

  // updatePixels() sube todos los cambios al canvas de una sola vez,
  // mucho más eficiente que hacer una llamada de dibujo por píxel
  updatePixels();
}

// --- dibujarLineaInicio: dibuja una línea vertical de la pantalla de inicio ---
// Reemplaza la función "inicio()" original; recibe la coordenada x como parámetro
// para poder usarse dentro de un for en setup() de forma segura.
function dibujarLineaInicio(x) {
  let noiseLevel = 100;
  let noiseScale = 0.02;

  let nx = noiseScale * x;

  // La altura de la línea varía con ruido Perlin para crear un efecto orgánico
  let y = noiseLevel * noise(nx) + 300;

  stroke(255, 255, 255);
  line(x, 0, x, y);
}

// --- mouseClicked: activa el modo grito y desactiva los demás modos ---
function mouseClicked() {
  // userStartAudio() debe llamarse dentro de un evento de usuario (click, tecla)
  // para que los navegadores no bloqueen el audio por políticas de autoplay
  userStartAudio();
  t = true;
  modoAnsiedad = false; // Desactiva los otros modos para que no corran a la vez
  modoCalma = false;
  modoTristeza = false;
  modoFinal = false;
  background(111, 163, 200);
}

// --- keyPressed: maneja los modos de visualización alternativos ---
// Cada tecla desactiva todos los otros modos antes de activar el suyo,
// para garantizar que solo un modo corra en draw() a la vez.
function keyPressed() {
  if (key === "a") {
    // Activa el loop de ansiedad y desactiva los demás modos
    t = false;
    modoCalma = false;
    modoAnsiedad = true;
    modoTristeza = false;
  }
  if (key === "c") {
    // Activa el loop de calma y desactiva los demás modos
    t = false;
    modoAnsiedad = false;
    modoCalma = true;
    modoTristeza = false;
  }
  if (key === "t") {
    t = false;
    modoAnsiedad = false;
    modoCalma = false;
    modoTristeza = true;
  }
  if (key === "f") {
    t = false;
    modoAnsiedad = false;
    modoCalma = false;
    modoTristeza = false;
    modoFinal = true;
  }
}

// --- calma: visualización de ondas fluidas animadas en tonos rosados ---
// Dibuja múltiples curvas con ruido Perlin de 3 dimensiones (x, índice de onda, tiempo).
// La tercera dimensión (frameCount) hace que cada onda se mueva de forma continua
// e independiente, creando un efecto orgánico similar a tela o seda en movimiento.
// Se llama desde draw() en cada frame para que la animación sea continua.
function calma() {
  // Fondo rosa muy suave como base de la composición
  background(248, 232, 240);

  let numOndas = 12; // Cantidad de líneas de onda superpuestas
  let amplitud = 80; // Desplazamiento vertical máximo de cada onda (en píxeles)
  let velocidad = 0.003; // Velocidad de animación (más pequeño = movimiento más lento y suave)
  let escalaX = 0.004; // Detalle horizontal del ruido (más pequeño = curvas más amplias)

  noFill();
  strokeWeight(2.5);

  // Paleta de colores rosados y magenta con transparencia
  // La superposición de colores semitransparentes crea profundidad visual
  let colores = [
    color(231, 84, 128, 180), // rosa medio
    color(212, 96, 138, 160), // rosa-magenta
    color(240, 144, 176, 140), // rosa claro
    color(184, 64, 112, 120), // magenta oscuro
    color(200, 80, 130, 100), // rosa profundo
  ];

  for (let i = 0; i < numOndas; i++) {
    // Distribuir las ondas verticalmente a lo largo de la pantalla
    let yBase = map(i, 0, numOndas - 1, height * 0.1, height * 0.9);

    // Asignar color de la paleta de forma cíclica
    stroke(colores[i % colores.length]);

    // Variar el grosor del trazo entre ondas para dar sensación de profundidad
    // (ondas más gruesas parecen estar "adelante")
    strokeWeight(map(i % 3, 0, 2, 1.0, 3.0));

    beginShape();
    for (let x = 0; x <= width; x += 4) {
      // Ruido Perlin con 3 dimensiones:
      //   x * escalaX     → varía horizontalmente (forma de la curva)
      //   i * 0.4         → diferencia cada onda entre sí (forma única por onda)
      //   frameCount * velocidad → avanza en el tiempo (animación continua)
      let n = noise(x * escalaX, i * 0.4, frameCount * velocidad);

      // Convertir el valor de ruido (0–1) a un desplazamiento vertical centrado en yBase
      let y = yBase + map(n, 0, 1, -amplitud, amplitud);

      // curveVertex genera splines suaves entre puntos (más orgánico que vertex)
      curveVertex(x, y);
    }
    endShape();
  }
}

// --- tristeza: gradiente radial animado en tonos fríos y desaturados ---
// Simula el peso emocional de la tristeza mediante gradientes suaves
// que se desplazan lentamente con ruido Perlin.
// Dibuja círculos concéntricos con color interpolado desde un punto focal
// que deriva lentamente por la pantalla, creando la sensación de una luz
// distante y difusa — similar a la imagen de referencia pero en frío.
function tristeza() {
  background(200, 160, 190); // rosa-morado para los bordes

  let velocidad = 0.004; // Muy lento: el peso de la tristeza

  // El centro del gradiente se mueve suavemente con ruido Perlin
  // Dos semillas distintas (0, 100) garantizan movimientos independientes en X e Y
  let cx = map(
    noise(frameCount * velocidad, 0),
    0,
    1,
    width * 0.2,
    width * 0.8,
  );
  let cy = map(
    noise(frameCount * velocidad, 100),
    0,
    1,
    height * 0.2,
    height * 0.8,
  );

  // Radio máximo: lo suficientemente grande para cubrir toda la pantalla
  let rMax = dist(0, 0, width, height);

  // Paleta de tristeza: del centro (cálido grisáceo) hacia afuera (azul frío profundo)
  // Centro: blanco lavanda muy pálido — como luz filtrada
  // Borde:  azul gris oscuro apagado — como tarde nublada
  let colorCentro = color(255, 220, 240); // rosa muy pálido, casi blanco
  let colorMedio = color(220, 160, 210); // malva suave
  let colorBorde = color(160, 100, 180); // morado profundo

  noStroke();

  // Dibujar de afuera hacia adentro para que los círculos internos queden encima
  let pasos = 180; // Más pasos = gradiente más suave
  for (let i = pasos; i >= 0; i--) {
    let t = i / pasos; // 0 = centro, 1 = borde

    // Interpolar en dos tramos para crear una curva de color más rica:
    // borde → medio (t: 1→0.5) y medio → centro (t: 0.5→0)
    let c;
    if (t > 0.5) {
      c = lerpColor(colorMedio, colorBorde, (t - 0.5) * 2);
    } else {
      c = lerpColor(colorCentro, colorMedio, t * 2);
    }

    // Variar ligeramente la opacidad para suavizar la transición
    // (los bordes son más transparentes, el centro más sólido)
    let alpha = map(t, 0, 1, 255, 160);
    c.setAlpha(alpha);

    fill(c);
    let r = rMax * t;
    ellipse(cx, cy, r * 2, r * 2);
  }
}

function final() {
  background(0);
  noStroke();
  fill(255);
  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(35);
  text("Gracias por llegar hasta aquí,", width / 2, height / 2 - 40);
  text("espero te sientas más ligero.", width / 2, height / 2);
  textSize(25);
  fill(200);
  text("Acá te esperamos en otra ocasión.", width / 2, height / 2 + 60);
  textAlign(LEFT, BASELINE); // restaurar el alineado por defecto
}
