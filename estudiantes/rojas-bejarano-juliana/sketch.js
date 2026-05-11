//Juliana Rojas. 
//Diario descarga. herramienta entrega final
//Es una herramienta emocional que puede ayudar a alguien a desestresarse y dejar de estar abrumado. No está pidiendo que la persona explique lo que siente sino que lo suelte en un lienzo en blanco a disposición de los pensamientos de cada uno. La idea es escribir como salga, sin estructura y sin coherencia. 

//Empiezo estableciendo las variables de mi herramienta
//variable estados:
let estado = 0; //controla en que momento de la herramienta estoy
//agregar tipografia:
let font;

//variables Botones:
let botonInicio;
let botonEmpezar;
let botonGuardar;
let botonLiberado;

//variables ilustraciones
let ilustracionDiario;
let ilustracionEnter;

let posX = 50;
//variable Caja de texto
let entradaTexto;
//variable Lenguaje asemico
let figuras = []; 
//variables Color de fondo
let colorPicker; //personalizar el fondo
let colorFondo = "#D4CFC0"; //el color elegido por el usuario

//variable alfabeto
let alfabeto = {
  //Abecedario asemico interpretacion de claude
  // LETRAS CON FORMA CERRADA tipo 0 (figuras)

  a: {
    tipo: 0,
    puntos: [
      [-5, -35],
      [15, -20],
      [25, 5],
      [15, 30],
      [-5, 35],
      [-20, 15],
      [-25, -10],
      [-10, -30],
    ],
  },
  o: {
    tipo: 0,
    puntos: [
      [0, -38],
      [20, -28],
      [35, -5],
      [30, 22],
      [10, 36],
      [-15, 32],
      [-32, 10],
      [-30, -20],
      [-12, -36],
    ],
  },
  b: {
    tipo: 0,
    puntos: [
      [-20, -35],
      [-20, 35],
      [15, 35],
      [30, 15],
      [15, 0],
      [-20, 0],
      [15, -20],
      [28, -38],
    ],
  },
  d: {
    tipo: 0,
    puntos: [
      [-20, -35],
      [-20, 35],
      [10, 30],
      [30, 10],
      [30, -10],
      [10, -30],
    ],
  },
  e: {
    tipo: 0,
    puntos: [
      [-30, 0],
      [30, 0],
      [30, -15],
      [0, -35],
      [-25, -20],
      [-30, 10],
      [-20, 32],
      [10, 36],
      [30, 20],
    ],
  },
  g: {
    tipo: 0,
    puntos: [
      [30, -15],
      [10, -35],
      [-15, -30],
      [-30, -5],
      [-25, 25],
      [-5, 38],
      [20, 30],
      [30, 10],
      [30, 0],
      [0, 0],
    ],
  },
  p: {
    tipo: 0,
    puntos: [
      [-20, -35],
      [-20, 35],
      [-20, 0],
      [15, -5],
      [30, -20],
      [25, -38],
      [0, -42],
    ],
  },
  q: {
    tipo: 0,
    puntos: [
      [20, -35],
      [20, 35],
      [20, 0],
      [-15, -5],
      [-30, -20],
      [-25, -38],
      [0, -42],
    ],
  },

  // LETRAS CON TRAZO ABIERTO tipo 1 (lineas)

  c: {
    tipo: 1,
    puntos: [
      [30, -20],
      [10, -35],
      [-15, -28],
      [-30, 0],
      [-20, 28],
      [5, 38],
      [30, 22],
    ],
  },
  f: {
    tipo: 1,
    puntos: [
      [20, -38],
      [-5, -40],
      [-20, -20],
      [-15, 40],
      [20, 0],
      [-10, 0],
    ],
  },
  h: {
    tipo: 1,
    puntos: [
      [-20, -38],
      [-20, 38],
      [-20, 5],
      [10, -15],
      [25, 0],
      [25, 38],
    ],
  },
  i: {
    tipo: 1,
    puntos: [
      [0, -40],
      [0, 38],
      [0, -30],
    ],
  }, // + punto aparte arriba
  j: {
    tipo: 1,
    puntos: [
      [10, -38],
      [10, 20],
      [-5, 35],
      [-20, 28],
      [-22, 10],
    ],
  },
  k: {
    tipo: 1,
    puntos: [
      [-20, -38],
      [-20, 38],
      [-20, 0],
      [25, -38],
      [-20, 0],
      [25, 38],
    ],
  },
  l: {
    tipo: 1,
    puntos: [
      [-10, -38],
      [-10, 32],
      [20, 38],
    ],
  },
  m: {
    tipo: 1,
    puntos: [
      [-28, -5],
      [-28, 38],
      [-28, -5],
      [0, -25],
      [0, 38],
      [0, -5],
      [28, -25],
      [28, 38],
    ],
  },
  n: {
    tipo: 1,
    puntos: [
      [-20, -5],
      [-20, 38],
      [-20, -5],
      [20, -28],
      [20, 38],
    ],
  },
  r: {
    tipo: 1,
    puntos: [
      [-15, -5],
      [-15, 38],
      [-15, -5],
      [15, -25],
      [25, -5],
      [20, 10],
    ],
  },
  s: {
    tipo: 1,
    puntos: [
      [25, -25],
      [5, -38],
      [-18, -25],
      [-15, 0],
      [10, 5],
      [20, 20],
      [18, 35],
      [0, 40],
      [-20, 28],
    ],
  },
  t: {
    tipo: 1,
    puntos: [
      [0, -40],
      [0, 38],
      [-25, -10],
      [25, -10],
    ],
  },
  u: {
    tipo: 1,
    puntos: [
      [-20, -10],
      [-20, 20],
      [0, 38],
      [20, 20],
      [20, -10],
    ],
  },
  v: {
    tipo: 1,
    puntos: [
      [-25, -20],
      [0, 38],
      [25, -20],
    ],
  },
  w: {
    tipo: 1,
    puntos: [
      [-28, -15],
      [-15, 38],
      [0, 0],
      [15, 38],
      [28, -15],
    ],
  },
  x: {
    tipo: 1,
    puntos: [
      [-25, -35],
      [25, 35],
      [-25, 35],
      [25, -35],
    ],
  },
  y: {
    tipo: 1,
    puntos: [
      [-22, -25],
      [0, 10],
      [22, -25],
      [0, 10],
      [0, 40],
      [-15, 42],
    ],
  },
  z: {
    tipo: 1,
    puntos: [
      [-25, -35],
      [25, -35],
      [-25, 35],
      [25, 35],
    ],
  },
};

