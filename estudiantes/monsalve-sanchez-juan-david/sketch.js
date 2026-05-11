//MONSALVEjuan_FINAL
//Pausa Breve

//Pausa Breve es una herramienta interactiva diseñada para generar breves momentos de regulación visual mediante la reorganización de figuras en un sistema.

//El usuario interactúa con fragmentos de distintos colores y formas hasta reorganizar el espacio y dejar una sola figura al final.

//INPUTS DEL USUARIO:
//  - Selección de color
//  - Selección de forma
//  - Movimiento del mouse
//  - Click para agarrar y soltar figuras
//  - Navegación entre estados y modos

//OUTPUT DEL SISTEMA:
//  - Transformación progresiva de las figuras
//  - Cambios de escala y color
//  - Reorganización visual del espacio
//  - Construcción de una figura final estable

//CONCEPTO:
//El proyecto nace de la necesidad de encontrar pequeñas
//Pausas visuales en momentos de estrés o de saturación.
//La interacción busca transformar un sistema caótico en uno más estable mediante acciones simples y repetitivas.

//REFERENCIAS:
//  - Agar.io
//  Se tomó la idea de la absorción y del crecimiento progresivo.

//  - Thisissand
//  Se tomó la idea de una interacción relajante y repetitiva.

//APROPIACIÓN:
//Las referencias fueron reinterpretadas en un contexto de regulación visual y de reorganización espacial, y adaptadas al lenguaje visual y técnico desarrollado durante el curso.


let estado = "inicio";
let modo = "";

let figuras = [];

let colorFinal = [0, 200, 120];
let formaFinal = "circulo";

let colorSeleccionadoIndex = -1;

let figuraAgarrada = null;

let tiempoUnion = 0;

let nivel = 1;
let maxNiveles = 5;

// limites visuales internos

let margenX = 80;
let margenY = 80;

// SETUP

function setup() {
  let canvas = createCanvas(1280, 720);

  canvas.parent("canvasContainer");

  textAlign(CENTER, CENTER);
}

// DRAW

function draw() {
  background(13);

  if (estado === "inicio") {
    pantallaInicio();
  }

  if (estado === "seleccion") {
    pantallaSeleccion();
  }

  if (estado === "infinito") {
    pantallaInfinito();
  }

  if (estado === "niveles") {
    pantallaNiveles();
  }

  if (estado === "pausa") {
    pantallaPausa();
  }

  if (estado === "nivelCompletado") {
    pantallaNivelCompletado();
  }

  if (estado === "juegoCompletado") {
    pantallaJuegoCompletado();
  }
}

// MENU

function pantallaInicio() {
  fill(255);

  textSize(55);

  text("PAUSA BREVE", width / 2, 120);

  botonModo(width / 2 - 220, height / 2, "REORGANIZAR");

  botonModo(width / 2 + 220, height / 2, "FLUIR");
}

function botonModo(x, y, texto) {
  let w = 300;
  let h = 180;

  let hover =
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2;

  let escala = hover ? 1.05 : 1;

  push();

  translate(x, y);

  scale(escala);

  let r = 40 + sin(frameCount * 0.02) * 20;
  let g = 40 + sin(frameCount * 0.03) * 20;
  let b = 40 + sin(frameCount * 0.04) * 20;

  if (hover) {
    fill(r, g, b);
  } else {
    fill(30);
  }

  noStroke();

  rectMode(CENTER);

  rect(0, 0, w, h, 20);

  fill(255);

  textSize(35);

  text(texto, 0, 0);

  pop();
}

// SELECCION

function pantallaSeleccion() {
  fill(255);

  textSize(45);

  if (modo === "infinito") {
    text("ELIGE LA APARIENCIA DEL SISTEMA", width / 2, 100);
  }

  if (modo === "niveles") {
    text("ELIGE EL ESTADO FINAL DEL SISTEMA", width / 2, 100);
  }

  // colores

  let colores = [
    color(255, 0, 0),
    color(0, 150, 255),
    color(0, 200, 120),
    color(255, 255, 0),
    color(255, 120, 0),
    color(200, 0, 255),
  ];

  for (let i = 0; i < colores.length; i++) {
    let x = 300 + i * 120;
    let y = 250;

    fill(colores[i]);

    noStroke();

    circle(x, y, 70);

    let d = dist(mouseX, mouseY, x, y);

    if (d < 35 || colorSeleccionadoIndex === i) {
      stroke(255);

      strokeWeight(3);

      noFill();

      circle(x, y, 85);
    }
  }

  // formas

  fill(255);

  textSize(30);

  text("ESTRUCTURAS", width / 2, 400);

  formaBoton(450, 520, "circulo");

  formaBoton(640, 520, "cuadrado");

  formaBoton(830, 520, "triangulo");

  // iniciar

  let hover =
    mouseX > width / 2 - 120 &&
    mouseX < width / 2 + 120 &&
    mouseY > 580 &&
    mouseY < 660;

  fill(hover ? 80 : 40);

  noStroke();

  rectMode(CENTER);

  rect(width / 2, 620, 240, 80, 20);

  fill(255);

  text("INICIAR", width / 2, 620);
}

