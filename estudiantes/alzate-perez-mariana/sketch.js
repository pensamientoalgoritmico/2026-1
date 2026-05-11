//Mariana Alzate
//proyecto final
//Style Me  - es un programa diseñado para usuarios indecisos a la hora de escogar su outfit del dia, que pasan minutos enfrente de su closet, y tambien para quienes quieren arriesgarse y generar outfits con combinaciones que nunca pensaron antes.

//En Style Me, subes tu propio closet, con tus prendas, y es completamente tu decision, si quieres generar un outfit completamente aleatorio, si ya sabes que prenda ponerte puedes mantenerla y cambiar el resto, y lo mejor es que puedes guardar tus outfits de la semana en tan solo minutos.

//Style Me, sera tu stylist personal

//Como referente principal esta la pelicula Clueless https://www.youtube.com/watch?v=XNDubWJU0aU
//Adicional, esta la estitca Y2K tomando sus colores y figuras

//En cuanto a la IA, la use para arreglar problemas que encontraba en el proceso, como que no me servian los hover, o como arreglar los botones para guaradar un outfit. Tambien para que me explicara a detalle como funcionabal herramientas que los referentes de p5 no explicaban a detalle, por ejemplo el como usar el preload. Y por ultimo en como cambiarle el estilo a un boton css.

// variables
// pantallas del programa "inicio", "closet" o "guardados"
let pantalla = "inicio";

// listas de fotos subidas por el usuario
let fotosTop = [];
let fotosBottom = [];
let fotosShoes = [];

//inidice de las fotos en cada seccion - indica que foto estas viendo
let indiceTop = 0;
let indiceBottom = 0;
let indiceShoe = 0;

//boton para bloquear una prenda
let lockTop = false;
let lockBottom = false;
let lockShoe = false;

//boton de instrucciones para subir las fotos
let mostrarInfo = false;
let btnInfo;

//input de fotos - los usuarios suben sus propias imagenes desde su computador
let inputTop;
let inputBottom;
let inputShoe;

//fotos predeterminadas, son puestas para que el usuario tenga una idea de como se den subir las fotos
let placeholderTop;
let placeholderBottom;
let placeholderShoe;

//solo se muestra el botón guardar si ya se generó un outfit
let outfitGenerado = false;

//input del texto, para que el usuario guarde su outfit como quiera
let inputTexto;
let botonGuardar;

// datos de los outfits guardados
//se guardan como= nombre del outfit + q prendas son
let datosGuardados = [];

//cuando el usuario le de click al outfit se veran los detalles
let outfitSeleccionado = -1;

//botones principales
let btnCloset; // botón de inicio → ir al closet
let btnGenerar; // botón para generar outfit aleatorio
let btnGuardados; // botón para ir a la pantalla de guardados
let btnVolver; // botón para volver desde guardados al closet

//flechas de cada seccion para que el usuario cambie entre prendas
let btnTopIzq;
let btnTopDer;
let btnBottomIzq;
let btnBottomDer;
let btnShoeIzq;
let btnShoeDer;

//botones de mantener o cambiar una prenda
let btnLockTop;
let btnLockBottom;
let btnLockShoe;

//estrellas decorativasd
let estrellasInicio = [];
let estrellasCloset = [];

//funcion preload, se ejecuta primero que todo
function preload() {
  //fotos de ejemplo (predeterminadas) para que el usuario tenga una idea de como se veria
  placeholderTop = loadImage("/assets/top.jpg");
  placeholderBottom = loadImage("/assets/jean.jpg");
  placeholderShoe = loadImage("/assets/tacones.jpg");
}