//Funcion para cargar la tipografia (usada en toda la herramienta) y las ilustraciones que utilice (para la parte de la explicacion de las teclas)
function preload() {
  font = loadFont("JustMeAgainDownHere-Regular.ttf");

  ilustracionDiario = loadImage("assets/diario.png");
  ilustracionEnter = loadImage("assets/enter.png");
}

//SETUP
function setup() {
  createCanvas(700, 500);
  textFont(font);

  //BOTON del estado 0. "Continuar"
  botonInicio = createButton("Continuar");
  botonInicio.position(250, 400);
  botonInicio.size(200, 50); //width,height.

  // estilos visuales
  botonInicio.style("background-color", "#798C8F");
  botonInicio.style("border", "2px solid #000000"); //poner el grosor, el tipo y el color
  botonInicio.style("border-radius", "12px"); //redondear esquinas
  botonInicio.style("font-family", "miFuente"); //usar mi fuente en el boton
  botonInicio.style("font-size", "20px"); // tamaño de la letra en px
  botonInicio.style("cursor", "pointer");// que salga la manito

  //sobre el boton. funcion de que esta sobre la funcion
  botonInicio.mouseOver(cambiarHover);
  //fuera del boton
  botonInicio.mouseOut(vuelvenormalelcolor);

  //BOTON del estado 1. "Comenzar a escribir"
  botonEmpezar = createButton("Comenzar a escribir");
  botonEmpezar.position(250, 370);
  botonEmpezar.size(220, 50);

  // estilos visuales
  botonEmpezar.style("background-color", "#798C8F");
  botonEmpezar.style("border", "2px solid #000000");
  botonEmpezar.style("border-radius", "12px");
  botonEmpezar.style("font-family", "miFuente");
  botonEmpezar.style("font-size", "20px");
  botonEmpezar.style("cursor", "pointer");

  //sobre el boton. funcion de que esta sobre la funcion
  botonEmpezar.mouseOver(cambiarHoverEmpezar);
  //fuera del boton
  botonEmpezar.mouseOut(volverColorEmpezar);

  //Esconder el boton porque aun no se debe ver
  botonEmpezar.hide();

  // BOTON del estado 2. "Guardar composicion"
  botonGuardar = createButton("Guardar composición");
  botonGuardar.position(540, height + 30);
  botonGuardar.size(140, 45);

  // estilos visuales
  botonGuardar.style("background-color", "#798C8F");
  botonGuardar.style("border", "2px solid #000000");
  botonGuardar.style("border-radius", "12px");
  botonGuardar.style("font-family", "miFuente");
  botonGuardar.style("font-size", "18px");
  botonGuardar.style("cursor", "pointer");

  //sobre el boton. funcion de que esta sobre la funcion
  botonGuardar.mouseOver(cambiarHoverGuardar);
  //fuera del boton
  botonGuardar.mouseOut(volverColorGuardar);

  // qué hace el botón? Descarga la composicion como imagen 
  botonGuardar.mousePressed(guardarComposicion);

  // Esconder el boton porque aun no se debe ver
  botonGuardar.hide();

  // BOTON del estado 3. "Me siento liberado"
  botonLiberado = createButton("Me siento liberado");
  botonLiberado.position(340, height + 30);
  botonLiberado.size(180, 45);

  // estilos visuales
  botonLiberado.style("background-color", "yellow");
  botonLiberado.style("border", "2px solid #000000");
  botonLiberado.style("border-radius", "12px");
  botonLiberado.style("font-family", "miFuente");
  botonLiberado.style("font-size", "18px");
  botonLiberado.style("cursor", "pointer");

  //sobre el boton. funcion de que esta sobre la funcion
  botonLiberado.mouseOver(cambiarHoverLiberado);
  //fuera del boton
  botonLiberado.mouseOut(volverColorLiberado);

  //Cuando orpimo ese boton me lleva a la reflexion
  botonLiberado.mousePressed(irAReflexion);
  
  // Esconder el boton porque aun no se debe ver
  botonLiberado.hide();

  
  //CAJA DE TEXTO que sale en estado 2
  entradaTexto = createElement("textarea");
  entradaTexto.position(20, height + 20);

  //place holder
  entradaTexto.attribute(
    "placeholder",
    "Escribe aquí todos tus pensamientos..."
  );
  
  //limite de caracteres
  entradaTexto.attribute("maxlength", "400");
  //tamaño de la caja de texto
  entradaTexto.size(500, 120);
  
  //estilos visuales
  entradaTexto.style("font-family", "miFuente");
  entradaTexto.style("font-size", "24px");
  entradaTexto.style("padding", "10px");
  entradaTexto.style("border-radius", "10px");
  
  //Esconder la caja porque aun no se debe ver
  entradaTexto.hide();

  // Icono de selector de color. Chat me ayudo a saber y utilizar esta funcion de p5
  colorPicker = createColorPicker("#D4CFC0");
  colorPicker.position(290, 330);
  colorPicker.style("cursor", "pointer");
  
  // Esconder el picker porque aun no se debe ver
  colorPicker.hide();

  botonInicio.mousePressed(cambiarEstado);
  botonEmpezar.mousePressed(cambiarEstado);
}