function formaBoton(x, y, forma) {
  if (formaFinal === forma) {
    stroke(255);

    strokeWeight(3);
  } else {
    noStroke();
  }

  fill(40);

  rectMode(CENTER);

  rect(x, y, 120, 120, 20);

  fill(255);

  noStroke();

  if (forma === "circulo") {
    circle(x, y, 60);
  }

  if (forma === "cuadrado") {
    rect(x, y, 60, 60);
  }

  if (forma === "triangulo") {
    triangle(
      x,
      y - 35,

      x - 35,
      y + 35,

      x + 35,
      y + 35
    );
  }
}

// INFINITO

function pantallaInfinito() {
  if (figuras.length === 0) {
    for (let i = 0; i < 20; i++) {
      let c = variarColor(colorFinal);

      figuras.push(
        new Figura(
          random(150, width - 150),
          random(150, height - 150),

          random(60, 90),

          c,

          formaFinal
        )
      );
    }
  }

  // borde visual

  stroke(40);
  strokeWeight(2);

  noFill();

  rectMode(CORNER);

  rect(margenX, margenY, width - margenX * 2, height - margenY * 2);

  for (let f of figuras) {
    f.moverInfinito();

    f.hover();

    f.mostrar();
  }

  colisiones();

  limitarPantalla();

  fill(255);

  textSize(25);

  text("ESC para pausa", 120, 40);
}

// NIVELES

function pantallaNiveles() {
  if (figuras.length === 0) {
    crearNivel();
  }

  // borde visual

  stroke(40);
  strokeWeight(2);

  noFill();

  rectMode(CORNER);

  rect(margenX, margenY, width - margenX * 2, height - margenY * 2);

  // figura agarrada debajo

  if (figuraAgarrada != null) {
    figuraAgarrada.x = mouseX;
    figuraAgarrada.y = mouseY;

    figuraAgarrada.hover();

    figuraAgarrada.mostrar();
  }

  // demás figuras

  for (let f of figuras) {
    if (f !== figuraAgarrada) {
      f.hover();

      f.mostrar();
    }
  }

  colisiones();

  limitarPantalla();

  revisarUnion();

  fill(255);

  textAlign(RIGHT, TOP);

  textSize(28);

  text("NIVEL " + nivel, width - 30, 30);

  text("FRAGMENTOS: " + figuras.length, width - 30, 70);

  textAlign(CENTER, CENTER);

  // ganar

  if (figuras.length === 1) {
    if (figuras[0].objetivo) {
      if (nivel === maxNiveles) {
        estado = "juegoCompletado";
      } else {
        estado = "nivelCompletado";
      }
    }
  }
}

// PAUSA

function pantallaPausa() {
  background(0);

  fill(255);

  textSize(60);

  text("PAUSA", width / 2, 150);

  botonPausa(width / 2, 300, "REANUDAR");

  botonPausa(width / 2, 420, "VOLVER");

  botonPausa(width / 2, 540, "MENU");
}

function botonPausa(x, y, texto) {
  let hover =
    mouseX > x - 170 && mouseX < x + 170 && mouseY > y - 40 && mouseY < y + 40;

  let escala = hover ? 1.05 : 1;

  push();

  translate(x, y);

  scale(escala);

  fill(hover ? 80 : 40);

  rectMode(CENTER);

  rect(0, 0, 340, 80, 20);

  fill(255);

  textSize(30);

  text(texto, 0, 0);

  pop();
}

// NIVEL COMPLETADO

function pantallaNivelCompletado() {
  background(10);

  let f = figuras[0];

  f.x = width / 2;
  f.y = height / 2;

  f.mostrar();

  fill(255);

  textSize(55);

  text("SISTEMA REORGANIZADO", width / 2, 120);

  textSize(30);

  text("CLICK PARA EL SIGUIENTE NIVEL", width / 2, 640);
}

