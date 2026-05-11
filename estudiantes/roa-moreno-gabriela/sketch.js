// Gabriela Roa Moreno - E8:Alquimía Culinaria

// Descripción de lo que hace: este proyecto es una herramienta que busca ayudar a decidir qué cocinar. A partir de las decisiones: proteína, calorías, momento del día, cantidad de personas y nivel de sal. Estas dos últimas afectan únicamente el componente visual del caldero. Debido a esto hay un total de 45 recetas posibles. Cada elección afecta al caldero de la siguiente manera: la proteína cambia el color de las burbujas, las calorías cambian el tamaño de las burbujas, la cantidad de personas cambia la cantidad de burbujas, el nivel de sal cambia la intensidad del color, y el momento del día cambia la velocidad del movimiento. Además, las recetas las escogí de un canal de YouTube de un señor que les gusta a mis papás ver para cocinar. La respuesta del programa es una segunda página en la que se muestran las selecciones hechas por la persona junto a un código QR que puede escanear para ver el video de YouTube de la receta que corresponde a sus elecciones.

// Elección de la herramienta: esta herramienta surge de una situación cotidiana en mi hogar, ya que muchas veces al momento de cocinar no sabemos qué elegir o preparar. Por esta razón decidí crear un recetario interactivo en el que, a partir de distintas selecciones hechas por el usuario, el programa devuelve una receta diferente. También decidí incluir únicamente proteínas que normalmente se comen en mi casa para que las recetas fueran más cercanas a mi contexto personal. La cantidad máxima de personas es cuatro porque somos cuatro integrantes en mi familia.

//Opciones por defecto: proteína huevo, desayuno, calorías mínimas, 1 persona y sal media.

//Herramientas nuevas: la función color() de p5 para convertir colores hexadecimales en valores rojo, verde y azul. Esto me permite usar el mismo color de cada proteína pero con diferentes niveles de transparencia. Además uso un diccionario anidado para organizar las recetas del CSV. La información queda guardada por proteína, luego por calorías y luego por momento del día.

// Referencias:
// Eevi Rutanen: uso de sistemas donde el usuario cambia parámetros y el sistema responde. Link: https://www.eevirutanen.com/
// Conditional Design: reglas simples que generan resultados distintos. Link: https://www.conditionaldesign.org/
// Nail Color Workshop (Friv): inspiración en la lógica de combinar selecciones dentro de un recipiente central para obtener un resultado visual y personalizado. Link: https://www.friv.com/z/games/nailcolorworkshop/game.html

// Uso de IA: para este proyecto utilicé la IA para ajustar las ubicaciones de los elementos, ya que antes tenía un canvas fijo y ahora el diseño se adapta al tamaño de la pantalla. También la usé para mejorar la idea de la segunda página, especialmente en la organización de la información y en la idea de poner emojis al lado de cada selección. Además, intenté usarla para embeber los videos de YouTube dentro del canvas, pero no fue posible porque YouTube bloquea la reproducción. También probé hacerlo con un botón y un link directo, sin embargo, tampoco funciono, por lo que finalmente decidí resolverlo con códigos QR. Además lo use para que me ayudara a cambiar la tipografía dentro de los elementos de html a la que yo cargué.

// imagen del caldero
let img;

// fuentes
let quotes;
let lora;

// controles HTML que va a usar el usuario
let sliderCalorias;
let inputPersonas;
let dropdownSal;

// estas variables guardan lo que el usuario va seleccionando
let momento = "desayuno";
let proteina = "huevo";

// arreglos para guardar la información de cada burbuja
let posX = [];
let posY = [];
let tamano = [];
let velocidad = [];
let transparencia = [];
let desfase = [];

// tabla donde está la información de las recetas
let tabla;

// diccionario donde se organizan las recetas del CSV
let recetas = {};

// aquí se guarda la receta que coincide con lo que el usuario escogió
let recetaSeleccionada;

// esta variable permite cambiar entre la pantalla del menú y la pantalla de la receta
let pantalla = "menu";

// guarda el nivel de calorías en texto para poder compararlo con el CSV
let nivelCalorias;

// objeto que guarda todas las imágenes de los códigos QR cargadas, usando el nombre del archivo como llave
let imgQR = {};
// guarda el QR que se está mostrando en pantalla en ese momento
let imgQRCargada = null;