//DRAW
function draw() {
  //aqui pongo los diferentes estados para poder separar el codigo por momentos
  background(colorFondo);

  //Estado 0=intro de la herramienta
  if (estado === 0) {
    pantallaInstrucciones();
  }
  // estado 1 = personalización del lienzo
  if (estado === 1) {
    pantallaPersonalizacion();
  }

  // estado 2 = cuando el usuario escribe
  if (estado === 2) {
    pantallamomento1();
  }

  // estado 3 = cuando el usuario se diga " me siento liberado"
  if (estado === 3) {
    pantallamomento1();
    
    // Desaceleración del movimiento de las figuras, para simular esa calma de que "solte todo"
    for (let i = 0; i < figuras.length; i++) {
      let f = figuras[i];

      f.velX *= 0.98;
      f.velY *= 0.98;
      f.velRot *= 0.97;
    }
  }
  //estado 4= reflexion final 
  if (estado === 4) {
  pantallaFinal();
  }
}

//MOMENTOS DE LA HERRAMIENTA 
// Primer momento en donde sale la introduccion de la herramienta. Con la ilustracion del diario
function pantallaInstrucciones() {
  //subo la ilustracion 
  image(ilustracionDiario, 220, 45, 280, 280);

  fill(0);
  
  // titulo principal de la herramienta
  textAlign(CENTER, CENTER);
  textSize(36); 
  text("Tu DIARIO DE DESCARGA", width / 2, 60);

  //parrafo en donde se da el contexto de lo que es 
  textSize(20);
  // márgenes para que no toque los bordes
  let margen = 120;

  // ancho del párrafo
  let anchoTexto = width - margen * 2;

  // posición en X y Y
  let x = margen;
  let y = height / 2 - 120;

  // el texto no va solo en una linea sino con enter entre los parrafos, eso va con \n
  let mensaje =
    "Este no es un espacio para escribir bien. Es un espacio para soltar\n\n" +
    "A veces la cabeza se llena de cosas que no son pensamientos completos: " +
    "pendientes, preocupaciones, ideas sueltas o emociones que no sabemos nombrar.\n\n" +
    "Escribe como salga. Sin filtro, sin estructura,sin preocuparte por la\n coherencia. Recuerda que no tienes que entenderlo, solo dejarlo ir...";

  text(mensaje, x, y, anchoTexto, 300);
}

