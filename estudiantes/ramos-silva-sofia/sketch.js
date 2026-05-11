//Sofía Ramos Silva
// Nombre del proyecto; Desenfoque
//Es un programa que sirve para la relajación y/o meditación mediante respiración guiada y estímulos visuales personalizable por el usuario.
//links a referentes: https://patatap.com/
//Eplicación de para qué se usó la IA: Hice uso de la IA para aprender códigos de cosas que no sabía como hacer inicialmente 

// VARIABLES
let sonido; //La variable almacena el sonido de ambiente para el programa. La idea es que genere un ambiente calmado y acompañar el ejercicio de respiración para que el usuario se sienta mas relajado.

//Estas variables guardan las tipografías para usar en el programa
let fuenteTitulo;
let fuenteTexto;

//Estas variables controlan la posición en y de los circulos flotantes que van en el fondo de la pantalla (como particulas), ayudan a crear una sensación de movimiento y fluidez.
let y1 = 0;
let y2 = 100;
let y3 = 200;
let y4 = 300;
let y5 = 50;

//Variables que controlan el menú lateral
let menuDesplegado = false; //Funciona como interruptor para abrir o cerrar el menú.
let menuX = 0; //Controla la posición horizontal del panel para generar una animación mas suave de desplazamiento.

//Variables que definen el área seleccionable del botón del menú
//Esta es el área del botón de menú (las tres rayitas)
let botonX = 8;
let botonY = 10;
let botonAncho = 40;
let botonAlto = 35;
let botonMenu1;

//Variables de interacción del usuario

//Variables que permiten escribir el nombre
let escribiendo = false; //Cuando escribiendo es verdadero, el programa entiende que el usuario está escribiendo en el input
let nombre = ""; //Esta guarda el texto que escribe el usuario en el input

//Variables para el menú de configuración
let ritmo = null; //Define el tipo de respiración seleccionado
let estimulos = false; //Activa o desactiva experiencias visuales adicionales para personalizar el programa.

//Variables del estado del programa
//Estados del programa
let pantalla = "inicio"; //Puede ser el inicio, transicion o respiración
let transicion1 = 0; //controla el progreso de la animación
let animado = false;
let tiempoInicio = 0;

//Anuncio Advertencia
let mostrarAdvertencia = false;

//posicion animada
let triangulo1 = 220; //posición inicial del triangulo (empieza siendo un simbolo de play)
let circulo1 = 0; // tamaño inicial del circulo

//Parpadeo
let mostrarCursor = true;

// Interacciones de cosas visuales
let figuras = [];
let ondasCirculares = [];
let ondasRectangulares = [];
let fondoDiferente = false;
let modoOscuro = false;
let circuloLate = false;

//Pantalla final
let transicionFinal = 0;
let animandoFinal = false;

//Variables para ajustar el tamaño de las cosas en el menu
let menuAncho;
let menuAlto;

let espacioX;
let espacioY;

//Esta función carga los recursos antes de que el programa empiece
function preload() {
  //Crga de fuentes
  fuenteTitulo = loadFont("Montserrat.ttf");
  fuenteTexto = loadFont("Nunito.ttf");
  sonido = loadSound("fondo.mp3");
}

//Lo que se ejecuta una sola vez al inicio
function setup() {
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");

  sonido.play();
  sonido.setLoop(true);
  sonido.setVolume(0.4);
}

//Lo que se repite constantemente como un loop
function draw() {
  if (modoOscuro) {
    background(60, 55, 70);
  } else if (fondoDiferente) {
    background(220, 230, 255);
  } else {
    background(255, 252, 245);
  }

  dibujarParticulas();
  dibujarFiguras();
  dibujarOndas();

  if (pantalla === "inicio") {
    dibujarInicio();
  } else if (pantalla === "transicion1") {
    dibujarTransicion1();
  } else if (pantalla === "respiracion") {
    dibujarRespiracion();
  } else if (pantalla === "transicionFinal") {
    dibujarTransicionFinal();
  } else if (pantalla === "final") {
    dibujarPantallaFinal();
  }
  if (pantalla !== "final" && pantalla !== "transicionFinal") {
    dibujarMenu();
  }

  //Cursor parpadea
  if (frameCount % 30 === 0) {
    mostrarCursor = !mostrarCursor;
  }

  //Mensaje de advertencia
  if (mostrarAdvertencia) {
    fill(223, 174, 160);
    stroke(137, 81, 89);
    rect(width / 2 - 230, height / 2 - 35, 460, 80, 20);

    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(
      "Para iniciar, por favor selecciona un ritmo en el menú de configuraciones.",
      width / 2,
      height / 2
    );
  }
}