// JUEGO COMPLETADO

function pantallaJuegoCompletado() {
  background(10);

  let f = figuras[0];

  f.x = width / 2;
  f.y = height / 2;

  f.mostrar();

  fill(255);

  textSize(55);

  text("SISTEMA ESTABILIZADO", width / 2, 120);

  textSize(30);

  text("CLICK PARA VOLVER AL MENU", width / 2, 640);
}

// CREAR NIVEL

function crearNivel() {
  let cantidad = 5 + nivel * 4;

  let formas = ["circulo", "cuadrado", "triangulo"];

  let formasNormales = [];

  for (let f of formas) {
    if (f !== formaFinal) {
      formasNormales.push(f);
    }
  }

  let objetivoIndex = int(random(cantidad));

  for (let i = 0; i < cantidad; i++) {
    let forma;
    let c;
    let objetivo = false;

    // especial

    if (i === objetivoIndex) {
      forma = formaFinal;

      c = colorFinal;

      objetivo = true;
    } else {
      forma = random(formasNormales);

      c = variarColor(colorFinal);
    }

    figuras.push(
      new Figura(
        random(150, width - 150),
        random(150, height - 150),

        random(45, 70),

        c,

        forma,

        objetivo
      )
    );
  }
}

// COLISIONES

function colisiones() {
  for (let i = 0; i < figuras.length; i++) {
    for (let j = i + 1; j < figuras.length; j++) {
      let a = figuras[i];
      let b = figuras[j];

      if (a === figuraAgarrada || b === figuraAgarrada) {
        continue;
      }

      let dx = b.x - a.x;
      let dy = b.y - a.y;

      let distancia = dist(a.x, a.y, b.x, b.y);

      if (distancia === 0) {
        distancia = 0.1;
      }

      let minDist = a.tam / 2 + b.tam / 2;

      if (distancia < minDist) {
        let overlap = minDist - distancia;

        let nx = dx / distancia;
        let ny = dy / distancia;

        a.x -= nx * overlap * 0.5;
        a.y -= ny * overlap * 0.5;

        b.x += nx * overlap * 0.5;
        b.y += ny * overlap * 0.5;
      }
    }
  }
}

// LIMITES

function limitarPantalla() {
  for (let f of figuras) {
    // izquierda

    if (f.x < margenX + f.tam / 2) {
      f.x = margenX + f.tam / 2;
    }

    // derecha

    if (f.x > width - margenX - f.tam / 2) {
      f.x = width - margenX - f.tam / 2;
    }

    // arriba

    if (f.y < margenY + f.tam / 2) {
      f.y = margenY + f.tam / 2;
    }

    // abajo

    if (f.y > height - margenY - f.tam / 2) {
      f.y = height - margenY - f.tam / 2;
    }
  }
}

// UNION

function revisarUnion() {
  if (figuraAgarrada == null) {
    tiempoUnion = 0;

    return;
  }

  let figuraTocada = null;

  for (let f of figuras) {
    if (f !== figuraAgarrada) {
      let d = dist(figuraAgarrada.x, figuraAgarrada.y, f.x, f.y);

      if (d < figuraAgarrada.tam / 2 + f.tam / 2) {
        figuraTocada = f;

        break;
      }
    }
  }

  if (figuraTocada == null) {
    tiempoUnion = 0;

    return;
  }

  tiempoUnion++;

  if (tiempoUnion > 120) {
    figuraAgarrada.tam += figuraTocada.tam / 2;

    let r = lerp(red(figuraAgarrada.color), red(colorFinal), 0.3);

    let g = lerp(green(figuraAgarrada.color), green(colorFinal), 0.3);

    let b = lerp(blue(figuraAgarrada.color), blue(colorFinal), 0.3);

    figuraAgarrada.color = color(r, g, b);

    if (figuraTocada.objetivo) {
      figuraAgarrada.objetivo = true;

      figuraAgarrada.forma = formaFinal;
    }

    let index = figuras.indexOf(figuraTocada);

    figuras.splice(index, 1);

    tiempoUnion = 0;
  }
}

// COLOR

function variarColor(base) {
  let r = lerp(red(base), random(0, 255), 0.25);

  let g = lerp(green(base), random(0, 255), 0.25);

  let b = lerp(blue(base), random(0, 255), 0.25);

  return color(r, g, b);
}

// MOUSE