//Para que el color del botonInicio cambie cuando pongo el cursor encima:
function cambiarHover() {
  //cambiar el color cuando el cursor este encima
  botonInicio.style("background-color", "pink");
}
function vuelvenormalelcolor() {
  //cambiar otra vez el color cuando quito en cursor de encima
  botonInicio.style("background-color", "#798C8F");
}

//Para cambiar de color los botones cuando se pasa el cursor: 

// Para que el color del botonEmpezar cambie
function cambiarHoverEmpezar() {
  botonEmpezar.style("background-color", "pink");
}
//cambiar otra vez el color cuando quito en cursor de encima
function volverColorEmpezar() {
  botonEmpezar.style("background-color", "#798C8F");
}

// Para que el color del botonGuardar cambie
function cambiarHoverGuardar() {
  botonGuardar.style("background-color", "pink");
}
//cambiar otra vez el color cuando quito en cursor de encima
function volverColorGuardar() {
  botonGuardar.style("background-color", "#798C8F");
}

// Para que el color del botonLiberado cambie
function cambiarHoverLiberado() {
  botonLiberado.style("background-color", "pink");
}
//cambiar otra vez el color cuando quito en cursor de encima
function volverColorLiberado() {
  botonLiberado.style("background-color", "yellow");
}

//Cambio de estados
function cambiarEstado() {
  // Pasar de la introduccion a las instrucciones y personalizacion 
  if (estado === 0) {
    estado = 1;

    // ocultar botón intro
    botonInicio.hide();

    // mostrar botón empezar
    botonEmpezar.show();
  }
  else if (estado === 1) {
    estado = 2;

    entradaTexto.show();

    botonEmpezar.hide();

    colorPicker.hide();
  }
}

// Pasar de la pantalla de instrucciones a personalizar

function pantallaPersonalizacion() {
  fill(0);

  textAlign(CENTER);

  // título
  textSize(35);

  text("Antes de empezar ten en cuenta...", width / 2, 80);


  // texto explicación teclas
  textSize(27);

  let instrucciones =
    " = terminar composición\n\n" +
    "= limpiar lienzo\n\n" +
    "<--Elige el color de tu lienzo\n";

  text(instrucciones, 380, 250);

  // añado la ilustracion de enter 
  image(ilustracionEnter, 55, 110, 300, 300);
  
  //me hizo falta la ilustracion de esc. no logre ponerla

  // mostrar selector de color
  colorPicker.show();

  colorPicker.position(175, 295);

  // actualizar color constantemente
  colorFondo = colorPicker.value();
}

