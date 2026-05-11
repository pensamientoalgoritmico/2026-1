
//Camila Andrea Murcia Ramirez
//RE:SHAPE es un generador visual de lámparas modulares desarrollado , dirigido a estudiantes y aprendices de diseño industrial o personas en proceso de formación en diseño de producto que necesitan explorar formas de manera rápida y experimental.

//El proyecto busca facilitar la creación de propuestas de lámparas a partir de figuras geométricas básicas como círculos, líneas, triángulos y rectángulos, permitiendo que el usuario construya una idea inicial que podría desarrollarse en un objeto real.A través del sistema, la persona puede jugar con diferentes composiciones y, en caso de no tener una idea clara desde el inicio, explorar variaciones automáticas generadas por cambios en posición, rotación y escala. Esto le permite descubrir nuevas configuraciones formales, estimular la creatividad y obtener referencias visuales que sirvan como punto de partida para el diseño de una lámpara.

////En el desarrollo de RE:SHAPE utilicé la IA como apoyo durante la programación en particular,la utilicé como herramienta de ayuda cuando aparecían errores en el código que no sabía cómo resolver, o cuando no entendía por qué una función no estaba funcionando correctamente. También me sirvió para encontrar soluciones alternativas y entender cómo corregir ciertos problemas.

//Además, la consulté cuando necesitaba implementar funciones nuevas que no había usado antes, como el uso de drawingContext y code context, que me permitieron mejorar el control del lienzo y el comportamiento de las figuras dentro del área de dibujo.

//En general, funcionó como un apoyo de aprendizaje para poder avanzar en el proyecto, entender mejor la lógica del código y resolver dudas durante el proceso.

//Inicio código

let pantalla = 0;

//La variable forma guarda cual módulo está seleccionado, cada número representa una figura diferente para simplificar los condicionales y evitar crear muchas variables distintas.

//1 = círculo
//2 = cuadrado
//3 = triángulo
//4 = línea
//5 = óvalo
//6 = rectángulo horizontal
//7 = luz vertical
//8 = luz izquierda
//9 = luz derecha


let forma = 1;

//Estos valores guardan el color actual seleccionado.


let colorR = 117;
let colorG = 191;
let colorB = 156;

//Cuando el usuario crea una figura necesita dos clicks.El primer click guarda el punto inicial,el segundo click guarda el punto final,con esos dos puntos se calcula tamaño, distancia y dirección de cada figura.

let puntoAX = 0;
let puntoAY = 0;

let esperandoSegundoClick = false;

//Todas las figuras se guardan en listas,cada posición de la lista representa una figura completaPor ejemplo:listaForma[0],listaX1[0]listaY1[0]

//Todas pertenecen a la misma figura,decidí trabajar con arreglos.

let listaForma = [];

let listaX1 = [];
let listaY1 = [];

let listaX2 = [];
let listaY2 = [];

let listaR = [];
let listaG = [];
let listaB = [];


//Estas listas almacenan la versión generativa cuando el usuario pulsa el botón VARIAR el programa NO reemplaza las figuras originales crea nuevas posiciones, nuevas rotacionesy nuevas escalas para producir otra composición.

let listaX1Nueva = [];
let listaY1Nueva = [];

let listaX2Nueva = [];
let listaY2Nueva = [];

let listaRNueva = [];
let listaGNueva = [];
let listaBNueva = [];

let listaRotacion = [];
let listaEscala = [];

//Esta variable sirve para detectar qué figura está más cerca del cursor se utiliza para la interacción de eliminar figuras con SHIFT + CLICK.

let figuraHover = -1;

//mostrarNueva permite decidir qué versión dibujar false = composición original ,true = composición generada automáticamente


let mostrarNueva = false;


//Estas variables determinan el tamaño y la posición del área principal de dibujo separar estos valores facilita mover el lienzo sin tener que cambiar muchos números en el código.

let lienzoX = 350;
let lienzoY = 50;

let lienzoW = 520;
let lienzoH = 600;