//function setup
function setup() {
  //crear el canva para que se adapte segun la pantalla
   // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");

  //generar estrellas decorativas
  generarEstrellas();

  //boton incial - de closet
  btnCloset = createButton("✦ CLOSET ✦");
  btnCloset.size(300, 70);
  estiloBoton(btnCloset);

  // cursor pointer cuando el mouse está encima
  btnCloset.style("cursor", "pointer");

  //cambiar el estilo del boton
  btnCloset.mouseOver(function () {
    btnCloset.style("background-color", "#F3BDDF");
  });

  btnCloset.mouseOut(function () {
    btnCloset.style("background-color", "#ff1493");
  });
  //click para cambiar de pantalla
  btnCloset.mousePressed(function() {
    pantalla = "closet";

    //mostrar inputs de imagen subida por el usuario
    inputTop.show();
    inputBottom.show();
    inputShoe.show();

    //ocultar boton de inicio y mostrar los demás
    btnCloset.hide();
    btnGenerar.show();
    btnInfo.show();
    btnGuardados.show();

    //mostrar flechas que cambian las prendas
    btnTopIzq.show();
    btnTopDer.show();
    btnBottomIzq.show();
    btnBottomDer.show();
    btnShoeIzq.show();
    btnShoeDer.show();

    //mostrar los botons de keep y swap
    btnLockTop.show();
    btnLockBottom.show();
    btnLockShoe.show();

    //el boton de guardar solo se muestra cuando se genera un outfit
    inputTexto.hide();
    botonGuardar.hide();
  });

  //boton de generar outfit
  btnGenerar = createButton("GENERAR OUTFIT");
  //estilo del boton
  btnGenerar.size(420, 70);
  estiloBoton(btnGenerar);
  btnGenerar.style("cursor", "pointer");

  btnGenerar.mouseOver(() => btnGenerar.style("background-color", "#F3BDDF"));
  btnGenerar.mouseOut(() => btnGenerar.style("background-color", "#ff1493"));

  btnGenerar.mousePressed(() => {
    //solo se genera si hay al menos una foto en cada seccion
    if (fotosTop.length && fotosBottom.length && fotosShoes.length) {
      //si esta bloqueada, no cambia el indice
      if (!lockTop) indiceTop = floor(random(fotosTop.length));
      if (!lockBottom) indiceBottom = floor(random(fotosBottom.length));
      if (!lockShoe) indiceShoe = floor(random(fotosShoes.length));

      //una vez generado el outfit aparece el boton de guardar outfit
      outfitGenerado = true;
      inputTexto.show();
      botonGuardar.show();
    }
  });

  btnGenerar.hide(); //oculto al inicio

  //boton de instrucciones
  btnInfo = createButton("ⓘ instrucciones");
  btnInfo.size(600, 45);
  btnInfo.style("background-color", "#00c853");
  btnInfo.style("color", "#000");
  btnInfo.style("border", "none");
  btnInfo.style("border-radius", "20px");
  btnInfo.style("font-size", "16px");
  btnInfo.style("cursor", "pointer"); //cursor cambia al pasar el mouse

  btnInfo.mousePressed(() => {
    mostrarInfo = !mostrarInfo; // alterna entre mostrar y ocultar
  });

  btnInfo.hide();

  //input de texto solo aparece cuando se genera el outfit
  inputTexto = createInput();
  inputTexto.attribute("placeholder", "Nombre del outfit...");
  //stilos del boton
  inputTexto.size(200, 35);
  inputTexto.style("border-radius", "10px");
  inputTexto.style("border", "2px solid #ff1493");
  inputTexto.style("background", "#000");
  inputTexto.style("color", "#fff");
  inputTexto.style("padding", "0 10px");
  inputTexto.style("font-size", "14px");

  //boton de guaradar y sus estilos
  botonGuardar = createButton("💾 GUARDAR OUTFIT");
  botonGuardar.size(200, 40);
  botonGuardar.style("background-color", "#ff1493");
  botonGuardar.style("color", "#000");
  botonGuardar.style("border", "none");
  botonGuardar.style("border-radius", "20px");
  botonGuardar.style("font-size", "15px");
  botonGuardar.style("cursor", "pointer"); //cursor cambia al pasar el mouse

  botonGuardar.mouseOver(() =>
    botonGuardar.style("background-color", "#F3BDDF")
  );
  botonGuardar.mouseOut(() =>
    botonGuardar.style("background-color", "#ff1493")
  );

  botonGuardar.mousePressed(guardarDato);

  //Ocultos al inicio (aparecen en closet)
  inputTexto.hide();
  botonGuardar.hide();

  //boton de ver los oufits guardados, es una pantalla nueva
  btnGuardados = createButton("🧥 MIS OUTFITS");
  //stilos del boton
  btnGuardados.size(200, 50);
  btnGuardados.style("background-color", "#222");
  btnGuardados.style("color", "#ff1493");
  btnGuardados.style("border", "2px solid #ff1493");
  btnGuardados.style("border-radius", "20px");
  btnGuardados.style("font-size", "16px");
  btnGuardados.style("cursor", "pointer");

  btnGuardados.mouseOver(() =>
    btnGuardados.style("background-color", "#1a001a")
  );
  btnGuardados.mouseOut(() => btnGuardados.style("background-color", "#222"));

  btnGuardados.mousePressed(() => {
    //al entrar a la pantalla de guardados, ocultar todo lo del closet
    pantalla = "guardados";
    outfitSeleccionado = -1;

    inputTop.hide();
    inputBottom.hide();
    inputShoe.hide();
    btnGenerar.hide();
    btnInfo.hide();
    btnGuardados.hide();
    btnTopIzq.hide();
    btnTopDer.hide();
    btnBottomIzq.hide();
    btnBottomDer.hide();
    btnShoeIzq.hide();
    btnShoeDer.hide();
    btnLockTop.hide();
    btnLockBottom.hide();
    btnLockShoe.hide();
    inputTexto.hide();
    botonGuardar.hide();

    btnVolver.show(); //mostrar boton de volver al closet
  });

  btnGuardados.hide();

  //boton de volver, para pasar de outfits guardados a closet
  btnVolver = createButton("← VOLVER AL CLOSET");
  //stilo del boton
  btnVolver.size(220, 50);
  btnVolver.style("background-color", "#ff1493");
  btnVolver.style("color", "#000");
  btnVolver.style("border", "none");
  btnVolver.style("border-radius", "20px");
  btnVolver.style("font-size", "15px");
  btnVolver.style("cursor", "pointer");

  btnVolver.mouseOver(() => btnVolver.style("background-color", "#F3BDDF"));
  btnVolver.mouseOut(() => btnVolver.style("background-color", "#ff1493"));

  btnVolver.mousePressed(() => {
    //volver al closet y mostrar sus elementos
    pantalla = "closet";
    btnVolver.hide();

    inputTop.show();
    inputBottom.show();
    inputShoe.show();
    btnGenerar.show();
    btnInfo.show();
    btnGuardados.show();
    btnTopIzq.show();
    btnTopDer.show();
    btnBottomIzq.show();
    btnBottomDer.show();
    btnShoeIzq.show();
    btnShoeDer.show();
    btnLockTop.show();
    btnLockBottom.show();
    btnLockShoe.show();

    //solo mostrar guardar si ya había un outfit generado
    if (outfitGenerado) {
      inputTexto.show();
      botonGuardar.show();
    }
  });

  btnVolver.hide();

  //flechas para cambiar entre prendas para cada categoria
  function crearFlecha(txt, callback) {
    let b = createButton(txt);
    b.size(50, 50);
    b.style("background-color", "#000");
    b.style("color", "#ff1493");
    b.style("border", "2px solid #ff1493");
    b.style("border-radius", "10px");
    b.style("cursor", "pointer"); // cursor cambia al pasar el mouse
    b.style("font-size", "20px");

    b.mouseOver(() => b.style("background-color", "#F1BDDE66"));
    b.mouseOut(() => b.style("background-color", "#000"));

    b.mousePressed(callback);
    b.hide();
    return b;
  }

  //flechas del top
  btnTopIzq = crearFlecha("◀", () => {
    if (indiceTop > 0) indiceTop--;
  });
  btnTopDer = crearFlecha("▶", () => {
    if (indiceTop < fotosTop.length - 1) indiceTop++;
  });

  //flechas de bottoms
  btnBottomIzq = crearFlecha("◀", () => {
    if (indiceBottom > 0) indiceBottom--;
  });
  btnBottomDer = crearFlecha("▶", () => {
    if (indiceBottom < fotosBottom.length - 1) indiceBottom++;
  });

  //flechas de zapatos
  btnShoeIzq = crearFlecha("◀", () => {
    if (indiceShoe > 0) indiceShoe--;
  });
  btnShoeDer = crearFlecha("▶", () => {
    if (indiceShoe < fotosShoes.length - 1) indiceShoe++;
  });

  //botones para cambiar o mantener una prenda
  function crearLock(callback, getState) {
    let b = createButton("CAMBIAR");
    //estilo del boton
    b.size(90, 40);
    b.style("border-radius", "20px");
    b.style("border", "2px solid #ff1493");
    b.style("cursor", "pointer"); // cursor cambia al pasar el mouse

    b.mousePressed(() => {
      callback(); // alterna el lock
      actualizarEstiloLock(b, getState()); //
    });

    b.hide();
    return b;
  }

  //botones lock para cada sección
  btnLockTop = crearLock(
    () => (lockTop = !lockTop),
    () => lockTop
  );
  btnLockBottom = crearLock(
    () => (lockBottom = !lockBottom),
    () => lockBottom
  );
  btnLockShoe = crearLock(
    () => (lockShoe = !lockShoe),
    () => lockShoe
  );

  //inputs de imagen para el usuario
  inputTop = createFileInput(handleTop);
  inputBottom = createFileInput(handleBottom);
  inputShoe = createFileInput(handleShoe);
  
  inputTop.addClass("input-archivo");
inputBottom.addClass("input-archivo");
inputShoe.addClass("input-archivo");

 //arreglo para los inputs
  [inputTop, inputBottom, inputShoe].forEach((inp) => {
    inp.style("color", "#fff");
    inp.style("font-size", "12px");
    inp.style("cursor", "pointer");
  });

  inputTop.hide();
  inputBottom.hide();
  inputShoe.hide();
}