//Parte de la plantilla
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 

//Pantalla de inicio
function dibujarInicio() {
  // Texto nombre del programa
  textAlign(CENTER, CENTER); //centra los textos por defecto
  fill(137, 81, 89);
  textFont(fuenteTitulo);
  textSize(72);
  text("Desenfoque", width / 2, 120);

  // boton de play
  let x = width / 2;
  let y = 220;

  fill(168, 189, 226);
  stroke(137, 81, 90);
  triangle(x - 20, y - 25, x - 20, y + 25, x + 30, y);

  // Texto "Play"
  fill(137, 81, 89);
  textFont(fuenteTexto);
  textSize(48);
  noStroke();
  text("Play", x, y + 60);
}

//Trancición entre pantallas
function dibujarTransicion1() {
  transicion1 += 0.015;

  let x = width / 2;

  triangulo1 = lerp(220, 200, transicion1); //mueve el triangulo
 circulo1 = lerp(0, 900, transicion1); //crece el círculo

  //Se dibuja el circulo
  fill(170, 175, 205);
  noStroke();

  ellipse(x, triangulo1, circulo1);

  // Triángulo encima mientras crece
  fill(255, 252, 245);

  triangle(x - 20, triangulo1 - 25, x - 20, triangulo1 + 25, x + 30, triangulo1
  );

  if (transicion1 >= 1) {
    pantalla = "respiracion";
  }
}

//Pantalla respiracion
function dibujarRespiracion() {
  let yCentro = 200;
  let amplitud = 80;

  // línea + curva
  stroke(60, 70, 110);
  strokeWeight(6);
  noFill();

  let textoEstado = 'Da click a "Play" para iniciar';

  if (animado) {
    let tiempo = (millis() - tiempoInicio) / 1000;

    //Ritmo Normal
    if (ritmo === "Normal") {
      let fase = (tiempo / 6) * TWO_PI;

      noFill();
      beginShape();
      for (let x = 0; x <= width; x += 10) {
        let desplazamiento = x * 0.02;
        let y = yCentro - sin(fase + desplazamiento) * amplitud;
        vertex(x, y);
      }
      endShape();

      // círculo
      let xCirculo = 300;

      let yCirculo = yCentro - sin(fase + xCirculo * 0.02) * amplitud;

      fill(170, 175, 205);
      noStroke();
      let tamaño = 40;

      if (circuloLate) {
        tamaño = 40 + sin(frameCount * 0.1) * 10;
      }

      ellipse(xCirculo, yCirculo, tamaño);

      let movimiento = cos(fase + xCirculo * 0.02);

      if (movimiento > 0) {
        textoEstado = "Inhala...";
      } else {
        textoEstado = "Exhala...";
      }
    }

    if (ritmo === "Profundo") {
      let amplitudGrande = 80;
      let fase = (tiempo / 10) * TWO_PI;

      beginShape();
      for (let x = 0; x <= width; x += 10) {
        let desplazamiento = x * 0.008;
        let y = yCentro - sin(fase + desplazamiento) * amplitudGrande;
        vertex(x, y);
      }
      endShape();
      let xCirculo = 300;
      let yCirculo = yCentro - sin(fase + xCirculo * 0.008) * amplitudGrande;

      fill(170, 175, 205);
      noStroke();
      ellipse(xCirculo, yCirculo, 40);

      let movimiento = cos(fase + xCirculo * 0.008);
      if (movimiento > 0) {
        textoEstado = "Inhala...";
      } else {
        textoEstado = "Exhala...";
      }
    }

    if (textoEstado === "Inhala...") {
      stroke(120, 140, 210);
    } else {
      stroke(90, 100, 150);
    }
  }

  noStroke();
  fill(0);
  textAlign(CENTER);
  textFont(fuenteTexto);
  textSize(18);
  text(textoEstado, width / 2, 300);

  fill(0);
  textAlign(LEFT);
  textSize(25);
  text("¡Hola, " + nombre + "!", 35, 75);

  // botón play
  fill(60, 70, 110);
  noStroke();
  triangle(538, 315, 538, 346, 561, 331);

  fill(0);
  textSize(30);
  text("Play", 520, 370);

  // botón reset
  noFill();
  stroke(60, 70, 110);
  strokeWeight(4);
  arc(60, 333, 30, 30, PI * 0.3, PI * 1.8);

  fill(60, 70, 110);
  noStroke();
  triangle(66, 338, 74, 350, 77, 338);

  fill(0);
  textSize(30);
  text("Reset", 25, 370);

  stroke(200, 140, 130);
  line(0, 60, width, 60);

  // BOTÓN TERMINAR
  fill(137, 81, 89);
  noStroke();

  triangle(505, 18, 505, 42, 535, 30);
  fill(0);
  textFont(fuenteTexto);
  textSize(18);
  textAlign(LEFT);
 text("Finalizar", 540, 36);
}

