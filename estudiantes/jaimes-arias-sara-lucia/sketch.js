//Entrega Final
//Sara Jaimes - 202420565
// Paws & Posters
//Es un generador dinámico que transforma datos de perros en adopción en piezas gráficas únicas mediante diseño. El sistema automatiza tipografías, slogans y estilos editoriales según la personalidad del perrito, permitiendo exportar posters personalizados en PNG para ayudar en la comunicación de los refugios y de las personas quienes son dueñas de estos refugios.
//Se utilizó la IA para tener exactitud en los cálculos de coordenadas, los valores rgb de la paleta de color utilizados y ciertas correcciones de errores de sintaxis en el código.
// Probado en 2 personas: 
// El usuario 1 entendió rápidamente la lógica de personalización y destacó que el sistema genera resultados visualmente distintos.
//El usuario 2 comentó que el botón de descarga hacía sentir el programa más “real” y útil para refugios o publicaciones de adopción.

//inicio de codigo

// variables inputs - globales
let inputNombre;
let botonGenerar;
let sliderTamano;
let botonDescargar; 
let cnv;

// variables fonts
let fontTitulo, fontTexto;
let fontEdad0, fontEdad1, fontEdad2, fontEdad3;

// variables estado - controlan que ha elegido el usuario y -1 significa no seleccionado
let resultadoListo = false;
let edadSeleccionada = -1; // controla la tipografia
let sexoSeleccionado = -1;  // controla el color de fondo
let moodSeleccionado = -1;  // controla el slogan y el icono

// datos para las listas de iteracion y etiquetas
let edades = ["Cachorro", "Adolescente", "Adulto", "Senior"];
let sexos = ["Macho", "Hembra"];
let moods = ["Tierno", "Protector", "Energético", "Tranquilo"];
let iconosFijos = []; 

// preload - carga de fonts
function preload() {
  
// cargas de fuentes para el titulo y los textos de todo el programa 
  fontTitulo = loadFont("assets/Titulo.ttf");
  fontTexto = loadFont("assets/Texto.ttf");
  
// cargas de fuentes especficas para la variable de edad 
  fontEdad0 = loadFont("assets/Edad0.ttf"); 
  fontEdad1 = loadFont("assets/Edad1.ttf");
  fontEdad2 = loadFont("assets/Edad2.ttf");
  fontEdad3 = loadFont("assets/Edad3.ttf");
}

// setup - construccion de la interfaz
function setup() {
  cnv = createCanvas(600, 600)
  cnv.parent("canvasContainer");
  background(251, 240, 226); // crema papel de fondo
  actualizarPosicionElementos();
 }

function actualizarPosicionElementos() {
  let x = cnv.position().x;
  let y = cnv.position().y;
  
// caja de texto - input de nombre  
  inputNombre = createInput("");
  inputNombre.position(x + 120, y + 460); 
  inputNombre.size(130);

// slider de tamaño - permite cambiar la composición editorial del poster entre distintos formatos 
  sliderTamano = createSlider(0, 2, 1);
  sliderTamano.position(x + 112,y + 562);
  sliderTamano.style('width', '200px');
  sliderTamano.style('z-index', '999'); //poner el slider en la capa de más arriba de todas
  sliderTamano.style('cursor', 'pointer');

// boton generar
  botonGenerar = createButton("GENERAR");
  botonGenerar.position(x + 450,y + 550);
  botonGenerar.size(80, 30);
  botonGenerar.style('z-index', '1000');
  botonGenerar.style('background-color', 'rgb(255,255,197)');
  botonGenerar.style('border', '1px solid black');
  botonGenerar.style('border-radius', '8px');
  botonGenerar.style('cursor', 'pointer');
  botonGenerar.style('font-family', 'titulo'); 
  botonGenerar.style('font-size', '12px');
  
// eventos del boton
  botonGenerar.mousePressed(generarResultado);
  
// efecto cuando el mouse entra al boton
  botonGenerar.mouseOver(function() {
    botonGenerar.style('background-color', 'rgb(255, 230, 150)'); 
  });
  
// efecto cuando el mouse sale del boton
  botonGenerar.mouseOut(function() {
    botonGenerar.style('background-color', 'rgb(255, 255, 197)'); 
  });
  
// boton descargar
  botonDescargar = createButton("DESCARGAR");
  botonDescargar.position(x + 450,y + 465); 
  botonDescargar.size(90, 30);
  botonDescargar.style('background-color', 'rgb(255,230,150)');
  botonDescargar.style('border', '1px solid black');
  botonDescargar.style('border-radius', '8px');
  botonDescargar.style('cursor', 'pointer');
  botonDescargar.style('font-family', 'Titulo'); 
  botonDescargar.style('font-size', '12px');
  
// eventos del boton
  botonDescargar.mousePressed(() => {
    if (resultadoListo) {
      saveCanvas('mi_poster_canino', 'png');
    } else {
      alert("Primero debes generar un póster para poder descargarlo.");
    }
  });

// efecto cuando el mouse entra al boton
  botonDescargar.mouseOver(() => {
  botonDescargar.style('background-color', 'rgb(255, 255, 197)'); 
  });
  
// efecto cuando el mouse sale del boton
  botonDescargar.mouseOut(() => { 
  botonDescargar.style('background-color', 'rgb(255, 230, 150)'); 
  });
}