//boton que cambia de cambiar a mantener
function actualizarEstiloLock(b, activo) {
  if (activo) {
    //si esta bloqueado, se va a mostrar mantener en rosado
    b.html("MANTENER");
    b.style("background", "linear-gradient(90deg, #ff1493, #ff69b4)");
    b.style("color", "#000");
  } else {
    //de lo contrario, si esta debloqueado, aparecera cambiar en negro
    b.html("CAMBIAR");
    b.style("background", "#000");
    b.style("color", "#ff1493");
  }
}

//function draw - todo lo visual, las 3 pantallas
function draw() {
  if (pantalla === "inicio") dibujarInicio();
  if (pantalla === "closet") dibujarCloset();
  if (pantalla === "guardados") dibujarGuardados();
}

//estilo de los botones
function estiloBoton(b) {
  b.style("background-color", "#ff1493");
  b.style("color", "#000");
  b.style("font-size", "22px");
  b.style("border-radius", "25px");
  b.style("border", "none");
  b.style("cursor", "pointer");
}

//funcion de generar estrellas, para decoracion
function generarEstrellas() {

  // Estrellas de pantalla de inicio 
  let posicionesInicio = [
    { x: 100, y: 80, tam: 30, col: [255, 255, 255] },
    { x: 1700, y: 600, tam: 25, col: [255, 20, 147] },
    { x: 200, y: 800, tam: 20, col: [255, 255, 0] },
    { x: 300, y: 300, tam: 35, col: [0, 255, 100] },
    { x: 960, y: 150, tam: 15, col: [255, 255, 255] },
    { x: 400, y: 500, tam: 12, col: [255, 20, 147] },
    { x: 1500, y: 400, tam: 18, col: [255, 255, 0] },
    { x: 1800, y: 200, tam: 22, col: [0, 255, 200] },
    { x: 700, y: 900, tam: 14, col: [255, 100, 200] },
    { x: 1300, y: 100, tam: 28, col: [255, 255, 255] },
    { x: 50, y: 500, tam: 16, col: [255, 20, 147] },
    { x: 1850, y: 750, tam: 20, col: [255, 255, 0] },
  ];

  for (let d of posicionesInicio) {
    estrellasInicio.push({
      x: d.x,
      y: d.y,
      tam: d.tam,
      col: d.col,
    });
  }

  // Estrellas de pantalla de closet
  let posicionesCloset = [
    { x: 60, y: 60, tam: 14, col: [255, 20, 147] },
    { x: 1860, y: 80, tam: 18, col: [255, 255, 0] },
    { x: 90, y: 900, tam: 12, col: [255, 255, 255] },
    { x: 1820, y: 950, tam: 16, col: [255, 20, 147] },
    { x: 950, y: 50, tam: 10, col: [0, 255, 150] },
    { x: 1700, y: 300, tam: 14, col: [255, 255, 0] },
    { x: 120, y: 400, tam: 11, col: [255, 100, 200] },
    { x: 1750, y: 700, tam: 13, col: [255, 255, 255] },
    { x: 500, y: 980, tam: 10, col: [255, 20, 147] },
    { x: 1400, y: 980, tam: 12, col: [255, 255, 0] },
  ];

  for (let d of posicionesCloset) {
    estrellasCloset.push({
      x: d.x,
      y: d.y,
      tam: d.tam,
      col: d.col,
    });
  }
}

