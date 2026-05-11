//Plantilla para la entrega final
//Maria Alejandra Polania
// Jardin de productividad
//Una herramienta interactiva que permite visualizar el progreso de tareas diarias. El usuario siembra una "semilla" con un clic y la ve crecer (tallo, hojas, flor) según el avance de su trabajo (inicio, medio y finalizado). El jardín es acumulativo y cambia su cielo (sol o luna) dependiendo de la hora real del día
//Referentes:
//Geometría Flat Design para el estilo visual
//Uso de IA: se utilizo para hacer el fondo mas rapido

//Inicio código

// Colores del escenario
let colorCielo;
let colorPasto;
let colorMontanaOscura;
let colorMontanaClara;
let colorNube;
let colorSol;

// Colores de las flores
let colorTallo;
let colorHojas;
let colorFlorAmarilla;
let colorFlorRosada;
let colorCentro;

// Variables de interacción
let florX = -100;
let florY = -100;
let tipoDeFlor = 1;

function setup() {
  // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  createCanvas(800, 600).parent("canvasContainer");
  //sigue como siempre
  background(255, 255, 255);
  // colores
  // colres del cielo para el cambio de hora
  let colorCieloNoche = color(25, 45, 85);
  colorCielo = color(180, 230, 240);

  colorPasto = color(120, 180, 60);
  colorMontanaOscura = color(140, 150, 160);
  colorMontanaClara = color(230, 235, 240);
  colorNube = color(255, 255, 255);

  // colores del circulo para que sea sol o luna
  colorSol = color(255, 210, 0);
  let colorLuna = color(250, 250, 210);

  //colores de las flores
  colorTallo = color(34, 139, 34);
  colorHojas = color(50, 205, 50);
  colorFlorAmarilla = color(255, 215, 0);
  colorFlorRosada = color(255, 182, 193);
  colorCentro = color(255, 140, 0);

  //  funcion de la hora con el sol o la luna

  let hora = hour();
  if (hora >= 6 && hora < 18) {
    background(colorCielo);
    noStroke();
    fill(colorSol);
    circle(220, 250, 100);
  } else {
    background(colorCieloNoche);
    noStroke();
    fill(colorLuna);
    circle(220, 250, 100);
    stroke(255);
    strokeWeight(3);
    point(500, 150);
    point(100, 400);
    point(700, 200);
  }

  // Montañas
  noStroke();
  fill(colorMontanaOscura);
  triangle(0, 750, 150, 280, 300, 750);
  fill(colorMontanaClara);
  triangle(150, 280, 450, 750, 300, 750);
  fill(colorMontanaOscura);
  triangle(150, 750, 300, 450, 400, 750);
  fill(colorMontanaClara);
  triangle(300, 450, 550, 750, 400, 750);

  // Pasto
  fill(colorPasto);
  rect(0, 720, 800, 280);

  // Nubes
  fill(colorNube);
  circle(300, 300, 80);
  circle(350, 310, 100);
  circle(420, 320, 80);
  rect(300, 320, 120, 40);
  circle(650, 280, 60);
  circle(700, 285, 70);
  circle(740, 290, 50);
  rect(650, 300, 90, 20);

  // Árboles
  fill(100, 70, 40);
  rect(460, 680, 15, 70);
  fill(150, 200, 80);
  circle(467, 650, 120);
  fill(100, 70, 40);
  rect(590, 680, 15, 100);
  fill(130, 190, 70);
  circle(597, 620, 140);

  // texo de instrucciones
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text("JARDÍN DE PRODUCTIVIDAD", 400, 50);
  textSize(21);
  text("1. HAZ CLIC EN EL PASTO", 400, 90);
  textSize(18);
  text("Presionar teclas para saber en que parte del trabajo estas:", 400, 120);
  text("I: inicio (Tallo) | M: medio (Hojas) | F: final (Flor)", 400, 160);
}

function draw() {
  // no quiero que se borre nada, si pongo las flores aca no se vuelven acumulativas y se borran cada que se haga una
}

// funcion para poner la posicion de la flor y si es el tipo de flor 1 o el 2
function mousePressed() {
  if (mouseY > 720) {
    florX = mouseX;
    florY = mouseY;

    // la siguiente flor sea de otro color
    if (tipoDeFlor == 1) {
      tipoDeFlor = 2;
    } else {
      tipoDeFlor = 1;
    }
  }
}

function keyPressed() {
  // aqui no se borra
  // proceso de la flor con las teclas:  i, m, f
  if (key == "i" || key == "I") {
    stroke(colorTallo);
    strokeWeight(8);
    line(florX, florY, florX, florY - 60);
  }

  if (key == "m" || key == "M") {
    noStroke();
    fill(colorHojas);
    ellipse(florX - 15, florY - 10, 30, 15);
    ellipse(florX + 15, florY - 10, 30, 15);
  }

  if (key == "f" || key == "F") {
    noStroke();
    if (tipoDeFlor == 1) {
      fill(colorFlorAmarilla);
    } else {
      fill(colorFlorRosada);
    }
    circle(florX - 20, florY - 80, 35);
    circle(florX + 20, florY - 80, 35);
    circle(florX, florY - 100, 35);
    circle(florX, florY - 60, 35);
    fill(colorCentro);
    circle(florX, florY - 80, 30);
  }
}