function dibujarTransicionFinal() {
  transicionFinal += 0.03;

  // fondo negativo
  background(60, 55, 70);

  // Flecha expandiéndose
  fill(220, 230, 255);

  let tamaño = lerp(30, 900, transicionFinal);

  triangle(505, 30 - tamaño / 2, 505, 30 + tamaño / 2, 505 + tamaño, 30);

  if (transicionFinal >= 1) {
    pantalla = "final";
  }
}

function dibujarPantallaFinal() {
  // Fondo negativo automático
  background(60, 55, 70);

  dibujarParticulas();

  //decoraciones
  fill(223, 174, 160, 127);
 ellipse(25, 67, 200, 200); 
  ellipse(537, 24, 100, 100);

  fill(186, 188, 226, 127);
 ellipse(163, -4, 200, 200);
ellipse(549, 390, 90, 90);


  fill(55, 67, 117, 127);
ellipse(575, 79, 70, 70); 
  ellipse(63, 360, 200, 200);

  fill(137, 81, 90, 127);
 ellipse(581, 310, 200, 200); 
  ellipse(106, 261, 70, 70);

  // Mensaje principal
  fill(223, 174, 160, 127);
  textAlign(CENTER);
  textFont(fuenteTitulo);
  textSize(60);
 text("Desenfoque", width / 2, 70);

  noStroke();

  // Texto reflexión
  textAlign(CENTER, TOP)
  textFont(fuenteTexto);
  fill(186, 188, 226);
  textSize(16);
  text(
    "Recuerda que relajarse no significa apagar la mente, sino darle un espacio para respirar, reorganizarse y volver a sentirse presente. La respiración consciente y la interacción con estímulos suaves pueden ayudar a disminuir la sobrecarga sensorial, reducir el estrés y mejorar la atención sobre el cuerpo y las emociones. Tómate unos segundos antes de continuar con tu día: escucha cómo te sientes ahora, reconoce el cambio, aunque sea pequeño, y recuerda que volver a la calma también es una práctica que se aprende y se cultiva con el tiempo.",
      width / 2 - 250, 147, 480, 200);

  // BOTÓN VOLVER
  fill(220, 230, 255);
  stroke(223, 174, 160, 127);
  rect(width / 2 - 77, 360, 150, 40, 20);
  noStroke();
  fill(137, 81, 90);
  textSize(15);
  text("Volver al inicio", width / 2, 370);
}