//draw - bucle principal del dibujo
function draw() {
  background(251, 240, 226); // color crema papel de fondo
  
  // titulo del programa con fonfo azul
  fill(179, 235, 242); 
  rect(0,0,600,40);
  fill(0);
  textFont(fontTitulo);
  textAlign(CENTER);
  textSize(25);
  text("PAWS & POSTERS", width/2, 30);
  
// variable de sexo - logica de color segun fondo
  if (sexoSeleccionado == 0) {
    fill(191, 215, 234); // azul - macho
  } else if (sexoSeleccionado == 1) {
    fill(255, 210, 230); // rosa - hembra
  } else {
    fill(255); // blanco si no hay seleccion
  }
  
  noStroke();
  rect(80, 55, 440, 380, 15); // lienzo del poster
// instrucciones en el panel de resultado, despues se quita
  if (!resultadoListo) {
    fill(150);
    textFont(fontTexto);
    textSize(16);
    textAlign(CENTER);
    text("¡Completa los datos del perrito, elige un estilo y haz clic en GENERAR para crear un póster descargable!", 100, 240,400); //corta la linea para que quepa en el recuadro de el panel de resultado
  }
  
//renderizado condicional - solo dibuja si se ha presionado "generar"
 if (resultadoListo) {
   // se dibujan de fondo primero los iconos
    dibujarIconosDeFondo (); 
    // despues se dibuja el resto del contenido
    dibujarContenidoPoster();
  }

// panel de interfaz de seleccion - inputs
  dibujarInterfazPanel();
}