//El tamaño elegido fue horizontal para poder dividirla pantalla entre el panel de herramientas  y el área de composición


function setup() {
  // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  createCanvas(900, 720).parent("canvasContainer");
  //sigue como siempre
  background(255, 255, 255);
  ;
  

}


function draw() {
  
  if (pantalla == 0) {
    portada();
  }

  if (pantalla == 1) {
    interfaz();
  }

}

//La función portada() construye la pantalla inicial,primero creamos un fondo claro.Después generamos un patrón geométrico decorativo.


function portada() {

  background(242, 237, 220);

  noStroke();
//El patrón se hizo utilizando dos ciclos for un for controla columnas y el otro controla filas.

  for (let x = 80; x < width; x += 140) {

    for (let y = 80; y < height; y += 140) {
      //Dentro de cada repetición utilizamos:circle(),rect(),fill()
      fill(242, 213, 219);
      circle(x, y, 24);

      fill(91, 158, 166);
      circle(x + 28, y + 20, 14);

      fill(117, 191, 156);
      rect(x - 10, y + 32, 20, 20);

      fill(242, 229, 162);
      circle(x + 45, y - 18, 12);

    }

  }

  //Después del patrón dibujamos un recuadro blanco para centrar  el título del proyecto

  fill(255, 255, 255, 220);

  rect(175, 140, 540, 300, 18);

  //titulo en BOLD de mi proyecto re:shape
  fill(0);

  textStyle(BOLD);
  textSize(64);

  text("RE:SHAPE", 280, 240);

  fill(91, 158, 166);

  rect(285, 255, 326, 4);

  fill(0);

  textStyle(NORMAL);
  textSize(22);

  text(
    "Diseño generativo de lámparas",
    285,
    310
  );

  
  //El botón principal cambia de color cuando el cursor pasa encima con mouseX y mouseY que permiten conocer la posición actual y con cursor(HAND) cambia el cursor por una mano interactiva para comunicar que ocurre algo

  fill(91, 158, 166);

  if (
    mouseX > 260 &&
    mouseX < 650 &&
    mouseY > 350 &&
    mouseY < 408
  ) {

    fill(242, 213, 219);

    cursor(HAND);

  } else {

    cursor(ARROW);

  }

  rect(260, 350, 390, 58, 6);

  fill(255);

  textSize(21);

  text(
    "Haz click para comenzar",
    335,
    385
  );

}