//MENÚ (control)
function dibujarMenu() {
  // POSICIÓN DEL MENÚ
  let destino;
  // En pantalla respiración el menú desaparece
  if (menuDesplegado) {
    destino = 0;
  } else {
    destino = -370;
  }

  menuX = lerp(menuX, destino, 0.1);

  // DIBUJO DEL MENÚ
  push();
  translate(menuX, 0);

  // SOLO se dibuja la barra si NO estamos en respiración
  // Fondo menú
  if (!(pantalla === "respiracion" && !menuDesplegado)) {
    fill(223, 174, 160);
    noStroke();
    rect(0, 0, 430, 400);
  }

  // Recuadro título
  fill(186, 188, 226);
  stroke(55, 77, 117);
  rect(20, 20, 180, 44, 20);

  textAlign(LEFT);

  // Título
  fill(55, 67, 117);
  textSize(26);
  text("Configuración", 30, 36);

  // Descripción
  noStroke();
  fill(0);
  textSize(12);
  text(
    "Personaliza el uso del programa para mejorar tu experiencia y lograr una mayor conexión y comodidad.", 25, 57, 350, 50);

  // INPUT NOMBRE
  noStroke();
  fill(186, 188, 226);
 rect(46, 110, 150, 31, 20);

  fill(0);
  textSize(15);
  text("Ingresa tu nombre", 61, 122);

  if (escribiendo && frameCount % 30 < 15) {
    fill(255, 220, 220);
  } else {
    fill(255, 150);
  }
  stroke(137, 81, 90);
  rect(71, 150, 200, 30);

  fill(0);
  noStroke();
  textSize(16);
  text(nombre, 77, 162);

  // Cursor
  if (escribiendo && mostrarCursor) {
    line(77 + textWidth(nombre), 150, 77 + textWidth(nombre), 180);
  }

  // RITMO
  if (ritmo === "Normal" && frameCount % 30 < 15) {
    fill(255, 200, 200);
  } else {
    fill(255);
  }
  rect(37, 290, 75, 25);

  noStroke();
  fill(186, 188, 226);
  rect(25, 208, 105, 31, 20);

  fill(0);
  textSize(15);
  text("Ritmo", 57, 220);

  textSize(12);
  text("Elige el ritmo de tu respiración.", 30, 230, 132, 50);

  // Botones ritmo
  fill(255, 100);
  stroke(137, 81, 90);
 rect(37, 290, 75, 25); 
  rect(37, 325, 75, 25);

  if (ritmo === "Profundo" && frameCount % 30 < 15) {
    fill(200, 200, 255);
  } else {
    fill(255);
  }
  rect(37, 325, 75, 25);

  fill(0);
  noStroke();
  text("Normal", 55, 300);
  text("Profundo", 50, 335);

  // ESTÍMULOS
  noStroke();
  fill(186, 188, 226);
  rect(245, 208, 105, 31, 20);
  fill(0);
  textSize(15);
  text("Estimulo", 265, 220);

  textSize(12);
  text("Puedes elegir estímulos visuales.", 230, 230, 132, 50);

  // BOTÓN OFF
  if (estimulos === false && frameCount % 30 < 15) {
    fill(255, 200, 200);
  } else {
    fill(255);
  }

  stroke(137, 81, 90);
  rect(257, 290, 75, 25);
  
  // BOTÓN ON
  if (estimulos === true && frameCount % 30 < 15) {
    fill(200, 200, 255);
  } else {
    fill(255);
  }

  rect(257, 325, 75, 25);

  fill(0);
  noStroke();

  text("Off", 285, 300);
  text("On", 285, 335);
  pop();

  // POSICIÓN DEL BOTÓN
  let botonMenuX;

  if (menuDesplegado) {
    // pegado al borde derecho del menú abierto
    botonMenuX = menuX + 390;
  } else {
    // fijo en esquina izquierda pantalla
    botonMenuX = 8;
  }

  // Guardamos posición global
  botonMenu1 = botonMenuX;

  // DIBUJO BOTÓN
  stroke(137, 81, 90);
  strokeWeight(2);
  fill(168, 189, 226);

  rect(botonMenu1, botonY, 35, 7, 20); 
  rect(botonMenu1, botonY + 12, 35, 7, 20); 
  rect(botonMenu1, botonY + 24, 35, 7, 20);
}

function dibujarParticulas() {
  fill(170, 175, 205, 40);
  noStroke();

  ellipse(80, y1, 20); 
  ellipse(200, y2, 15); 
  ellipse(320, y3, 25); 
  ellipse(450, y4, 18); 
  ellipse(550, y5, 22);

  y1 += 0.5;
  y2 += 0.3;
  y3 += 0.6;
  y4 += 0.4;
  y5 += 0.5;

  // reinicio arriba
  if (y1 > height) {
    y1 = 0;
  }
  if (y2 > height) {
    y2 = 0;
  }
  if (y3 > height) {
    y3 = 0;
  }
  if (y4 > height) {
    y4 = 0;
  }
  if (y5 > height) {
    y5 = 0;
  }
}

