
let img1, img2, img3;
let escenaActual = 0; 
// 0: No me olvides, 1: Acuarela Abstracta, 2: cielo azul

// Variables para tipografías
let fontBotones, fontContenido, fontTitulo;

// Textos
let tituloEscena1 = "No me Olvides"; 

// Variables para el efecto de memoria
let tiles = [];
let imgActual;

// Sliders
let sliderMemoria;   // 01 — cuanto se distorsiona la imagen
let sliderTiempo;    // 02 — tamano del tile
let sliderResonancia;// 03 — velocidad del movimiento
let sliderClaridad;  // 04 — opacidad de los tiles
let sliderPresencia; // 05 — radio de la zona de recuerdo

// Botones
let btnReiniciar;
let btnProgresion;
let btnColapso; // Declarar el botón de colapso globalmente

function preload() {
  // Cargar imágenes (asegúrate de que los nombres coincidan exactamente con tus archivos)
  img1 = loadImage("No me olvides.png");
  img2 = loadImage("Acuarela Abstracta.png");
  img3 = loadImage("cielo azul.png");
  
  // Cargar tipografías
  fontBotones = loadFont("Steelfish Rounded Bd.ttf");
  fontContenido = loadFont("SwirlsandCurls.ttf");
  fontTitulo = loadFont("Swirlvetica.ttf");
}

function setup() { 
  // Canvas de 600x400 como solicitaste
  let canvas = createCanvas(600, 400);
  canvas.parent("canvas-container"); // Para posicionarlo con CSS
  frameRate(24);
  
  imgActual = img1; // Empezamos con la primera imagen
    
  // --- BOTONES ---
  // Los botones se posicionan abajo en fila usando CSS (ver style.css)
  btnReiniciar = createButton("↺ Reiniciar memoria");
  btnReiniciar.parent("botones-container");
  btnReiniciar.mousePressed(reiniciarMemoria);
  
  btnProgresion = createButton("→ Simular progresion");
  btnProgresion.parent("botones-container");
  
  // BOTON 4 — Colapso de memoria (borde rojo, efecto dramatico)
  btnColapso = createButton("◈ Colapso de memoria");
  btnColapso.parent("botones-container"); // Aseguramos que esté en el contenedor de botones
  btnColapso.mousePressed(colapsoMemoria); // Asignar la función al evento de click
  btnColapso.addClass("btn-colapso"); // Añadimos la clase para el estilo CSS

  
  // --- SLIDERS ---
  // Los sliders se posicionan a la derecha usando CSS (ver style.css)
  
  // 01 — Memoria: controla la distorsion (0=sin distorsion, 100=maxima)
  sliderMemoria = createSlider(0, 20, 5);
  sliderMemoria.parent("slider1-container");

  // 02 — Tiempo: controla el tamano del tile
  sliderTiempo = createSlider(2, 60, 20); // Ajustado min a 2 para evitar cuelgues
  sliderTiempo.parent("slider2-container");

  // 03 — Resonancia: controla la velocidad del movimiento
  sliderResonancia = createSlider(1, 20, 5);
  sliderResonancia.parent("slider3-container");

  // 04 — Claridad: opacidad de los tiles (255=solido, 50=casi transparente)
  sliderClaridad = createSlider(50, 255, 200);
  sliderClaridad.parent("slider4-container");

  // 05 — Presencia: radio de la zona de recuerdo alrededor del mouse
  sliderPresencia = createSlider(10, 120, 40);
  sliderPresencia.parent("slider5-container");
  
  // Generar tiles iniciales
  generateTiles();
  actualizarTextosSliders(); // Inicializar los textos de los sliders
}

