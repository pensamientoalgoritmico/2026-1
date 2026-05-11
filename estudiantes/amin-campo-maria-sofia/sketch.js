//Plantilla para la entrega final
//Nombre
// Nombre del proyecto
//Descripción breve de lo que hace
//links a referentes, breve explicación de para qué se usó la IA

//Inicio código
// NOMBRE: Maria Sofia Amin Campo 202420142
// PROGRAMA: ¿Qué desayuno hoy?
// DESCRIPCIÓN:
// Este programa genera desayunos aleatorios para
// cada día de la semana. El usuario puede hacer
// clic sobre un día y el sistema asigna un desayuno
// diferente automáticamente. También permite cambiar
// el tamaño de las ilustraciones usando un slider
// y reiniciar todo con un botón.
//
// REFERENTES E IA:
// Referente visual inspirado en interfaces kawaii,
// colores pastel y sistemas interactivos simples.
// Se usó IA para ayudar a organizar el código,
// mejorar ilustraciones y estructurar funciones.


let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

// DESAYUNOS
let desayunos = [
  "Cereal",
  "Huevos",
  "Pancakes",
  "Fruta",
  "Pan y cafe"
];

// GUARDAR DESAYUNO
let desayunoDia = [null, null, null, null, null];

let slider;
let botonReset;

let fuente;


// POSICIONES FLOTANTES
let fondosX = [];
let fondosY = [];
let fondosTipo = [];


// PRELOAD

function preload() {

  fuente = loadFont("Chewy-Regular.ttf");

}

// --------------------------------
// SETUP
// --------------------------------

function setup() {

  createCanvas(700, 550);

  rectMode(CENTER);

  textFont(fuente);


  // SLIDER
  slider = createSlider(50, 120, 80, 10);

  slider.position(240, 470);

  slider.style('width', '220px');

  slider.style('cursor', 'pointer');


  // BOTÓN
  botonReset = createButton("REINICIAR");

  botonReset.position(300, 510);

  botonReset.size(110, 35);

  botonReset.style("background-color", "#FFD978");

  botonReset.style("border", "2px dashed #7A4E2D");

  botonReset.style("border-radius", "20px");

  botonReset.style("font-family", "Chewy");

  botonReset.style("font-size", "15px");

  botonReset.mousePressed(reiniciar);


  // ELEMENTOS FLOTANTES
  for (let i = 0; i < 20; i++) {

    fondosX.push(random(width));

    fondosY.push(random(height));

    fondosTipo.push(floor(random(4)));

  }
  
  // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");
  //sigue como siempre
  background(255, 255, 255);
}

// DRAW