function interfaz() {
  

  // el fondo principal mantiene la misma paleta cálida
  background(242, 237, 220);

  // esta función revisa constantemente cuál figura, está más cerca del mouse para poder resaltarla y permitir eliminarla con SHIFT + CLICK
  detectarHover();

  // panel lateral izquierdo, aquí organizamos todas las herramientas como colores, módulos e instrucciones
  fill(255, 255, 255, 235);
rect(20, 20, 300, 680, 18);  
  // título principal del proyecto 
  fill(0);

  textStyle(BOLD);
  textSize(28);

  text("RE:SHAPE", 50, 58);

  // pequeña línea decorativa
  fill(91, 158, 166);
  rect(50, 70, 145, 3);

  // subtítulo descriptivo
  fill(0);

  textStyle(NORMAL);
  textSize(14);

  text(
    "Diseña lámparas modulares",
    50,
    94
  );

  // sección de color, aquí aparecen los colores seleccionables cada botón llama la función botonColor() y recibe posición y valores RGB
  fill(0);

  textStyle(BOLD);
  textSize(13);

  text("Color", 50, 125);

  botonColor(45, 145, 200, 90, 90);
  botonColor(80, 145, 90, 130, 200);
  botonColor(115, 145, 120, 180, 140);

  botonColor(150, 145, 230, 210, 140);
  botonColor(185, 145, 230, 160, 100);
  botonColor(220, 145, 160, 130, 190);

  // sección de módulos, aquí el usuario selecciona qué figura quiere usar cada módulo representa una figura distinta para construir la lámpara
  fill(0);

  text("figuras", 50, 225);
botonForma(45, 245, 42, 42, 1);
botonForma(95, 245, 42, 42, 2);
botonForma(145, 245, 42, 42, 3);
botonForma(195, 245, 42, 42, 4);

botonForma(70, 295, 42, 42, 5);
botonForma(130, 295, 42, 42, 6);
  
  //luz
  text("Dirección de luz", 50, 360);
botonForma(45, 370, 42, 42, 7);
botonForma(95, 370, 42, 42, 8);
botonForma(145, 370, 42, 42, 9);
  
  
  // este mensaje aparece únicamente cuando el usuario ya hizo el primer click y el programa está esperando el segundo punto
if (esperandoSegundoClick) {

  fill(200, 90, 90);

  textStyle(BOLD);
  textSize(25);

  text(
    "Esperando segundo click...",
    470,
    695
  );

}

// instrucciones de uso

// instrucciones de uso

fill(200, 90, 90);

textStyle(BOLD);
textSize(18);

text("INSTRUCCIONES", 50, 440);

fill(200, 90, 90);

textStyle(BOLD);
textSize(15);

text("1. Elige el color", 50, 460);
text("2. Elige la figura o dirección de luz", 50, 485);

text("3. Click donde inicia la figura o luz", 50, 510);

text("4. Click donde termina la figura o luz", 50, 535);

fill(200, 90, 90);

textStyle(BOLD);

text(
  "5. SHIFT + CLICK elimina",
  50,
  560
);

  // botón variar genera una nueva composición automáticamente, a partir de las figuras ya existentes
  fill(91, 158, 166);

  // mouseX y mouseY permiten detectar la posición actual del cursor que cambia el color del botón y además cambia el cursor a una mano
 if (
  mouseX > 50 &&
  mouseX < 230 &&
  mouseY > 585 &&
  mouseY < 627
) {

    fill(242, 213, 219);

    // cursor(HAND)  que cambia el cursor a una mano interactiva
    
    cursor(HAND);

  }

rect(50, 650, 180, 42, 10); 
  fill(255);

  textStyle(BOLD);
  textSize(17);
text("VARIAR", 103, 681);

// botón guardar permite exportar la composición final como imagen PNG

fill(117, 191, 156);

if (
  mouseX > 50 &&
  mouseX < 230 &&
  mouseY > 610 &&
  mouseY < 646
) {

  fill(242, 213, 219);

  cursor(HAND);

}

rect(50, 610, 180, 36, 10);

fill(255);

textStyle(BOLD);
textSize(13);

text(
  "GUARDAR IMAGEN",
  67,
  632
);

// si el mouse NO está encima de botones, el cursor vuelve a su estado normal

if (

  !(mouseX > 50 &&
    mouseX < 230 &&
    mouseY > 655 &&
    mouseY < 697)

  &&

  !(mouseX > 50 &&
    mouseX < 230 &&
    mouseY > 610 &&
    mouseY < 646)

  &&

  figuraHover == -1

) {

  cursor(ARROW);

}


  // rectángulo principal donde se dibujan las lámparas
  fill(255, 255, 255, 190);

  rect(
    lienzoX,
    lienzoY,
    lienzoW,
    lienzoH,
    18
  );

  // push() y pop() permiten guardar
  // y recuperar estados gráficos
  // para que ciertos cambios no afecten
  // otras partes del programa
  push();
   
  // intente en diferentes ocasiones probar una manera para que cuando la figura fuera muy grande no se saliera del lienzo, por el contrario se recorte para no cubrir el recuadro con las opciones de colores, módulos..., pero me fue imposible con lo que habìa aprendido por tanto utilice:
  // drawingContext.save() que guarda el contexto gráfico actual, beginPath() inicia una nueva forma recortable, clip() recorta el área visible
  
  // que sirve para evitar que las figuras se dibujen por fuera del lienzo
  
  // Referencias:
  // https://p5js.org/reference/#/p5/drawingContext
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip

  drawingContext.save();

  drawingContext.beginPath();

  drawingContext.rect(
    lienzoX,
    lienzoY,
    lienzoW,
    lienzoH
  );

  drawingContext.clip();

  // dependiendo del estado actual, el programa dibuja la composición original o la composición generada automáticamente
  if (mostrarNueva == false) {

    dibujarTodas();

  } else {

    dibujarNueva();

  }

  // investigue y si no usamos restore() el recorte seguiría activo y el resto de la interfaz, podría dibujarse mal o cortarse
  
  drawingContext.restore();

  pop();

}
function botonColor(x, y, r, g, b) {

  // esta función crea cada uno de los botones de color,recibe la posición X y Y y además los valores RGB del color correspondiente

  fill(r, g, b);

  // rectángulo pequeño, con bordes redondeados
  rect(x, y, 24, 24, 5);

  // esta condición revisa si el color actual coincide con el botón, si coincide aparece un borde rosado, para indicar que el color está seleccionado
  if (
    colorR == r &&
    colorG == g &&
    colorB == b
  ) {

    stroke(242, 213, 219);
    strokeWeight(3);
    noFill();

    rect(x, y, 24, 24, 5);
    noStroke();

  }

}