function preload() {
  // cargo la imagen del caldero antes de iniciar el programa
  img = loadImage("img/olla.png");

  // cargo la fuente del título
  quotes = loadFont("fuentes/quotes.ttf");

  //cargo fuente secundaria
  lora = loadFont("fuentes/lora.ttf");

  // cargo el archivo CSV con las recetas
  tabla = loadTable("datos/datos_comida.csv", "csv", "header");
}

function setup() {
  // NO EDITAR LA SIGUIENTE LÍNEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");

  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  // creo el slider que controla el nivel de calorías
  sliderCalorias = createSlider(1, 3, 1, 1);
  diseñoHTML(sliderCalorias);

  // creo el input para que el usuario escriba la cantidad de personas
  inputPersonas = createInput("1");
  inputPersonas.attribute("type", "number");
  inputPersonas.attribute("min", "1");
  inputPersonas.attribute("max", "4");
  diseñoHTML(inputPersonas);

  // creo la lista desplegable para elegir el nivel de sal
  dropdownSal = createSelect();
  dropdownSal.option("Bajo");
  dropdownSal.option("Medio");
  dropdownSal.option("Alto");
  dropdownSal.selected("Medio");
  diseñoHTML(dropdownSal);

  // reposiciono todos los elementos según el tamaño actual
  posicionarElementosHTML();

  // creo las burbujas con posiciones y valores aleatorios
  for (let i = 0; i < 100; i++) {
    posX[i] = random(width / 2 - 70, width / 2 + 70);
    posY[i] = random(height / 2 - 10, height / 2 + 90);
    tamano[i] = random(10, 20);
    velocidad[i] = random(0.5, 1.4);
    transparencia[i] = random(80, 130);
    desfase[i] = random(TWO_PI);
  }

  // creo el diccionario anidado para usarlo en el código
  construirDiccionario();

  // cargo todos los QR una vez que la tabla ya está lista,tuve que cargarlos en el setup y no en el preload, ya que la tabla en la que están en el preload aún no esta cargada y acá si.
  for (let i = 0; i < tabla.getRowCount(); i++) {
    let nombreQR = tabla.getString(i, "qr").trim();
    if (nombreQR && !imgQR[nombreQR]) {
      imgQR[nombreQR] = loadImage("codigos/" + nombreQR);
    }
  }
}