//pantalla de inicio
function dibujarInicio() {
  background(0);

  let centroY = height / 2;

 //dibujar estrellas en la pantalla de inicio
  for (let e of estrellasInicio) {

  let col = color(e.col[0], e.col[1], e.col[2], 200);

  dibujarEstrellaDecoY2K(
    e.x,
    e.y,
    e.tam,
    col
  );
}

  //textos de bienvenida
  textAlign(CENTER, CENTER);
  textFont("monospace");

  textSize(128);
  fill(255);
  text("Style", width / 2, centroY - 80);

  fill(255, 20, 147);
  text("Me", width / 2, centroY + 40);

  textSize(20);
  fill(150);
  text(
    "tu closet virtual - sube tu ropa - genera outfits",
    width / 2,
    centroY + 140
  );

  //boton de closet
  btnCloset.position(width / 2 - 150, centroY + 220);
}

//function dibujar closet
function dibujarCloset() {
  background(0);

  let centroY = height / 2;

  //medidas de la caja de la imagen
  let boxW = 220;
  let boxH = 280;
  let separacion = 350;
  let offsetFlecha = boxW / 2 + 50;

  //posicion horizontal de cada iamgen
  let c1 = width / 2 - separacion; // TOPS
  let c2 = width / 2; // BOTTOMS
  let c3 = width / 2 + separacion; // SHOES

  //dibujar estrellas del closet
 for (let e of estrellasCloset) {

  let col = color(e.col[0], e.col[1], e.col[2], 180);

  dibujarEstrellaDecoY2K(
    e.x,
    e.y,
    e.tam,
    col
  );
}

  textAlign(CENTER);
  textFont("monospace");

  //titulo
  fill(255, 20, 147);
  textSize(42);
  text("STYLE ME — MI CLOSET", width / 2, centroY - 320);

  //linea debajo del titulo
  stroke(255, 20, 147);
  line(width / 2 - 300, centroY - 290, width / 2 + 300, centroY - 290);
  noStroke();

  //posicion del boton de instrucciones
  btnInfo.position(width / 2 - 300, centroY - 260);

  //posicion del boton de mis outfits
  btnGuardados.position(width - 220, 20);

  //funcion para dibujar columna
  function dibujarColumna(titulo, x, fotos, indice, placeholder) {
    //titulo de la columna
    fill(255);
    textSize(24);
    text(titulo, x, centroY - 180);

    //caja donde se muestra la imagen
    stroke(255, 20, 147);
    fill(0);
    rect(x - boxW / 2, centroY - 140, boxW, boxH, 20);
    noStroke();

    if (fotos.length > 0) {
      //si el usuario ya subio fotos, mostrar la foto actual
      image(
        fotos[indice],
        x - boxW / 2 + 5,
        centroY - 135,
        boxW - 10,
        boxH - 10
      );
    } else {
      //si no hay fotos subidad, mostrar las imagenes predeterminadas
      //use la herramienta tint para pintar la imagen y quede mas opaca
      tint(150, 150, 150, 180);
      image(placeholder, x - boxW / 2 + 5, centroY - 135, boxW - 10, boxH - 10);
      noTint(); //quitamos el tint para no afectar otros dibujos

      // Texto indicando que es un ejemplo
      fill(255, 20, 147);
      textSize(11);
      text("↑ foto de ejemplo", x, centroY + 130);
    }
  }

  // Dibujamos las tres columnas con sus respectivos placeholders
  dibujarColumna("TOPS", c1, fotosTop, indiceTop, placeholderTop);
  dibujarColumna("BOTTOMS", c2, fotosBottom, indiceBottom, placeholderBottom);
  dibujarColumna("ZAPATOS", c3, fotosShoes, indiceShoe, placeholderShoe);

  //poner el cambiar o mantener debajo de cada caja
  btnLockTop.position(c1 - 45, centroY + 145);
  btnLockBottom.position(c2 - 45, centroY + 145);
  btnLockShoe.position(c3 - 45, centroY + 145);

  actualizarEstiloLock(btnLockTop, lockTop);
  actualizarEstiloLock(btnLockBottom, lockBottom);
  actualizarEstiloLock(btnLockShoe, lockShoe);

  //poner los inputs para que el usuario suba sus fotos debajo de los botones de cambiar
  inputTop.position(c1 - 60, centroY + 195);
  inputBottom.position(c2 - 60, centroY + 195);
  inputShoe.position(c3 - 60, centroY + 195);

  //flechas al lado de cada seccion
  btnTopIzq.position(c1 - offsetFlecha, centroY);
  btnTopDer.position(c1 + offsetFlecha - 50, centroY);

  btnBottomIzq.position(c2 - offsetFlecha, centroY);
  btnBottomDer.position(c2 + offsetFlecha - 50, centroY);

  btnShoeIzq.position(c3 - offsetFlecha, centroY);
  btnShoeDer.position(c3 + offsetFlecha - 50, centroY);

  //contador de prendas de cada seccion
  fill(255, 255, 0);
  textSize(16);
  text(fotosTop.length + " tops", c1, centroY + 255);
  text(fotosBottom.length + " bottoms", c2, centroY + 255);
  text(fotosShoes.length + " zapatos", c3, centroY + 255);

  //boton de generar
  btnGenerar.position(width / 2 - 210, centroY + 290);

  //input de texto y boton de guardar
  // Aparecen DEBAJO del botón generar, solo cuando outfitGenerado = true
  if (outfitGenerado) {
    inputTexto.position(width / 2 - 115, centroY + 375);
    botonGuardar.position(width / 2 - 100, centroY + 420);
  }

  //cuadrado como un aviso para las instrucciones
  if (mostrarInfo) {
    fill(0, 0, 0, 210);
     stroke(255, 20, 147);
    rect(width / 2 - 260, centroY - 220, 520, 80, 20);
  

    fill(255);
    textSize(15);
    noStroke();
    text(
      "Recuerda subir tus imagenes con buena calidad\n" +
        "y en fondo blanco\n",
      width / 2,
      centroY - 165
    );
  }
}