// logica composicion del poster 
function dibujarContenidoPoster() {
  let nombre = inputNombre.value(); // se pone el nombre del perrito en el poster
  let modo = sliderTamano.value();
  let colorTexto = color(112, 115, 84); // verde musgo para texto
  let textoEdad = edades[edadSeleccionada]; // se pone la edad del perrito del poster
  let textoSexo = sexos[sexoSeleccionado]; // se pone el sexo del perrito del poster

  fill(colorTexto);
  
// variable edad - cambio de tipografia segun edad 
  if (edadSeleccionada == 0) {
    textFont(fontEdad0);
  } else if (edadSeleccionada == 1) {
    textFont(fontEdad1);
  } else if (edadSeleccionada == 2) {
    textFont(fontEdad2);
  } else if (edadSeleccionada == 3) {
    textFont(fontEdad3);
  }

// variable mood - cambio de slogan segun mood del perrito
  let slogan = "";
  if (moodSeleccionado == 0) {
    slogan = "Professional heart stealer";
  } else if (moodSeleccionado == 1) {
    slogan = "Your personal fluffy bodyguard";
  } else if (moodSeleccionado == 2) {
    slogan = "Powered by zoomies & treats";
  } else if (moodSeleccionado == 3) {
    slogan = "Vibe: 100% Chill";
  }

// cambio de composicion del poster segun slider
  
 if (modo == 0) { // composicion poster tradicional
    
// logica de colores
    let paleta = { // si es macho
      texto: color(112, 115, 84), // verde musgo 
      iconos: color(77, 82, 66)    // verde oscuro 
    };

    if (sexoSeleccionado == 1) { // si es hembra
      paleta.texto = color(100, 25, 25);  // rojo oscuro 
      paleta.iconos = color(255, 163, 140); // salmon
    }
   
// marco decorativo
    noFill();
    stroke(paleta.texto);
    strokeWeight(2); // grosor del marco
    rect(95, 70, 410, 350, 5); 
    noStroke(); // Quitamos el stroke para que no afecte a lo que sigue
   
// definir el font segun la edad para todo el poster
   let fuenteActual;
    if (edadSeleccionada == 0) fuenteActual = fontEdad0;
    else if (edadSeleccionada == 1) fuenteActual = fontEdad1;
    else if (edadSeleccionada == 2) fuenteActual = fontEdad2;
    else if (edadSeleccionada == 3) fuenteActual = fontEdad3;

// emoji de patitas
    push(); // se guarda el estado actual (en especial la fuente de edad)
    textFont('Arial'); // la cambio a una fuente que si tenga el emoji
    textAlign(CENTER, CENTER);
    textSize(140);
    fill(red(paleta.texto), green(paleta.texto), blue(paleta.texto),180); 
    text("🐾", width/2, 270 );
    textSize (70);
    text("🐾", 175, 235 );
    text("🐾", 425, 320 );
    pop(); // regresamos a la fuente anterior
   
// textos del poster
    textFont(fuenteActual);
    fill(paleta.texto);
    textAlign (CENTER);
    
// en adopcion
    textSize(20);
    text("EN ADOPCIÓN", width/2, 100);

//nombre del perrito
    textSize(80); // 
    text(nombre.toUpperCase(), width/2, 190);

// datos de edad y sexo del perrito
    textSize(18);
    text(textoEdad.toUpperCase(), width/2, 360);
    text (textoSexo.toUpperCase(), width/2, 390);
    
// slogan del perrito segun el mood2
    textSize(19);
    text('"' + slogan + '"', width/2, 415);
    
  }
  
 else if (modo == 1) { // estilo tipo postal
// logica de colores
    let paleta = { // si es macho
      texto: color(112, 115, 84), // verde musgo 
      iconos: color(77, 82, 66)    // verde oscuro 
    };

    if (sexoSeleccionado == 1) { // si es hembra
      paleta.texto = color(100, 25, 25);  // rojo oscuro 
      paleta.iconos = color(255, 163, 140); // salmon
    }
   
// marco postal 
    fill (255,255,197);
    stroke (255,230,150)
    strokeWeight (4);
    rect(100, 82, 400, 330, 10); 

// cajita un poco mas oscura que la del marco de la postal
   stroke (255,230,150)
   strokeWeight (1.5);
   fill (245);
   rect (120, 315,155,80,10);
   
//linea vertical en la mitad 
    stroke(paleta.texto);
    strokeWeight(2);
    line(300, 150, 300, 395);
    noStroke();

// fuente segun edad
    let fuenteActual;
    if (edadSeleccionada == 0) fuenteActual = fontEdad0;
    else if (edadSeleccionada == 1) fuenteActual = fontEdad1;
    else if (edadSeleccionada == 2) fuenteActual = fontEdad2;
    else if (edadSeleccionada == 3) fuenteActual = fontEdad3;

// texto lado izquierdo de la postal 
    textAlign(LEFT);
    fill(paleta.texto);
    textFont(fuenteActual);

// "adopt me"
    textSize(35);
    text("ADOPT ME", 110, 135);

// nombre del perrito
    textSize(40);
    text(nombre.toUpperCase(), 110, 220);

// slogan
    textSize(16);
    textWrap(WORD); // para que el texto salte de linea si es largo
    text(slogan, 125, 260, 160); // el 160 limita el ancho del parrafo
   
// una frase decorativa plus
    textSize(13);
    textAlign(CENTER);
    text("¡EVERY DAY IS ADOPTION DAY!", 105, 355, 179);

// lado derecho de la postal
    
// emoji de patitas
// se hicieron 3 en diferentes posiciones y tamaños
    push();
    textFont('Arial');
    textAlign(CENTER, CENTER);
    fill(red(paleta.texto), green(paleta.texto), blue(paleta.texto), 180);
    
// emoji patita principal
    textSize(70);
    text("🐾", 440, 155);
    
// patitas secundarias
    push();
    translate(380, 130);
    rotate(radians(-20));
    textSize(40);
    text("🐾", 0, 0);
    pop();

    push();
    translate(460, 125);
    rotate(radians(15));
    textSize(30);
    text("🐾", 0, 0);
    pop();
    pop();

// linea donde van a estar los datos del perrito
    stroke(paleta.texto);
    strokeWeight(1);
    line(320, 280, 480, 280); // linea para la edad
    line(320, 330, 480, 330); // linea para el sexo

// texto sobre las lineas 
    noStroke();
    fill(paleta.texto);
    textFont(fuenteActual);
    textSize(18);
    textAlign(LEFT);
   
// dato edad del perrito
    text(textoEdad.toUpperCase(), 325, 273);
   
// dato sexo del perrito
    text(textoSexo.toUpperCase(), 325, 323);
    
  }
  
 else if (modo == 2) { // estilo polaroid
   
   let paleta = { // si es macho
      texto: color(112, 115, 84), // verde musgo 
      iconos: color(77, 82, 66)    // verde oscuro 
    };

    if (sexoSeleccionado == 1) { // si es hembra
      paleta.texto = color(100, 25, 25);  // rojo oscuro 
      paleta.iconos = color(255, 163, 140); // salmon
    }

// marco de la polaroid 
    fill(255);
    stroke (paleta.texto);
    strokeWeight (4);
    rect(140, 70, 320, 350, 5); 
    
//espacio un poco mas oscuro dentro del marco 
    fill(245); 
    noStroke ();
    rect(160, 95, 280, 215, 2); 
    
// tipo de fuente segun edad 
    let fuenteActual;
    if (edadSeleccionada == 0) fuenteActual = fontEdad0;
    else if (edadSeleccionada == 1) fuenteActual = fontEdad1;
    else if (edadSeleccionada == 2) fuenteActual = fontEdad2;
    else if (edadSeleccionada == 3) fuenteActual = fontEdad3;
   
// emoji de patitas en el recuadro
    push();
    textFont('Arial'); 
    textAlign(CENTER, CENTER);
    textSize(200); // Tamaño grande para que destaque
    fill(112, 115, 84, 180); // Color verde musgo con algo de transparencia
    text("🐾", 300, 202); 
    pop();
   
// textos
    fill(paleta.texto);
    textAlign(CENTER);
    textFont(fuenteActual);
   
// "conoce a"
    textSize(18);
    text("CONOCE A", width/2, 93);
   
//nombre del perrito
    textSize(45);
    text(nombre.toUpperCase(), width/2, 365);
    
//datos de edad y sexo
    textSize(14);
    text(textoEdad + " | " + textoSexo, width/2, 385);
    
// slogan segun el mood
   textSize(16);
   text('"' + slogan + '"', width/2, 405);
}
 }
   