function botonForma(
  x,
  y,
  w,
  h,
  numero
) {

  // esta función crea todos los botones correspondientes a los módulos , cada botón recibe posición, tamaño y el de la figura

  // si la figura está seleccionada,el botón cambia a color azul verdoso para mostrar cuál módulo está activo
  if (forma == numero) {

    fill(91, 158, 166);

  } else {

    fill(242, 213, 219);

  }

  // base del botón
  rect(x, y, w, h, 8);

  stroke(0);
  strokeWeight(1.5);

  fill(0);

  // dependiendo del número recibido el programa dibuja un ícono diferente

  // círculo
  if (numero == 1) {

    noStroke();

    circle(x + 21, y + 21, 16);

  }

  // cuadrado
  
  if (numero == 2) {

    noStroke();

    rect(x + 13, y + 13, 16, 16);

  }

  // triángulo
  if (numero == 3) {

    noStroke();

    // triangle() necesita 3 puntos, pues por los tres vertices cada punto tiene coordenadas X y Y
    triangle(
      x + 21,
      y + 10,

      x + 11,
      y + 30,

      x + 31,
      y + 30
    );

  }

  // línea
  if (numero == 4) {

    // line() dibuja una línea usando un punto inicial osea el a y uno fina b
    line(
      x + 10,
      y + 21,

      x + 32,
      y + 21
    );

  }

  // óvalo
  if (numero == 5) {

    noStroke();

    // ellipse() permite crear formas ovaladas
    ellipse(
      x + 21,
      y + 21,
      24,
      14
    );

  }

  // rectángulo horizontal
  if (numero == 6) {

    noStroke();

    rect(
      x + 10,
      y + 16,
      24,
      12
    );

  }
  
    if (numero == 7) {

  triangle(
    x + 21, y + 10,
    x + 10, y + 32,
    x + 32, y + 32
  );

}

if (numero == 8) {

  triangle(
    x + 10, y + 21,
    x + 32, y + 10,
    x + 32, y + 32
  );

}

if (numero == 9) {

  triangle(
    x + 32, y + 21,
    x + 10, y + 10,
    x + 10, y + 32
  );

}

  noStroke();

}

  // esta es una de las funciones más importantes, porque aquí se dibujan todas las figuras del proyecto

 // la función recibe
  //tipo de figura
  // posiciones
  // color
  // rotación
  // escala