function draw() {
  background(10);

  // Obtener valores de los sliders
  let distorsion = sliderMemoria.value();
  let tamano = sliderTiempo.value(); // Usamos sliderTiempo para el tamaño del tile
  let opacidad = sliderClaridad.value();
  let radioRecuerdo = sliderPresencia.value();

  // Si el tamaño del tile cambió, regeneramos la grilla completa
  let columnas = floor(width / tamano);
  let filas = floor(height / tamano);
  if (tiles.length !== columnas * filas || (tiles.length > 0 && tiles[0].w !== tamano)) {
    generateTiles();
  }

  // Dibujar los tiles
  for (let t of tiles) {
    let d = dist(mouseX, mouseY, t.x, t.y);

    if (d < radioRecuerdo) {
      // ZONA DE RECUERDO: cerca del mouse la imagen se ve clara
      tint(255, 255); // Opacidad completa
      image(imgActual, t.x, t.y, t.w, t.h, t.sx, t.sy, t.sw, t.sh);
    } else {
      // ZONA DE INTERFERENCIA: los tiles se desplazan con ruido de Perlin
      let velocidad = sliderResonancia.value() * 0.001; 
      let n = noise(t.x * 0.02, t.y * 0.02, frameCount * velocidad);
      
      let escala = map(tamano, 2, 60, 0.5, 3.0);
      let offsetX = map(n, 0, 1, -distorsion, distorsion) * escala;
      let offsetY = map(n, 0, 1, -distorsion, distorsion) * escala;

      // Fallas aleatorias: 3% de los tiles no se dibujan
      if (random() < 0.03) continue;

      tint(255, opacidad); // Aplicar opacidad del slider
      image(
        imgActual,
        t.x + offsetX + t.offsetX,
        t.y + offsetY + t.offsetY,
        t.w,
        t.h,
        t.sx,
        t.sy,
        t.sw,
        t.sh
      );
    }
  }
  
  noTint(); // Restaurar tint para no afectar otras cosas

  // --- TEXTOS POR ESCENA ---
  if (escenaActual === 0) {
    // Escena 1: No me olvides
    fill(255);
    textAlign(RIGHT);
    textFont(fontTitulo);
    textSize(32);
    text(tituloEscena1, width - 20, 40);
    
    textAlign(LEFT);
    textFont(fontContenido);
    textSize(20);
  } else if (escenaActual === 1) {
    // Escena 2: Acuarela Abstracta
    fill(255);
    textAlign(CENTER);
    textFont(fontTitulo);
    textSize(28);
    text("Confusion", width/2, 40);
  } else if (escenaActual === 2) {
    // Escena 3: Cielo Azul
    fill(255);
    textAlign(CENTER);
    textFont(fontTitulo);
    textSize(28);
    text("Recuerdos", width/2, 40);
  }

  // Instrucciones en pantalla
  fill(255, 255, 255);
  textFont("sans-serif");
  textSize(10);
  textAlign(RIGHT);
  text("mouse: recordar | ENTER: barajar | R: reiniciar | Flecha Der: cambiar escena", width - 8, height - 8);
}

function generateTiles() {
  tiles = [];
  let size = sliderTiempo.value(); // Usamos sliderTiempo para el tamaño

  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      tiles.push({
        x: x,       
        y: y,       
        w: size,    
        h: size,    
        sx: x,      
        sy: y,      
        sw: size,   
        sh: size,   
        offsetX: 0, 
        offsetY: 0  
      });
    }
  }
}

function keyPressed() {
  // Flecha derecha: Cambiar de escena
  if (keyCode === RIGHT_ARROW) {
    escenaActual++;
    if (escenaActual > 2) {
      escenaActual = 0; // Volver a la primera escena
    }
    
    // Cambiar la imagen según la escena
    if (escenaActual === 0) imgActual = img1;
    else if (escenaActual === 1) imgActual = img2;
    else if (escenaActual === 2) imgActual = img3;
    
    // Actualizar textos en HTML para los sliders
    actualizarTextosSliders();
  }

  // ENTER: Barajar tiles
  if (keyCode === ENTER) { 
    let size = sliderTiempo.value();
    let cols = floor(width / size);
    let rows = floor(height / size);

    for (let t of tiles) {
      let randCol = floor(random(cols));
      let randRow = floor(random(rows));
      t.offsetX = (randCol * size) - t.x;
      t.offsetY = (randRow * size) - t.y;
    } 
  }
  
  // R: reinicia el barajado
  if (key === "r" || key === "R") { 
    reiniciarMemoria();
  }
}

function reiniciarMemoria() {
  for (let t of tiles) {
    t.offsetX = 0;
    t.offsetY = 0;
  }
}

// Función: Colapso de memoria
// Efecto dramático que distorsiona todos los tiles al máximo
function colapsoMemoria() {
  // Aumentar la distorsión al máximo
  sliderMemoria.value(20);
  
  // Reducir la opacidad para un efecto de desvanecimiento
  sliderClaridad.value(80);
  
  // Aumentar la velocidad del movimiento
  sliderResonancia.value(15);
  
  // Barajar todos los tiles de forma aleatoria
  let size = sliderTiempo.value();
  let cols = floor(width / size);
  let rows = floor(height / size);

  for (let t of tiles) {
    let randCol = floor(random(cols));
    let randRow = floor(random(rows));
    t.offsetX = (randCol * size) - t.x;
    t.offsetY = (randRow * size) - t.y;
  }
}

// Función para cambiar los textos encima de los sliders según la escena
function actualizarTextosSliders() {
  let textos = document.querySelectorAll(".slider-label");
  
  if (escenaActual === 0) {
    textos[0].innerText = "Memoria";
    textos[1].innerText = "Tiempo";
    textos[2].innerText = "Resonancia";
    textos[3].innerText = "Claridad";
    textos[4].innerText = "Presencia";
    
  } else if (escenaActual === 1) {
    textos[0].innerText = "Texto Escena 2 - Slider 1";
    textos[1].innerText = "Texto Escena 2 - Slider 2";
    textos[2].innerText = "Texto Escena 2 - Slider 3";
    textos[3].innerText = "Texto Escena 2 - Slider 4";
    textos[4].innerText = "Texto Escena 2 - Slider 5";
  } else if (escenaActual === 2) {
    textos[0].innerText = "Texto Escena 3 - Slider 1";
    textos[1].innerText = "Texto Escena 3 - Slider 2";
    textos[2].innerText = "Texto Escena 3 - Slider 3";
    textos[3].innerText = "Texto Escena 3 - Slider 4";
    textos[4].innerText = "Texto Escena 3 - Slider 5";
  }
}