function mousePressed() {
  // menu

  if (estado === "inicio") {
    if (
      mouseX > width / 2 - 370 &&
      mouseX < width / 2 - 70 &&
      mouseY > height / 2 - 90 &&
      mouseY < height / 2 + 90
    ) {
      modo = "niveles";

      estado = "seleccion";
    }

    if (
      mouseX > width / 2 + 70 &&
      mouseX < width / 2 + 370 &&
      mouseY > height / 2 - 90 &&
      mouseY < height / 2 + 90
    ) {
      modo = "infinito";

      estado = "seleccion";
    }
  }

  // seleccion

  if (estado === "seleccion") {
    let colores = [
      color(255, 0, 0),
      color(0, 150, 255),
      color(0, 200, 120),
      color(255, 255, 0),
      color(255, 120, 0),
      color(200, 0, 255),
    ];

    // colores

    for (let i = 0; i < colores.length; i++) {
      let x = 300 + i * 120;
      let y = 250;

      let d = dist(mouseX, mouseY, x, y);

      if (d < 35) {
        colorFinal = colores[i];

        colorSeleccionadoIndex = i;
      }
    }

    // formas

    if (dist(mouseX, mouseY, 450, 520) < 60) {
      formaFinal = "circulo";
    }

    if (dist(mouseX, mouseY, 640, 520) < 60) {
      formaFinal = "cuadrado";
    }

    if (dist(mouseX, mouseY, 830, 520) < 60) {
      formaFinal = "triangulo";
    }

    // iniciar

    if (
      mouseX > width / 2 - 120 &&
      mouseX < width / 2 + 120 &&
      mouseY > 580 &&
      mouseY < 660
    ) {
      figuras = [];

      figuraAgarrada = null;

      tiempoUnion = 0;

      if (modo === "infinito") {
        estado = "infinito";
      }

      if (modo === "niveles") {
        nivel = 1;

        estado = "niveles";
      }
    }
  }

  // agarrar

  if (estado === "niveles") {
    if (figuraAgarrada != null) {
      figuraAgarrada = null;
    } else {
      for (let f of figuras) {
        let d = dist(mouseX, mouseY, f.x, f.y);

        if (d < f.tam / 2) {
          figuraAgarrada = f;

          break;
        }
      }
    }
  }

  // pausa

  if (estado === "pausa") {
    // reanudar

    if (
      mouseX > width / 2 - 170 &&
      mouseX < width / 2 + 170 &&
      mouseY > 260 &&
      mouseY < 340
    ) {
      if (modo === "infinito") {
        estado = "infinito";
      }

      if (modo === "niveles") {
        estado = "niveles";
      }
    }

    // volver

    if (
      mouseX > width / 2 - 170 &&
      mouseX < width / 2 + 170 &&
      mouseY > 380 &&
      mouseY < 460
    ) {
      figuras = [];

      figuraAgarrada = null;

      tiempoUnion = 0;

      estado = "seleccion";
    }

    // menu

    if (
      mouseX > width / 2 - 170 &&
      mouseX < width / 2 + 170 &&
      mouseY > 500 &&
      mouseY < 580
    ) {
      reiniciarJuego();

      estado = "inicio";
    }
  }

  // siguiente nivel

  if (estado === "nivelCompletado") {
    nivel++;

    figuras = [];

    figuraAgarrada = null;

    tiempoUnion = 0;

    estado = "niveles";
  }

  // volver menu

  if (estado === "juegoCompletado") {
    reiniciarJuego();

    estado = "inicio";
  }
}

// TECLADO

function keyPressed() {
  if (keyCode === ESCAPE) {
    if (estado === "infinito" || estado === "niveles") {
      estado = "pausa";
    }
  }
}

// REINICIAR

function reiniciarJuego() {
  figuras = [];

  figuraAgarrada = null;

  tiempoUnion = 0;

  nivel = 1;
}


//PRUEBAS DE USUARIO

//Usuario 1:
//Entendió que tocaba mantener el clic para realizar las acciones, pero después de un tiempo se empezó a fastidiar por esa parte.

//Cambio realizado:
//No toca mantener el clic. Al clickear una vez se agarra el objeto y al clickear otra vez se suelta

//Usuario 2:
//Le gustó el efecto de lejanía que presentan los objetos, pero en el modo FLUIR no le gusta que las figuras se unan.

//Cambio realizado:
//Se quitó la unión de las figuras en el modo FLUIR y también la opción de agarrar, solo se mantuvo el movimiento de los objetos.