function dibujarFigura(
  tipo,
  x1,
  y1,
  x2,
  y2,
  r,
  g,
  b,
  rot = 0,
  escala = 1
) {




  // gracias a esto se vuelve a utilizar, la misma función para muchas formas diferentes

  // push() guarda el estado actual
  push();

  // translate() mueve el punto de origen
  // hacia la posición de la figura, esto hace más fácil rotar y escalar desde el centro de cada módulo
  
  // Referencia:
  // https://p5js.org/reference/#/p5/translate
  translate(x1, y1);

  // rotate() rota el sistema de coordenadas
  // usando radianes
  // esta función fue utilizada para generar variaciones más orgánicas y diferentes

  
  rotate(rot);

  // scale() cambia el tamaño de la figura
  // sin modificar sus coordenadas originales 

  // Referencia:
  // https://p5js.org/reference/#/p5/scale
  scale(escala);


  fill(r, g, b);
  stroke(91, 158, 166);
  strokeWeight(1.5);

  // dist() calcula la distancia entre dos puntos se uso esa distancia para definir el tamaño de las figuras esto permite que el usuario controle el tamaño dependiendo de qué tan lejos haga el segundo click (punto b)
  
  let tamaño = dist(
    x1,
    y1,
    x2,
    y2
  );
    
    let ancho = x2 - x1;
    let alto = y2 - y1; 

  // cada condición revisa qué tipo de figura es para dibujarla

  // círculo
    // el círculo presentó un problema con la dirección en la que el usuario dibujaba la figura. Inicialmente funcionaba correctamente cuando el movimiento era vertical, pero al realizarlo horizontalmente el círculo se desfasaba respecto al punto B seleccionado. Para solucionarlo se mantuvo la lógica original vertical y se agregó una condición que detecta si el movimiento del mouse es más horizontal o vertical. Dependiendo de eso, el programa adapta automáticamente la posición y el tamaño del círculo para que respete correctamente los límites definidos entre el punto A y el punto B sin perder su proporción circular.
    
    
if (tipo == 1) {

  let dx = x2 - x1;
  let dy = y2 - y1;

  // si el movimiento es más horizontal
  if (abs(dx) > abs(dy)) {

    let tamaño = abs(dx);

    ellipse(
      dx / 2,
      0,
      tamaño,
      tamaño
    );

  } else {

    // vertical original

    let tamaño = abs(dy);

    ellipse(
      0,
      dy / 2,
      tamaño,
      tamaño
    );

  }

}
  

  // cuadrado
 if (tipo == 2) {

  rect(
    0,
    0,
    tamaño,
    tamaño
  );

}

  // // triángulo es una figura peculiar, tuve que ayudarme de la inteligencia artificial para este apartado. Inicialmente el triángulo únicamente funcionaba correctamente cuando la persona lo dibujaba de arriba hacia abajo tomando el punto A como el vértice superior y el punto B como el centro de la base. Sin embargo, si el usuario lo hacía horizontalmente la figura se deformaba o se invertía. Por eso se agregó una condición que interpreta si el movimiento del mouse fue más horizontal o más vertical para adaptar automáticamente la orientación del triángulo y hacer la interacción más intuitiva
    
if (tipo == 3) {

  let dx = x2 - x1;
  let dy = y2 - y1;

  // si el usuario dibuja más horizontal
  if (abs(dx) > abs(dy)) {

    let ancho = abs(dx);

    // si se inicia desde la izquierda a derecha en horizontal en cuanto a los clicks
    triangle(

      0,
      0,

      dx,
      -ancho / 2,

      dx,
      ancho / 2

    );

  } else {

    // de arriba a abajo 

    let alto = abs(dy);

    triangle(

      0,
      0,

      -alto / 2,
      dy,

      alto / 2,
      dy

    );

  }

}

  // línea
  if (tipo == 4) {

    // la línea utiliza la diferencia
    // entre el punto inicial y el final
    line(
      0,
      0,

      x2 - x1,
      y2 - y1
    );

  }

  // óvalo
if (tipo == 5) {

  ellipse(
    ancho / 2,
    alto / 2,
    abs(ancho),
    abs(alto)
  );

}

  // rectángulo horizontal
 if (tipo == 6) {

  rect(
    0,
    0,
    ancho,
    alto
  );

}
    
    if (tipo == 7) {

  noStroke();

fill(255, 220, 90, 60);
  triangle(
    0,
    0,

    -80,
    lienzoH,

    80,
    lienzoH
  );

}
    if (tipo == 8) {

  noStroke();

fill(255, 220, 90, 60);
  triangle(
    0,
    0,

    -220,
    lienzoH,

    0,
    lienzoH
  );

}
    
    if (tipo == 9) {

  noStroke();

fill(255, 220, 90, 60);
  triangle(
    0,
    0,

    0,
    lienzoH,

    220,
    lienzoH
  );

} 

  // pop() lo de siempre ayuda a guardar el estado actual
  pop();

}