//function para los outfits guardados
function dibujarGuardados() {
  background(0);

  textFont("monospace");
  textAlign(CENTER);

  //titulo
  fill(255, 20, 147);
  textSize(40);
  text("MY SAVED OUTFITS", width / 2, 80);

  stroke(255, 20, 147);
  line(width / 2 - 280, 100, width / 2 + 280, 100);
  noStroke();

  //poner el boton de volber
  btnVolver.position(30, 20);

  //cuadrado principal de los outfits guardados
  let cuadroX = width / 2 - 350;
  let cuadroY = 130;
  let cuadroW = 700;
  let cuadroH = height - 200;

  // Fondo del cuadro
  stroke(255, 20, 147);
  strokeWeight(2);
  fill(10, 0, 10);
  rect(cuadroX, cuadroY, cuadroW, cuadroH, 20);
  noStroke();

  //lista de outfits
  if (datosGuardados.length === 0) {
    // Si no hay outfits guardados, mostrar mensaje
    fill(100);
    textSize(18);
    text(
      "No tienes outfits guardados aún.\nGenera uno y guárdalo desde el closet.",
      width / 2,
      cuadroY + 80
    );
  } else {
    for (let i = 0; i < datosGuardados.length; i++) {
      let d = datosGuardados[i];
      let itemY = cuadroY + 50 + i * 60; // posicion vertical de cada item

      // Detectar si el mouse está encima de este item para resaltarlo
      let encima =
        mouseX > cuadroX + 20 &&
        mouseX < cuadroX + cuadroW - 20 &&
        mouseY > itemY - 20 &&
        mouseY < itemY + 30;

      // Fondo del item (resaltado si el mouse está encima)
      if (encima) {
        fill(255, 20, 147, 60); // resaltadolo en rosado
        cursor(HAND); // cambiar cursor a mano cuando está encima
      } else {
        fill(30, 0, 20);
        cursor(ARROW);
      }

      // Caja del item
      noStroke();
      rect(cuadroX + 20, itemY - 22, cuadroW - 40, 50, 12);

      //numero del outfit
      fill(255, 20, 147);
      textAlign(LEFT);
      textSize(16);
      text("#" + (i + 1), cuadroX + 35, itemY + 5);

      // Nombre del outfit
      fill(255);
      textSize(18);
      text(d.nombre, cuadroX + 75, itemY + 5);

      //click para ver los detalles
      fill(150);
      textAlign(RIGHT);
      textSize(12);
      text("click para ver →", cuadroX + cuadroW - 35, itemY + 5);

      textAlign(CENTER);
    }
  }

  //panel que detalla el outfit
  if (outfitSeleccionado >= 0 && outfitSeleccionado < datosGuardados.length) {
    let d = datosGuardados[outfitSeleccionado];

    // Posición del panel de detalle (a la derecha del cuadro)
    let panelX = width / 2 + 380;
    let panelY = 130;
    let panelW = 300;
    let panelH = 220;

    // Fondo del panel
    stroke(255, 20, 147);
    strokeWeight(2);
    fill(10, 0, 10);
    rect(panelX, panelY, panelW, panelH, 20);
    noStroke();

    // Contenido del panel
    fill(255, 20, 147);
    textSize(16);
    text("DETALLE DEL OUTFIT", panelX + panelW / 2, panelY + 30);

    fill(255);
    textSize(22);
    text(d.nombre, panelX + panelW / 2, panelY + 65);

    // Mostrar los indices de cada prenda
    fill(255, 255, 0);
    textSize(15);
    text("Top #" + (d.top + 1), panelX + panelW / 2, panelY + 125);
    text("Bottom #" + (d.bottom + 1), panelX + panelW / 2, panelY + 150);
    text("Zapatos #" + (d.shoe + 1), panelX + panelW / 2, panelY + 175);
  }
}