function draw() {

  background(255, 245, 230);


// FONDO FLOTANTE

  for (let i = 0; i < fondosX.length; i++) {

    push();

    translate(fondosX[i], fondosY[i]);

    scale(0.8);


// PANCAKES
    if (fondosTipo[i] == 0) {

      fill(230, 180, 100);

      ellipse(0, 0, 50, 18);

      ellipse(0, -10, 50, 18);

      ellipse(0, -20, 50, 18);

      fill(255, 230, 120);

      rect(0, -22, 10, 8, 2);

    }

// HUEVOS
    if (fondosTipo[i] == 1) {

      fill(255);

      ellipse(0, 0, 45, 35);

      fill(255, 200, 0);

      ellipse(0, 0, 15, 15);

    }


// CEREAL
    if (fondosTipo[i] == 2) {

      fill(255);

      arc(0, 0, 45, 35, 0, 180);

      fill(255, 180, 80);

      circle(-10, -5, 8);

      circle(0, -8, 8);

      circle(10, -5, 8);

    }


// FRUTA
    if (fondosTipo[i] == 3) {

      fill(255, 80, 80);

      circle(0, 0, 30);

      fill(80, 180, 80);

      ellipse(8, -18, 12, 6);

    }

    pop();


// MOVIMIENTO
    fondosY[i] += 0.3;


// REAPARECER
    if (fondosY[i] > height + 40) {

      fondosY[i] = -40;

      fondosX[i] = random(width);

    }
  }


// TÍTULO

  fill(120, 70, 30);

  textAlign(CENTER);

  textSize(46);

  text("¿QUE DESAYUNO", width / 2, 60);

  text("HOY?", width / 2, 105);


// SUBTÍTULO

  textSize(16);

  fill(150, 100, 50);

  text(
    "Haz clic en un dia y el sistema decide por ti",
    width / 2,
    145
  );


// DÍAS

  for (let i = 0; i < dias.length; i++) {

    let x = 100 + i * 125;

    let y = 300;


    // CAJA
    fill(255, 255, 255, 220);

    stroke(180, 120, 70);

    strokeWeight(2);

    rect(x, y, 90, 90, 20);


    // DÍA
    fill(120, 70, 30);

    noStroke();

    textSize(13);

    text(dias[i], x, y + 65);


    // MOSTRAR DESAYUNO
    if (desayunoDia[i] != null) {

      let tam = slider.value();


      // PANCAKES
      if (desayunoDia[i] == "Pancakes") {

        fill(210, 150, 80);

        ellipse(x, y + 12, tam, tam / 3);

        fill(240, 190, 110);

        ellipse(x, y + 5, tam, tam / 3);

        ellipse(x, y - 5, tam, tam / 3);

        ellipse(x, y - 15, tam, tam / 3);

        fill(255, 240, 120);

        rect(x, y - 18, 15, 10, 3);

        stroke(170, 90, 40);

        strokeWeight(3);

        line(x - 10, y - 25, x - 5, y - 10);

        line(x + 5, y - 25, x + 10, y - 8);

        noStroke();
      }


      // HUEVOS
      if (desayunoDia[i] == "Huevos") {

        fill(255);

        ellipse(x, y, tam, tam * 0.7);

        ellipse(x - 10, y + 5, tam * 0.5, tam * 0.4);

        ellipse(x + 10, y - 5, tam * 0.5, tam * 0.4);

        fill(255, 190, 0);

        circle(x, y, tam / 3);

        fill(255, 230, 120);

        circle(x - 5, y - 5, tam / 10);
      }


      // CEREAL
      if (desayunoDia[i] == "Cereal") {

        fill(255);

        arc(x, y, tam, tam * 0.7, 0, 180);

        fill(230, 230, 255);

        arc(x, y + 5, tam * 0.9, tam * 0.5, 0, 180);

        fill(255, 170, 70);

        circle(x - 20, y - 10, 12);

        circle(x - 5, y - 15, 12);

        circle(x + 10, y - 8, 12);

        circle(x + 22, y - 12, 12);

        fill(255);

        ellipse(x, y - 5, tam * 0.6, tam * 0.15);
      }


      // FRUTA
      if (desayunoDia[i] == "Fruta") {

        fill(255, 90, 90);

        circle(x, y, tam * 0.6);

        fill(255, 180, 180);

        ellipse(x - 10, y - 8, 10, 16);

        fill(80, 180, 80);

        ellipse(x + 10, y - 28, 15, 8);

        stroke(100, 60, 20);

        strokeWeight(2);

        line(x, y - 20, x, y - 30);

        noStroke();
      }


      // PAN Y CAFÉ
      if (desayunoDia[i] == "Pan y cafe") {

        fill(210, 150, 90);

        rect(x - 10, y, tam * 0.5, tam * 0.35, 8);

        fill(240, 190, 120);

        rect(x - 10, y + 2, tam * 0.4, tam * 0.2, 5);

        fill(140, 90, 50);

        rect(x + 25, y - 5, 25, 30, 5);

        fill(80, 40, 20);

        rect(x + 25, y - 10, 20, 10, 3);

        noFill();

        stroke(140, 90, 50);

        strokeWeight(3);

        arc(x + 35, y - 5, 15, 15, -90, 90);

        noStroke();

        stroke(180);

        line(x + 20, y - 25, x + 20, y - 40);

        line(x + 28, y - 25, x + 28, y - 38);

        noStroke();
      }


      // TEXTO
      fill(120, 70, 30);

      textSize(12);

      text(desayunoDia[i], x, y + 5);

    }
  }


  // TEXTO SLIDER
  fill(120, 70, 30);

  textSize(13);

  text(
    "Tamaño de las ilustraciones",
    width / 2,
    450
  );
}


// MOUSE PRESSED

function mousePressed() {

  for (let i = 0; i < dias.length; i++) {

    let x = 100 + i * 125;

    let y = 300;


    if (

      mouseX > x - 45 &&
      mouseX < x + 45 &&
      mouseY > y - 45 &&
      mouseY < y + 45

    ) {

      let desayunoRandom;

      let repetido = true;


      while (repetido == true) {

        desayunoRandom =
          desayunos[floor(random(desayunos.length))];

        repetido = false;


        for (let j = 0; j < desayunoDia.length; j++) {

          if (desayunoDia[j] == desayunoRandom) {

            repetido = true;

          }
        }
      }


      desayunoDia[i] = desayunoRandom;

    }
  }
}


// RESET

function reiniciar() {

  for (let i = 0; i < desayunoDia.length; i++) {

    desayunoDia[i] = null;

  }
}

//Ajustar el tamaño cuando cambia el tamaño de la pantalla
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