function dibujarTodas() {

  // esta función recorre todas las listas donde guardamos la información original de las figuras creadas por el usuario


  for (let i = 0; i < listaForma.length; i++) {

    // revisa, si el mouse está encima de una figura, mientras la tecla SHIFT está presionada,en ese caso la figura cambia visualmente, para indicar que puede eliminarse (se pone rojo)
    if (
      figuraHover == i &&
      keyIsDown(SHIFT)
    ) {

      // borde rojo de figura pa eliminar
      stroke(242, 120, 120);

      strokeWeight(3);

    
      cursor(HAND);

    } else {

      // si no está seleccionada vuelve al borde normal
      stroke(91, 158, 166);

      strokeWeight(1.5);

    }

    // aquí se llama la función dibujarFigura()usando la información guardada en cada lista
    dibujarFigura(
      listaForma[i],

      listaX1[i],
      listaY1[i],

      listaX2[i],
      listaY2[i],

      listaR[i],
      listaG[i],
      listaB[i],

      0,
      1
    );

  }

}

function dibujarNueva() {

  // esta función utiliza las listas de variación generativa

  for (let i = 0; i < listaForma.length; i++) {

    stroke(91, 158, 166);

    strokeWeight(1.5);

    dibujarFigura(
      listaForma[i],

      listaX1Nueva[i],
      listaY1Nueva[i],

      listaX2Nueva[i],
      listaY2Nueva[i],

      listaRNueva[i],
      listaGNueva[i],
      listaBNueva[i],

      listaRotacion[i],
      listaEscala[i]
    );

  }

}

function detectarHover() {

  // esta función se encarga de detectar cuál figura está más cerca del mouso, esto permite generar el efecto hover para resaltar figuras y poder eliminarlas

  // diciendo que inicialmente ,no hay ninguna figura seleccionada
  figuraHover = -1;

  // punto de partida, para después comparar distancias
  let distanciaMinima = 999999;

  for (let i = 0; i < listaForma.length; i++) {

    let d = dist(
      mouseX,
      mouseY,

      listaX1[i],
      listaY1[i]
    );

    // si la distancia es menor a 28  y además es la más cercana encontrada entonces esa figura se convierte en la figura seleccionada
    if (
      d < 28 &&
      d < distanciaMinima
    ) {

      distanciaMinima = d;

      figuraHover = i;

    }

  }

}