function draw() {
  background("#F1E4DB");

  if (pantalla === "menu") {
    // muestro los controles del menú y oculto el iframe
    sliderCalorias.show();
    inputPersonas.show();
    dropdownSal.show();

    // centro y tamaño del caldero, relativos al tamaño de la ventana
    let centroX = width / 2;
    let centroY = height / 2 + height * 0.06;

    let escala = 0.33;
    let anchoOlla = width * escala;
    let altoOlla = anchoOlla * (img.height / img.width);

    // leo los valores actuales de los inputs
    let calorias = sliderCalorias.value();
    let nivelSal = dropdownSal.value();

    // convierto el número del slider en texto para buscarlo en el CSV
    if (calorias === 1) {
      nivelCalorias = "min";
    } else if (calorias === 2) {
      nivelCalorias = "med";
    } else {
      nivelCalorias = "max";
    }

    // busco la receta que coincide con proteína, calorías y momento
    recetaSeleccionada = datos(proteina, nivelCalorias, momento);

    // franja decorativa superior
    noStroke();
    fill("#4A0F18");
    rect(0, 0, width, height * 0.13);

    // título principal
    fill("#F4D27A");
    noStroke();
    textFont(quotes);
    textSize(width * 0.042);
    textAlign(CENTER, CENTER);
    text("ALQUIMIA CULINARIA", width / 2, height * 0.065);

    // subtítulo con instrucciones para el usuario
    textFont(lora);
    textSize(width * 0.013);
    fill("#4A0F18");
    text(
      "Elige proteína, sal, cantidad de personas, calorías y momento del día.\nEl caldero cambia su mezcla visual según tus decisiones.",
      width / 2,
      height * 0.18
    );

    // sección de proteínas (columna izquierda)
    let colIzq = width * 0.117;
    fill("#4A0F18");
    textSize(width * 0.014);
    text("1. Proteína", colIzq, height * 0.222);

    // listas paralelas con los nombres, colores y posiciones de cada opción de proteína
    let nombres = ["huevo", "pollo", "pescado", "cerdo", "res"];
    let colores = ["#F2C15A", "#E99AAA", "#B989A6", "#E6A07F", "#C7837F"];
    let posicionesY = [
      height * 0.305,
      height * 0.402,
      height * 0.5,
      height * 0.597,
      height * 0.694,
    ];

    // dibujo cada opción de proteína
    for (let i = 0; i < nombres.length; i++) {
      let x = colIzq;
      let y = posicionesY[i];

      // círculo exterior de cada opción
      noFill();
      stroke("#C49A3A");
      strokeWeight(2);
      ellipse(x, y, 62, 62);

      // si esta proteína está seleccionada, dibujo un brillo con su mismo color
      if (proteina === nombres[i]) {
        let c = color(colores[i]);
        noStroke();
        // tres capas concéntricas con opacidad creciente para simular un halo suave
        fill(red(c), green(c), blue(c), 30);
        ellipse(x, y, 90, 90);
        fill(red(c), green(c), blue(c), 45);
        ellipse(x, y, 74, 74);
        fill(red(c), green(c), blue(c), 60);
        ellipse(x, y, 62, 62);
      }

      // círculo interno de la proteína
      noStroke();
      fill(colores[i]);
      ellipse(x, y, 40, 40);

      // nombre de la proteína
      fill("#4A0F18");
      textSize(width * 0.011);
      text(nombres[i], x + 85, y);
    }

    // texto del dropdown de sal
    fill("#4A0F18");
    noStroke();
    textSize(width * 0.014);
    text("2. Nivel de sal", colIzq, height * 0.805);

    // etiquetas de la columna derecha
    let colDer = width * 0.815;
    textSize(width * 0.014);
    text("3. Cantidad de personas", colDer, height * 0.284);
    text("4. Calorías", colDer, height * 0.479);

    // etiquetas pequeñas debajo del slider para indicar cada nivel
    textSize(width * 0.01);
    fill("#7A3A2A");
    text("mín.", colDer - width * 0.085, height * 0.59);
    text("med.", colDer, height * 0.59);
    text("máx.", colDer + width * 0.085, height * 0.59);

    // botones del momento del día
    fill("#4A0F18");
    textSize(width * 0.014);
    text("5. Momento del día", colDer, height * 0.694);

    let momentos = ["desayuno", "almuerzo", "cena"];
    let posicionesXMomento = [width * 0.742, width * 0.815, width * 0.891];

    // dibujo los tres botones de momento del día
    for (let i = 0; i < momentos.length; i++) {
      // si este momento está seleccionado lo resalto con fondo amarillo y borde más grueso
      if (momento === momentos[i]) {
        fill("#F4D27A");
        stroke("#B88A2A");
        strokeWeight(3);
      } else {
        fill("#F7E8DF");
        stroke("#C49A3A");
        strokeWeight(2);
      }
      ellipse(posicionesXMomento[i], height * 0.778, 75, 55);

      noStroke();
      fill("#4A0F18");
      textSize(width * 0.009);
      text(momentos[i], posicionesXMomento[i], height * 0.778);
    }

    // dibujo las burbujas antes de la olla para que parezcan estar dentro
    dibujarBurbujas(centroX, centroY, anchoOlla, altoOlla, calorias, nivelSal);

    // dibujo la imagen de la olla encima de las burbujas
    image(img, centroX, centroY, anchoOlla, altoOlla);

    // botón para preparar receta
    stroke("#8B3A4A");
    strokeWeight(1.5);
    fill("#F4D27A");
    rect(width / 2 - 140, height * 0.875, 280, 50, 28);
    noStroke();
    rectMode(CORNER);

    // texto centrado dentro del botón
    fill("#4A0F18");
    noStroke();
    textSize(width * 0.015);
    textAlign(CENTER, CENTER);
    text("PREPARAR RECETA", width / 2, height * 0.875 + 23.5);
  } else if (pantalla === "receta") {
    dibujarPantallaReceta();
  }

  // cambio el cursor a manito cuando el mouse está sobre algún botón
  if (estaSobreBoton()) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function dibujarPantallaReceta() {
  // oculto los controles del menú porque no se necesitan en esta pantalla
  sliderCalorias.hide();
  inputPersonas.hide();
  dropdownSal.hide();

  background("#F4EFE3");
  background("#F1E4DB");

  // cada proteína tiene un color pastel asociado que se usa en los detalles de la receta
  let coloresPastel = {
    huevo: "#FFF8E7",
    pollo: "#FDE7EB",
    pescado: "#F3E6F5",
    cerdo: "#FCE9E2",
    res: "#F6E3E3",
  };

  // franja decorativa superior
  noStroke();
  fill("#4A0F18");
  rect(0, 0, width, height * 0.13);

  // título principal
  fill("#F4D27A");
  noStroke();
  textFont(quotes);
  textSize(width * 0.042);
  textAlign(CENTER, CENTER);
  text("TU RECETA", width / 2, height * 0.065);

  // texto explicativo debajo del título
  textFont(lora);
  textSize(width * 0.014);
  fill("#4A0F18");
  text(
    "Esta receta fue seleccionada según tus preferencias de proteína,\ncalorías y momento del día. ¡Buen provecho!",
    width / 2,
    height * 0.18
  );

  // dimensiones y posición de la tarjeta central donde va la información
  let tarjetaX = width * 0.21;
  let tarjetaY = height * 0.245;
  let tarjetaW = width * 0.58;
  let tarjetaH = height * 0.58;
  let radio = 22;

  // dibujo la tarjeta con borde dorado y esquinas redondeadas
  fill("#FFFDF5");
  stroke("#C49A3A");
  strokeWeight(2);
  rect(tarjetaX, tarjetaY, tarjetaW, tarjetaH, 24);

  // nombre de la receta dentro de la tarjeta
  noStroke();
  fill("#4A0F18");
  textFont(quotes);
  textSize(width * 0.032);

  if (recetaSeleccionada) {
    text(recetaSeleccionada.nombre, width / 2, tarjetaY + tarjetaH * 0.13);
  }

  // línea dorada bajo el nombre
  let yLineaNombre = tarjetaY + tarjetaH * 0.245;
  stroke("#C49A3A");
  strokeWeight(1);
  line(
    tarjetaX + tarjetaW * 0.12,
    yLineaNombre,
    tarjetaX + tarjetaW * 0.88,
    yLineaNombre
  );

  // línea divisoria vertical entre la sección de datos y la del código QR
  stroke("#C49A3A");
  strokeWeight(1);
  line(
    tarjetaX + tarjetaW * 0.52,
    tarjetaY + tarjetaH * 0.3,
    tarjetaX + tarjetaW * 0.52,
    tarjetaY + tarjetaH * 0.95
  );

  // punto de partida para la lista de datos seleccionados por el usuario
  let datosX = tarjetaX + tarjetaW * 0.07;
  let datosY = tarjetaY + tarjetaH * 0.345;
  let espacio = tarjetaH * 0.118;

  textFont(lora);
  textAlign(LEFT, CENTER);
  textSize(width * 0.012);
  fill("#4A0F18");

  // convierto el valor interno de calorías a un texto legible para el usuario
  let textoCalorias = "";
  if (nivelCalorias === "min") {
    textoCalorias = "Bajo";
  } else if (nivelCalorias === "med") {
    textoCalorias = "Medio";
  } else {
    textoCalorias = "Alto";
  }

  // leo los valores actuales del input de personas y del dropdown de sal
  let personas = inputPersonas.value();
  let sal = dropdownSal.value();

  // listas paralelas con los íconos, etiquetas y valores de cada dato a mostrar
  let iconos = ["🍽️", "🔥", "👥", "🧂", "⌛"];
  let etiquetas = [
    "PROTEÍNA",
    "CALORÍAS",
    "CANT. DE PERSONAS",
    "NIVEL DE SAL",
    "MOMENTO DEL DÍA",
  ];
  let valores = [proteina, textoCalorias, personas + " personas", sal, momento];

  // radio de los círculos de ícono, limitado para que no crezcan demasiado en pantallas grandes
  let circR = min(tarjetaW * 0.052, 28);

  for (let i = 0; i < 5; i++) {
    let iy = datosY + espacio * i;
    let ix = datosX + circR;

    // círculo de fondo del ícono con el color pastel de la proteína seleccionada
    fill(coloresPastel[proteina]);
    noStroke();
    ellipse(ix, iy, circR * 2, circR * 2);

    // emoji centrado dentro del círculo
    textSize(circR * 0.88);
    textAlign(CENTER, CENTER);
    textFont("Georgia");
    fill(0);
    text(iconos[i], ix, iy);

    // etiqueta pequeña en color vino sobre el valor principal
    fill("#7A3A2A");
    textFont(lora);
    textSize(width * 0.0072);
    textAlign(LEFT, CENTER);
    text(etiquetas[i], datosX + circR * 2 + 14, iy - 10);

    // valor principal más grande, justo debajo de la etiqueta
    fill("#4A0F18");
    textSize(width * 0.0148);
    text(valores[i], datosX + circR * 2 + 14, iy + 12);

    // línea separadora entre cada dato, excepto después del último
    if (i < 4) {
      stroke("#E6CFC0");
      strokeWeight(0.8);
      line(datosX, iy + 30, tarjetaX + tarjetaW * 0.5, iy + 30);
      noStroke();
    }
  }

  // posición y tamaño del código QR en la mitad derecha de la tarjeta
  let qrX = tarjetaX + tarjetaW * 0.74;
  let qrY = tarjetaY + tarjetaH * 0.61;
  let qrTam = min(width * 0.2, height * 0.28);

  // texto de instrucción encima del QR
  textAlign(CENTER, CENTER);
  textSize(width * 0.012);
  fill("#4A0F18");
  text(
    "ESCANEA PARA VER\nLA RECETA EN YOUTUBE",
    qrX,
    tarjetaY + tarjetaH * 0.4
  );

  // fondo con el color pastel de la proteína detrás del código QR
  fill(coloresPastel[proteina]);
  stroke("#C49A3A");
  strokeWeight(2);
  rectMode(CENTER);
  rect(qrX, qrY, qrTam + 30, qrTam + 30, 14);
  rectMode(CORNER);

  // muestro la imagen del QR correspondiente a la receta seleccionada
  if (recetaSeleccionada) {
    image(imgQR[recetaSeleccionada.qr], qrX, qrY, qrTam, qrTam);
  }

  // botón para volver al menú principal
  fill("#4A0F18");
  stroke("#C49A3A");
  strokeWeight(1.5);
  rect(width / 2 - 140, height * 0.875, 280, 50, 28);

  // texto centrado dentro del botón
  fill("#C49A3A");
  noStroke();
  textFont(lora);
  textSize(width * 0.015);
  textAlign(CENTER, CENTER);
  text("VOLVER", width / 2, height * 0.875 + 23.5);
}

function dibujarBurbujas(cx, cy, w, h, calorias, nivelSal) {
  // leo cuántas personas escribió el usuario
  let personas = int(inputPersonas.value());
  if (personas < 1) personas = 1;
  if (personas > 4) personas = 4;

  // la cantidad de personas controla la cantidad de burbujas visibles
  let cantidadVisible = 10 + personas * 15;

  // límites aproximados para que las burbujas salgan desde dentro de la olla
  let baseOlla = cy + h * 0.18;
  let bordeIzquierdo = cx - w * 0.18;
  let bordeDerecho = cx + w * 0.18;
  let alturaMaxima = cy - h * 0.58;

  let tamMin, tamMax, transMin, transMax;

  // las calorías controlan el tamaño de las burbujas
  transMin = 90;
  transMax = 150;
  if (calorias === 1) {
    tamMin = 10;
    tamMax = 20;
  } else if (calorias === 2) {
    tamMin = 20;
    tamMax = 30;
  } else {
    tamMin = 30;
    tamMax = 40;
  }

  let intensidadColor;

  // el nivel de sal controla qué tan intenso se ve el color
  if (nivelSal === "Bajo") {
    intensidadColor = 0.7;
  } else if (nivelSal === "Medio") {
    intensidadColor = 1.1;
  } else {
    intensidadColor = 1.7;
  }

  let vel;

  // el momento del día controla la velocidad de las burbujas
  if (momento === "desayuno") {
    vel = 2;
  } else if (momento === "almuerzo") {
    vel = 1.3;
  } else {
    vel = 0.5;
  }

  let colorProteina;

  // la proteína controla el color principal de las burbujas
  if (proteina === "huevo") {
    colorProteina = "#F2C15A";
  } else if (proteina === "pollo") {
    colorProteina = "#E99AAA";
  } else if (proteina === "pescado") {
    colorProteina = "#B989A6";
  } else if (proteina === "cerdo") {
    colorProteina = "#E6A07F";
  } else {
    colorProteina = "#C7837F";
  }

  // convierto el color hexadecimal en un color que p5 pueda separar en RGB
  let c = color(colorProteina);

  // dibujo y animo cada burbuja
  for (let i = 0; i < cantidadVisible; i++) {
    // la burbuja sube según su velocidad y el momento del día
    posY[i] -= velocidad[i] * vel;

    // movimiento lateral suave para que no suban totalmente rectas
    posX[i] += sin(frameCount * 0.03 + desfase[i]) * 0.5;

    // si la burbuja llega muy arriba, vuelve a salir desde abajo
    if (posY[i] < alturaMaxima) {
      posX[i] = random(bordeIzquierdo, bordeDerecho);
      posY[i] = random(baseOlla - 10, baseOlla + 25);
      tamano[i] = random(tamMin, tamMax);
      transparencia[i] = random(transMin, transMax);
    }

    noStroke();

    // primera capa de la burbuja, más grande y transparente
    fill(red(c), green(c), blue(c), transparencia[i] * 0.22 * intensidadColor);
    ellipse(posX[i], posY[i], tamano[i] * 2);

    // segunda capa para dar efecto acuarela
    fill(red(c), green(c), blue(c), transparencia[i] * 0.32 * intensidadColor);
    ellipse(posX[i] + 1, posY[i] - 1, tamano[i] * 1.3);

    // tercera capa más pequeña e intensa
    fill(red(c), green(c), blue(c), transparencia[i] * 0.42 * intensidadColor);
    ellipse(posX[i], posY[i], tamano[i] * 0.75);

    // brillo pequeño para que parezca burbuja
    fill(255, 255, 255, 120);
    ellipse(
      posX[i] - tamano[i] * 0.15,
      posY[i] - tamano[i] * 0.15,
      tamano[i] * 0.18
    );
  }
}

// función para reubicar los elementos HTML cuando cambia el tamaño
function posicionarElementosHTML() {
  let colDer = width * 0.815;
  let anchoControl = width * 0.16;

  // input de personas: centrado bajo su etiqueta
  inputPersonas.position(colDer - anchoControl / 2, height * 0.33);
  inputPersonas.size(anchoControl, 32);

  // slider de calorías: centrado bajo su etiqueta
  sliderCalorias.position(colDer - anchoControl / 2, height * 0.545);
  sliderCalorias.size(anchoControl);

  // dropdown de sal: columna izquierda
  dropdownSal.position(width * 0.075, height * 0.845);
  dropdownSal.size(width * 0.13, 32);
}

// esta función aplica el mismo estilo visual a los controles HTML
function diseñoHTML(elemento) {
  elemento.style("background", "#F7E8DF");
  elemento.style("color", "#4A0F18");
  elemento.style("font-family", "lora");
  elemento.style("font-size", "14px");
  elemento.style("cursor", "pointer");
  elemento.style("outline", "none");
  // estos cambios se le aplican a todos menos al slider
  if (elemento !== sliderCalorias) {
    elemento.style("text-align", "center");
    elemento.style("border", "2px solid #C49A3A");
    elemento.style("border-radius", "8px");
  }
}

// Diccionario anidado que tiene como llaves proteina, calorias y momento y como valor nombre de la receta y el qr de YouTube
function construirDiccionario() {
  recetas = {};
  for (let i = 0; i < tabla.getRowCount(); i++) {
    // leo cada columna de la fila actual
    let p = tabla.getString(i, "Proteina").trim();
    let c = tabla.getString(i, "Calorias").trim();
    let m = tabla.getString(i, "Momento").trim();
    let r = tabla.getString(i, "Receta").trim();
    let q = tabla.getString(i, "qr").trim();
    // si aún no existe el nivel de proteína o calorías en el diccionario, lo creo vacío
    if (!recetas[p]) recetas[p] = {};
    if (!recetas[p][c]) recetas[p][c] = {};
    // guardo el nombre de la receta y el archivo del QR en el nivel más profundo
    recetas[p][c][m] = { nombre: r, qr: q };
  }
}

// busca y devuelve la receta que coincide con las tres selecciones del usuario
function datos(selecProteina, selecCalorias, selecMomento) {
  if (
    recetas[selecProteina] &&
    recetas[selecProteina][selecCalorias] &&
    recetas[selecProteina][selecCalorias][selecMomento]
  ) {
    return recetas[selecProteina][selecCalorias][selecMomento];
  }
  // si no encuentra ninguna combinación válida devuelve null
  return null;
}

// revisa si el mouse está encima de algún botón interactivo de la pantalla actual
function estaSobreBoton() {
  if (pantalla === "menu") {
    let colIzq = width * 0.117;
    let posicionesY = [
      height * 0.305,
      height * 0.402,
      height * 0.5,
      height * 0.597,
      height * 0.694,
    ];
    // reviso si el mouse está cerca de algún círculo de proteína
    for (let i = 0; i < posicionesY.length; i++) {
      if (dist(mouseX, mouseY, colIzq, posicionesY[i]) < 35) return true;
    }

    let posicionesXMomento = [width * 0.742, width * 0.815, width * 0.891];
    // reviso si el mouse está cerca de algún botón de momento del día
    for (let i = 0; i < posicionesXMomento.length; i++) {
      if (dist(mouseX, mouseY, posicionesXMomento[i], height * 0.778) < 40)
        return true;
    }

    // reviso si el mouse está sobre el botón de preparar receta
    if (
      mouseX > width / 2 - 140 &&
      mouseX < width / 2 + 140 &&
      mouseY > height * 0.875 &&
      mouseY < height * 0.875 + 50
    )
      return true;
  }

  if (pantalla === "receta") {
    let botonX = width / 2 - 170;
    let botonY = height * 0.86;
    let botonW = 340;
    let botonH = 48;

    // reviso si el mouse está sobre el botón de volver
    if (
      mouseX > botonX &&
      mouseX < botonX + botonW &&
      mouseY > botonY &&
      mouseY < botonY + botonH
    ) {
      return true;
    }
  }

  return false;
}

function mousePressed() {
  if (pantalla === "menu") {
    let colIzq = width * 0.117;
    let posicionesY = [
      height * 0.305,
      height * 0.402,
      height * 0.5,
      height * 0.597,
      height * 0.694,
    ];
    let nombres = ["huevo", "pollo", "pescado", "cerdo", "res"];

    // reviso si el usuario hizo clic sobre alguna proteína
    for (let i = 0; i < nombres.length; i++) {
      if (dist(mouseX, mouseY, colIzq, posicionesY[i]) < 35) {
        proteina = nombres[i];
      }
    }

    // posiciones X de los botones de momento del día
    let posicionesXMomento = [width * 0.742, width * 0.815, width * 0.891];

    // actualizo el momento según el botón en el que hizo clic el usuario
    if (dist(mouseX, mouseY, posicionesXMomento[0], height * 0.778) < 40) {
      momento = "desayuno";
    }
    if (dist(mouseX, mouseY, posicionesXMomento[1], height * 0.778) < 40) {
      momento = "almuerzo";
    }
    if (dist(mouseX, mouseY, posicionesXMomento[2], height * 0.778) < 40) {
      momento = "cena";
    }

    // reviso si el usuario hizo clic en preparar receta
    if (
      mouseX > width / 2 - 140 &&
      mouseX < width / 2 + 140 &&
      mouseY > height * 0.875 &&
      mouseY < height * 0.875 + 50
    ) {
      recetaSeleccionada = datos(proteina, nivelCalorias, momento);
      // solo cambio de pantalla si la receta existe en el diccionario
      if (recetaSeleccionada) {
        pantalla = "receta";
      }
    }
  } else if (pantalla === "receta") {
    // si el usuario hace clic en volver, regreso al menú y restauro la alineación del texto
    if (
      mouseX > width / 2 - 140 &&
      mouseX < width / 2 + 140 &&
      mouseY > height * 0.875 &&
      mouseY < height * 0.875 + 50
    ) {
      pantalla = "menu";
      textAlign(CENTER, CENTER);
    }
  }
}

// ajusta el tamaño cuando cambia el tamaño de la pantalla
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // reposiciono los controles HTML al nuevo tamaño de ventana
  posicionarElementosHTML();
}