function dibujarFiguras() {
  for (let i = figuras.length - 1; i >= 0; i--) {
    let f = figuras[i];

    // movimiento flotante
    f.y -= 0.4;

    // desvanecer
    f.opacidad -= 1.5;

    noStroke();
    fill(f.r, f.g, f.b, f.opacidad);

    // CÍRCULO
    if (f.tipo === "circulo") {
      ellipse(f.x, f.y, f.tamano);
    }

    // CUADRADO
    if (f.tipo === "cuadrado") {
      rect(f.x, f.y, f.tamano, f.tamano);
    }

    // LINEAS
    if (f.tipo === "lineas") {
      stroke(f.r, f.g, f.b, f.opacidad);

      line(f.x, f.y, f.x + 80, f.y + 80);

      noStroke();
    }

    // ESTRELLA
    if (f.tipo === "estrella") {
      beginShape();

      vertex(f.x, f.y - 20);
      vertex(f.x + 10, f.y);
      vertex(f.x + 30, f.y);
      vertex(f.x + 15, f.y + 10);
      vertex(f.x + 20, f.y + 30);
      vertex(f.x, f.y + 18);
      vertex(f.x - 20, f.y + 30);
      vertex(f.x - 15, f.y + 10);
      vertex(f.x - 30, f.y);
      vertex(f.x - 10, f.y);

      endShape(CLOSE);
    }

    // ROMBO
    if (f.tipo === "rombo") {
      push();

      translate(f.x, f.y);

      rotate(radians(45));

      rect(0, 0, f.tamano, f.tamano);

      pop();
    }

    // HEXAGONO
    if (f.tipo === "hexagono") {
      beginShape();

      vertex(f.x, f.y - 25);
      vertex(f.x + 22, f.y - 12);
      vertex(f.x + 22, f.y + 12);
      vertex(f.x, f.y + 25);
      vertex(f.x - 22, f.y + 12);
      vertex(f.x - 22, f.y - 12);

      endShape(CLOSE);
    }

    // ESPIRAL
    if (f.tipo === "espiral") {
      noFill();

      stroke(f.r, f.g, f.b, f.opacidad);

      beginShape();

      for (let a = 0; a < 20; a++) {
        let angulo = a * 20;

        let radio = a * 2;

        let px = f.x + cos(angulo) * radio;

        let py = f.y + sin(angulo) * radio;

        vertex(px, py);
      }

      endShape();
    }

    // eliminar figura
    if (f.opacidad <= 0) {
      figuras.splice(i, 1);
    }
  }
}

function dibujarOndas() {
  // ONDAS CIRCULARES
  for (let i = ondasCirculares.length - 1; i >= 0; i--) {
    let o = ondasCirculares[i];

    noFill();

    stroke(170, 180, 240, o.opacidad);

    ellipse(o.x, o.y, o.tamano);

    o.tamano += 4;

    o.opacidad -= 4;

    if (o.opacidad <= 0) {
      ondasCirculares.splice(i, 1);
    }
  }

  // ONDAS RECTANGULARES
  for (let i = ondasRectangulares.length - 1; i >= 0; i--) {
    let r = ondasRectangulares[i];

    noFill();

    stroke(220, 180, 190, r.opacidad);

    push();
    rectMode(CENTER);
    rect(r.x, r.y, r.tamano, r.tamano);
    pop();

    r.tamano += 4;

    r.opacidad -= 4;

    if (r.opacidad <= 0) {
      ondasRectangulares.splice(i, 1);
    }
  }
}