function generarVariacion() {

  // esta función genera automáticamente una nueva composición usando las figuras originales como base
  
  // la idea es crear variaciones visuales similares al diseño generativo

  // primero vaciar todas las listas nuevas
  
  listaX1Nueva = [];
  listaY1Nueva = [];

  listaX2Nueva = [];
  listaY2Nueva = [];

  listaRNueva = [];
  listaGNueva = [];
  listaBNueva = [];

  listaRotacion = [];
  listaEscala = [];

  for (let i = 0; i < listaForma.length; i++) {

    // guarda temporalmente el tipo de figura actual
    let tipo = listaForma[i];

    // random() números aleatorios para que la variacion sea realmente aleatoria, aquí probabilidad del 80%, para decidir si una figura cambia
    
    let cambiar =
      random() < 0.8;

    // las líneas tienen un comportamiento especial,porque visualmente se dañaban demasiado cuando se movían mucho, por eso únicamente se desplaza muy poco
    if (
      tipo == 4 ||
      cambiar == false
    ) {

      let dxLinea =
        random(-3, 3);

      let dyLinea =
        random(-3, 3);

      listaX1Nueva.push(
        listaX1[i] + dxLinea
      );

      listaY1Nueva.push(
        listaY1[i] + dyLinea
      );

      listaX2Nueva.push(
        listaX2[i] + dxLinea
      );

      listaY2Nueva.push(
        listaY2[i] + dyLinea
      );

      // las líneas no rotan, ni cambian de escala
      listaRotacion.push(0);

      listaEscala.push(1);

    } else {

      // las demás figuras sí tienen más libertad de movimiento

   let dx =
  random(-8, 8);

let dy =
  random(-8, 8);

      listaX1Nueva.push(
        listaX1[i] + dx
      );

      listaY1Nueva.push(
        listaY1[i] + dy
      );

      listaX2Nueva.push(
        listaX2[i] + dx
      );

      listaY2Nueva.push(
        listaY2[i] + dy
      );

      //para utilizar los angulos de la rotacion entendi que hay que trabajar con PI porque rotate() funciona usando radianes
    
      listaRotacion.push(
      random(
  -PI / 20,
  PI / 20
)
      );

      // la escala cambia muy poco para mantener coherencia visual
      listaEscala.push(
        random(0.95, 1.08)
      );

    }

    // los colores originales se mantienen, para conservar la idea que ya tenia el usuario que diseño su lampara
    listaRNueva.push(listaR[i]);
    listaGNueva.push(listaG[i]);
    listaBNueva.push(listaB[i]);

  }

  // esta variable cambia el estado visual y hace que ahora se dibuje la composición generada
  mostrarNueva = true;

}
function mousePressed() {

  // esta función se ejecuta automáticamente cada vez que el usuario hace click, toda la interacción principal del proyecto
  
  // primero reviso si el usuario todavía está en la portada inicial
  if (pantalla == 0) {

    // al hacer click cambia el valor de la variable pantalla
    
    pantalla = 1;

    // return detiene la función para evitar que siga ejecutando
    return;

  }

  // esta parte permite eliminar figuras usando SHIFT + CLICK
  
  // keyIsDown() revisa si una tecla, está siendo presionada actualmente
  
  // Referencia: https://p5js.org/reference/#/p5/keyIsDown

  if (keyIsDown(SHIFT)) {

    // figuraHover guarda el índice de la figura más cercana al mouse si el valor es diferente de -1 significa que sí hay una figura seleccionada
    if (figuraHover != -1) {

      // splice() elimina elementos de un arreglo,como toda la información está guardada,en listas separadas debemos eliminar el mismo índice en TODAS las listas
      
      // Referencia:
      // https://developer.mozilla.org/en US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

      listaForma.splice(
        figuraHover,
        1
      );

      listaX1.splice(
        figuraHover,
        1
      );

      listaY1.splice(
        figuraHover,
        1
      );

      listaX2.splice(
        figuraHover,
        1
      );

      listaY2.splice(
        figuraHover,
        1
      );

      listaR.splice(
        figuraHover,
        1
      );

      listaG.splice(
        figuraHover,
        1
      );

      listaB.splice(
        figuraHover,
        1
      );

    }

    
    return;

  }

  // botón guardar imagen mouseX y mouseY permiten detectar, si el click ocurrió dentro del botón
if (
  mouseX > 50 &&
  mouseX < 230 &&
  mouseY > 610 &&
  mouseY < 646
) {

// get() captura una parte específica del canvas,en este caso únicamente el área del lienzo donde el usuario diseña la lámpara para evitar tomar captura de todo

let img = get(
  lienzoX,
  lienzoY,
  lienzoW,
  lienzoH

);

img.save("mi_lampara.png");
    

    return;

  }

  // botón variar si el usuario hace click , llama la función generarVariacion()
 if (
  mouseX > 50 &&
  mouseX < 230 &&
  mouseY > 655 &&
  mouseY < 697
) {

    generarVariacion();

    return;

  }

  // selección de colores, cada condición revisasi el click ocurrió encima de un botón específico para dar el feedback visual de que se puede presionar y que si esta seleccionado

  //rojo
  if (
    mouseX > 45 &&
    mouseX < 69 &&
    mouseY > 145 &&
    mouseY < 169
  ) {

    colorR = 200;
    colorG = 90;
    colorB = 90;

  }
//azul
  if (
    mouseX > 80 &&
    mouseX < 104 &&
    mouseY > 145 &&
    mouseY < 169
  ) {

    colorR = 90;
    colorG = 130;
    colorB = 200;

  }
//verde
  if (
    mouseX > 115 &&
    mouseX < 139 &&
    mouseY > 145 &&
    mouseY < 169
  ) {

    colorR = 120;
    colorG = 180;
    colorB = 140;

  }
//amarillo
  if (
    mouseX > 150 &&
    mouseX < 174 &&
    mouseY > 145 &&
    mouseY < 169
  ) {

    colorR = 230;
    colorG = 210;
    colorB = 140;

  }
//naranja
  if (
    mouseX > 185 &&
    mouseX < 209 &&
    mouseY > 145 &&
    mouseY < 169
  ) {

    colorR = 230;
    colorG = 160;
    colorB = 100;

  }
//morado
  if (
    mouseX > 220 &&
    mouseX < 244 &&
    mouseY > 145 &&
    mouseY < 169
  ) {

    colorR = 160;
    colorG = 130;
    colorB = 190;

  }

  // selección de forma dependiendo del número, luego se dibuja una figura distinta

  //circulo
  if (
    mouseX > 45 &&
    mouseX < 87 &&
    mouseY > 245 &&
    mouseY < 287
  ) {

    forma = 1;

    return;

  }
// cuadrado
  if (
    mouseX > 95 &&
    mouseX < 137 &&
    mouseY > 245 &&
    mouseY < 287
  ) {

    forma = 2;

    return;

  }
//triangulo
  if (
    mouseX > 145 &&
    mouseX < 187 &&
    mouseY > 245 &&
    mouseY < 287
  ) {

    forma = 3;

    return;

  }
// linea
  if (
    mouseX > 195 &&
    mouseX < 237 &&
    mouseY > 245 &&
    mouseY < 287
  ) {

    forma = 4;

    return;

  }
//ovalo
  if (
    mouseX > 70 &&
    mouseX < 112 &&
    mouseY > 295 &&
    mouseY < 337
  ) {

    forma = 5;

    return;

  }
// rectangulo
  if (
    mouseX > 130 &&
    mouseX < 172 &&
    mouseY > 295 &&
    mouseY < 337
  ) {

    forma = 6;

    return;

  }
  
  // luz vertical
if (
  mouseX > 45 &&
  mouseX < 87 &&
  mouseY > 370 &&
mouseY < 412
) {

  forma = 7;

  return;

}

// luz izquierda
if (
  mouseX > 95 &&
  mouseX < 137 &&
  mouseY > 370 &&
mouseY < 412
) {

  forma = 8;

  return;

}

// luz derecha
if (
  mouseX > 145 &&
  mouseX < 187 &&
  mouseY > 370 &&
mouseY < 412
) {

  forma = 9;

  return;

}

  // esta parte controla la creación de figuras, verifica si ocurra dentro del lienzo principal
  if (

    mouseX > lienzoX &&
    mouseX < lienzoX + lienzoW &&

    mouseY > lienzoY &&
    mouseY < lienzoY + lienzoH

  ) {

    // si el usuario vuelve a dibujar oculta la variación anterior
    mostrarNueva = false;

    // primer click guarda el punto inicial de la figura
    if (!esperandoSegundoClick) {

      puntoAX = mouseX;
      puntoAY = mouseY;

      // activa el modo espera para recibir el segundo punto
      esperandoSegundoClick = true;

    } else {

      //  guarda toda la información de la nueva figura

      listaForma.push(forma);

      listaX1.push(puntoAX);
      listaY1.push(puntoAY);

      listaX2.push(mouseX);
      listaY2.push(mouseY);

      listaR.push(colorR);
      listaG.push(colorG);
      listaB.push(colorB);

      // termina el proceso y vulve al estado inicial
      esperandoSegundoClick = false;

    }

  }

}

  