//Segundo momento en donde comienza a interactuar la herramienta con el usuario
function pantallamomento1() {

  for (let i = 0; i < figuras.length; i++) {
    let f = figuras[i];

    // movimiento de las figuras
    f.x = f.x + f.velX;
    f.y = f.y + f.velY;

    // que reboten en los bordes
    if (f.x < 0 || f.x > width) f.velX = f.velX * -1;
    if (f.y < 0 || f.y > height) f.velY = f.velY * -1;

    // rotación
    f.angulo = f.angulo + f.velRot;

    // dibujo que sale 
    push();
    translate(f.x, f.y);
    rotate(f.angulo);
    scale(f.escala);

    fill(f.r, f.g, f.b, 150);
    stroke(f.r * 0.4, f.g * 0.4, f.b * 0.4); // que el trazo sea más oscuro que el relleno
    strokeWeight(1.5);

    beginShape();
    for (let j = 0; j < f.puntosX.length; j++) {
      vertex(f.puntosX[j], f.puntosY[j]);
    }

    if (f.tipo === 0) {
      endShape(CLOSE);
    } else {
      noFill();
      endShape();
    }

    pop();
  }
}

//Para que las teclas tengan una funcion
function keyPressed() {
  // revisar cuánto texto hay
  let textoActual = entradaTexto.value();

  // si ya llegó al límite, detener función para que no sigan saliendo figuras
  if (textoActual.length >= 500) {
    return;
  }
  // Solo reacciona a letras, no otros caracteres del teclado.
  if (key.length === 1 && key.match(/[a-zA-Z]/)) {
    //solo tiene en cuenta letras de la a-z

    let letra = key.toLowerCase();

    // Se busca la letra en el alfabeto aséimco
    let datos = alfabeto[letra];

    let figura = {};

    //todo lo de las figuras va con random para que sean aleatorias
    // Posición inicial aleatoria
    figura.x = random(width);
    figura.y = random(height);

    // que tenga velocidad alta para el "caos"
    figura.velX = random(-6, 6);
    figura.velY = random(-6, 6);

    // Rotación
    figura.angulo = random(TWO_PI);
    figura.velRot = random(-0.12, 0.12);

    // Escala
    figura.escala = random(0.5, 1.8);

    // Colores random
    figura.r = random(255);
    figura.g = random(255);
    figura.b = random(255);

    // Traer el alfabeto interpretado por claude
    // tipo y puntos vienen del alfabeto, no son aleatorios
    if (datos) {
      figura.tipo = datos.tipo;
      figura.puntosX = datos.puntos.map((p) => p[0]);
      figura.puntosY = datos.puntos.map((p) => p[1]);
    } else {
      
      figura.tipo = int(random(2));
      figura.puntosX = [];
      figura.puntosY = [];
      for (let i = 0; i < 8; i++) {
        figura.puntosX.push(random(-40, 40));
        figura.puntosY.push(random(-40, 40));
      }
    }

    figuras.push(figura);
  }

  // la tecla ESC se usa para "limpiar" el canvas.
  if (keyCode === ESCAPE) {
    figuras = [];
  }
  //la tecla ENTER se usa para acabar la composicion
  if (keyCode === ENTER) {
    estado = 3;

    entradaTexto.hide();

    botonGuardar.show();

    botonLiberado.show();
  }
}

//uso esta funcion para que al usuario se le descargue la composicion como imagen en el pc
function guardarComposicion() {
  saveCanvas("mi_diario_de_descarga", "png");
}

//funcion final que me lleva a la reflecxion
function irAReflexion() {
  estado = 4;

  botonGuardar.hide();// ocultar el boton de guardar

  botonLiberado.hide(); // ocultar el boton de liberacion
}
//pantalla final de mi herramienta en donde sale la reflexion
function pantallaFinal() {

  background("#F5EBDC");

  fill(0);

  textAlign(CENTER, CENTER);

  // título
  textSize(40);

  text("Has dejado ir una parte de ti", width / 2, 120);

  // texto reflexión
  textSize(24);

  let reflexion =
    " \n\n" +
    "Tus pensamientos dejaron de ser palabras\n" +
    "para convertirse en movimiento, forma y color.\n\n" +
    "Como en las composiciones de Kandinsky,\n" +
    "las emociones también pueden existir\n" +
    "sin necesidad de explicarse.";

  text(reflexion, width / 2, height / 2);

}