// Agrega la foto al arreglo de tops
function handleTop(file) {
  if (file.type === "image") {
    fotosTop.push(loadImage(file.data));
    // Al subir foto, ir a la última (la recién agregada)
    indiceTop = fotosTop.length - 1;
  }
}

// Agrega la foto al arreglo de bottoms
function handleBottom(file) {
  if (file.type === "image") {
    fotosBottom.push(loadImage(file.data));
    indiceBottom = fotosBottom.length - 1;
  }
}

// Agrega la foto al arreglo de shoes
function handleShoe(file) {
  if (file.type === "image") {
    fotosShoes.push(loadImage(file.data));
    indiceShoe = fotosShoes.length - 1;
  }
}

// function guardar datos
function guardarDato() {
  let nombre = inputTexto.value();

  // Solo guarda si el nombre no está vacío
  if (nombre !== "") {
    // Guardamos un objeto con el nombre y los indices actuales de cada prenda
    datosGuardados.push({
      nombre: nombre,
      top: indiceTop,
      bottom: indiceBottom,
      shoe: indiceShoe,
    });

    console.log("Outfit guardado:", datosGuardados);

    inputTexto.value("");
  }
}



//funcion para dibujar las estrellas
function dibujarEstrellaDecoY2K(x, y, tam, col) {
  fill(col);
  noStroke();

  // Una estrella Y2K de 4 puntas se dibuja como un polígono con 8 vértices:
  // 4 puntas largas (arriba, derecha, abajo, izquierda)
  // y 4 vértices cortos en diagonal (las "entradas" entre punta y punta)
  beginShape();
  vertex(x, y - tam); // punta arriba
  vertex(x + tam * 0.2, y - tam * 0.2); // diagonal superior derecha
  vertex(x + tam, y); // punta derecha
  vertex(x + tam * 0.2, y + tam * 0.2); // diagonal inferior derecha
  vertex(x, y + tam); // punta abajo
  vertex(x - tam * 0.2, y + tam * 0.2); // diagonal inferior izquierda
  vertex(x - tam, y); // punta izquierda
  vertex(x - tam * 0.2, y - tam * 0.2); // diagonal superior izquierda
  endShape(CLOSE);
}

//Ajustar el tamaño cuando cambia el tamaño de la pantalla
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//function mousepressed para que funcione cada vez q se presiona con el mouse
function mousePressed() {
  if (pantalla !== "guardados") return; // solo activo en pantalla guardados

  let cuadroX = width / 2 - 350;
  let cuadroY = 130;
  let cuadroW = 700;

  for (let i = 0; i < datosGuardados.length; i++) {
    let itemY = cuadroY + 50 + i * 60;

    // Verificar si el click fue dentro del espacio
    if (
      mouseX > cuadroX + 20 &&
      mouseX < cuadroX + cuadroW - 20 &&
      mouseY > itemY - 22 &&
      mouseY < itemY + 28
    ) {
      // Si ya estaba seleccionado, deseleccionar
      if (outfitSeleccionado === i) {
        outfitSeleccionado = -1;
      } else {
        outfitSeleccionado = i;
      }
    }
  }
}