//INTERACCIONES
function mousePressed() {
  //Si la advertencia está activa, se cierra con cualquier click
  if (mostrarAdvertencia) {
    mostrarAdvertencia = false;
    return;
  }

  //Detecta si el usuario hace click en el botón del menú
  //Del menú
  if (
    mouseX > botonMenu1 &&
    mouseX < botonMenu1 + 35 &&
    mouseY > botonY &&
    mouseY < botonY + 30
  ) {
    //Permite cambiar el estado (abre/cierra)
    menuDesplegado = !menuDesplegado;
  }

  //click play Inicio
  if (pantalla === "inicio") {
    let x = width / 2;
    let y = 220;
    
    if (
      mouseX > x - 30 &&
mouseX < x + 40 &&
mouseY > y - 30 &&
mouseY < y + 30
    ) {
      if (ritmo === null) {
        mostrarAdvertencia = true;
      } else {
        mostrarAdvertencia = false;
        menuDesplegado = false;
        pantalla = "transicion1";
        transicion1 = 0;
      }
    }
  }

  if (pantalla === "respiracion") {
    if (
  mouseX > 530 &&
  mouseY > 300
) {
      if (ritmo !== null) {
        animado = true;
        tiempoInicio = millis();
      }
    }
  }

  if (pantalla === "respiracion") {
   if (
  mouseX < 120 &&
  mouseY > 300
) {
      animado = false;
      tiempoInicio = 0;
      figuras = [];
      ondasCirculares = [];
      ondasRectangulares = [];
    }
  }

  //Detecta si hago click en el input de texto para empezar a escribir
  if (menuDesplegado) {
    if (mouseX > menuX + 71 && mouseX < menuX + 271 && mouseY > 150 && mouseY < 180
    ) {
      escribiendo = true;
    } else {
      escribiendo = false;
    }
  } else {
    escribiendo = false;
  }

  //Botones de ritmo
  if (mouseX > menuX + 37 && mouseX < menuX + 37 + 75 && mouseY > 290 && mouseY < 290 + 25
  ) {
    ritmo = "Normal";
  }
  if (mouseX > menuX + 37 && mouseX < menuX + 37 + 75 && mouseY > 325 && mouseY < 325 + 25
  ) {
    ritmo = "Profundo";
  }

  // Botones de estímulos
  //off
  if (mouseX > menuX + 257 && mouseX < menuX + 257 + 75 && mouseY > 290 && mouseY < 290 + 25
  ) {
    estimulos = false;
  }

  //on
  if (mouseX > menuX + 257 && mouseX < menuX + 257 + 75 && mouseY > 325 && mouseY < 325 + 25
  ) {
    estimulos = true;
  }
  let distancia = dist(mouseX, mouseY, 300, 200);

  if (distancia < 40) {
    circuloLate = !circuloLate;
  }
  if (estimulos) {
    // CLICK IZQUIERDO
    if (mouseButton === LEFT) {
      ondasCirculares.push({
        x: mouseX,
        y: mouseY,
        tamano: 20,
        opacidad: 120,
      });
    }

    // CLICK DERECHO
    if (mouseButton === RIGHT) {
      ondasRectangulares.push({
        x: mouseX,
        y: mouseY,
        tamano: 20,
        opacidad: 120,
      });
    }
  }
  // BOTÓN TERMINAR
  if (pantalla === "respiracion") {
    if (mouseX > 500 && mouseX < 590 && mouseY > 10 && mouseY < 45
) {
      pantalla = "transicionFinal";

      transicionFinal = 0;
    }
  }
  // VOLVER AL INICIO
  if (pantalla === "final") {
    if (mouseX > width / 2 - 77 && mouseX < width / 2 + 90 && mouseY > 360 && mouseY < 405
    ) {
      // Reinicia estados
      pantalla = "inicio";
      animado = false;
      tiempoInicio = 0;
      figuras = [];
      ondasCirculares = [];
      ondasRectangulares = [];
      menuDesplegado = false;
    }
  }
}

//Escritura de texto
function keyTyped() {
  if (escribiendo) {
    nombre += key;
  }
}
function keyPressed() {
  if (keyCode === BACKSPACE && escribiendo) {
    nombre = nombre.substring(0, nombre.length - 1);
  }

  if (estimulos) {
    let tipoFigura = "";

    if (key === "a" || key === "A") {
      tipoFigura = "circulo";
    }

    if (key === "s" || key === "S") {
      tipoFigura = "cuadrado";
    }

    if (key === "d" || key === "D") {
      tipoFigura = "lineas";
    }

    if (key === "f" || key === "F") {
      tipoFigura = "estrella";
    }

    if (key === "h" || key === "H") {
      tipoFigura = "rombo";
    }

    if (key === "k" || key === "K") {
      tipoFigura = "hexagono";
    }

    if (key === "ñ" || key === "Ñ") {
      tipoFigura = "espiral";
    }

    if (tipoFigura !== "") {
      figuras.push({
        tipo: tipoFigura,

        x: random(width),
        y: random(height),

        tamano: random(40, 90),
        opacidad: 120,

        r: random(150, 255),
        g: random(150, 255),
        b: random(150, 255),
      });
    }

    // FONDOS
    if (key === "j" || key === "J") {
      fondoDiferente = !fondoDiferente;
    }
    if (key === "l" || key === "L") {
      modoOscuro = !modoOscuro;
    }
  }
}