// funcion de dibujo de iconos - segun mood seleccionado
  
// esta funcion ayuda a poner los icnones siempre en el fondo del panel de resultado
function dibujarIconosDeFondo() {
  let colorIconos = (sexoSeleccionado == 1) ? color(255, 163, 140) : color(77, 82, 66);
  let modo = sliderTamano.value();
  let opacidad = (modo == 2) ? 150 : 50; 
  let colorFinal = color(red(colorIconos), green(colorIconos), blue(colorIconos), opacidad);

  for (let ic of iconosFijos) {
    dibujarIcono(ic.x, ic.y, colorFinal, ic.s * 0.8);
  }
}
  
function dibujarIcono(x, y, col, escala) {
  push();
  translate(x, y);
  scale(escala);
  fill(col);
  noStroke();

  if (moodSeleccionado == 0) { // corazon para tierno
    ellipse(-5, -5, 10, 10);
    ellipse(5, -5, 10, 10);
    triangle(-10, -2, 10, -2, 0, 10);
  } 
  else if (moodSeleccionado == 1) { // estrella para protector
    beginShape();
    for (let i = 0; i < 10; i++) {
      let r = (i % 2 == 0) ? 8 : 4;
      let a = i * PI / 5;
      vertex(cos(a) * r, sin(a) * r);
    }
    endShape(CLOSE);
  } 
  else if (moodSeleccionado == 2) { // rayo para energetico
    beginShape();
    vertex(-5, -10); // punta superior
    vertex(5, -2);   // quiebre derecho
    vertex(1, -2);   // meterse un poco
    vertex(6, 10);   // punta inferior
    vertex(-3, 2);   // quiebre izquierdo
    vertex(1, 2);    // meterse un poco otra vez
    endShape(CLOSE);
  } 
  else if (moodSeleccionado == 3) { // flor para tranquilo
    // petalos de la flor
    for (let i = 0; i < 5; i++) {
      push();
      rotate(TWO_PI / 5 * i);
      ellipse(0, -5, 8, 10);
      pop();
    }
    // centro de la flor
    circle(0, 0, 5);
  }
  
  pop();
}

//panel de interaz y eventos - diseño de las cajas, botones y slider
function dibujarInterfazPanel() {
  fill(255, 197, 211); //fondo rosado del panel de inputs
  rect(35, 450, 520, 140, 20);
  
// titulo de los cuatro inputs
  fill(0);
  textFont(fontTexto);
  textSize(14);
  textAlign(LEFT);
  
  text("NOMBRE:", 55, 475);
  text("EDAD:", 55, 502);
  text("SEXO:", 55, 529);
  text("MOOD:", 55, 556);
  text("ESTILO:", 55, 580);

//etiuetas/subtitulos guia del slider
  textSize (10)
  text ("Poster", 118, 587);
  text ("Postal", 201, 587);
  text ("Polaroid", 285, 587);
  
// dibujar cajitas de seleccion
  textSize (14);
  
  for (let i = 0; i < 4; i++) {
// edad
    fill(edadSeleccionada == i ? color(255, 255, 197) : 255);
    rect(105 + i*85, 495, 12, 12);
    fill(0);
    text(edades[i], 120 + i*85, 505);
  }
  
  for (let i = 0; i < 2; i++) {
// sexo
    fill(sexoSeleccionado == i ? color(255, 255, 197) : 255);
    rect(105 + i*85, 522, 12, 12);
    fill(0);
    text(sexos[i], 120 + i*85, 532);
      
  }
    
  for (let i = 0; i < 4; i++) {
// mood
    fill(moodSeleccionado == i ? color(255, 255, 197) : 255);
    rect(105 + i*85, 548, 12, 12);
    fill(0);
    text(moods[i], 120 + i*85, 559);
  
  }
}

// gestion de eventos - segun logica de seleccion de coordenadas
function generarResultado() {
  if (edadSeleccionada != -1 && sexoSeleccionado != -1 && moodSeleccionado != -1) {
    resultadoListo = true;
    iconosFijos = []; 
    for (let i = 0; i < 100; i++) { 
      iconosFijos.push({
        x: random(95, 495), // dentro del recuadro del poster
        y: random(75, 415),
        s: random(1, 3)
      });
    }
  } else {
    alert("Por favor, completa todas las selecciones.");
  }
}

// deteccion de clics en las cajitas (ajustada a posiciones del panel)
function mousePressed() {
  
  for (let i = 0; i < 4; i++) {
// clic en edad
    if (mouseX > 105+i*85 && mouseX < 115+i*85 && mouseY > 495 && mouseY < 505) {
      edadSeleccionada = i;
    }
    
// clic en mood
    if (mouseX > 105+i*85 && mouseX < 115+i*85 && mouseY > 548 && mouseY < 558) {
      moodSeleccionado = i;
    }
  }
  
  for (let i = 0; i < 2; i++) {
// clic en sexo
    if (mouseX > 105+i*85 && mouseX < 115+i*85 && mouseY > 522 && mouseY < 532) {
      sexoSeleccionado = i;
    }
  }
}

// use esta funcion porque asi los botones se recalculan solos si se cambia a modo vista o cualquier otro aparte de modo editor, ya que antes se me estaban moviendo en el modo de vista y no salian donde tenian que salir 
function windowResized() {
  actualizarPosicionElementos();
}