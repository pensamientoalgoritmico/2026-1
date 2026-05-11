//Camila Lizarazo Antia 202222344
//Juego "El parte del día"
//algunas referencias: 
//Purble Place: https://en.wikipedia.org/wiki/Purble_Place por la estructura de minijuego claro, colores planos y sensación de interfaz infantil/juguetona.
//Pou: https://www.europapress.es/portaltic/portalgeek/noticia-pou-tamagotchi-android-arrasa-google-play-20121119144046.html por cómo combina selección simple, personaje central y cambios visuales inmediatos.
//Toca Boca: https://en.wikipedia.org/wiki/Toca_Boca 



let font;
let entradaTexto;
let entradaPalabra;
let sliderEj;
let botonDia;
let checkSoleado;
let checkNublado;
let checkLluvioso;
let botonReiniciar;
let botonReiniciarPlaca;
let botonInicio;
let colorRadio;
let colorCamisa = 'azul';

// estado general del programa para controlar qué pantalla se debe ver
let pantalla = 'inicio';
let nombreGuardado = '';
let palabraGuardada = '';
let tranquilidadGuardada = 2;
let climaGuardado = '';

function preload() {
  
  //cargar la fuente antes de que inicie el programa para que todos los textos del bus usen esa tipografía
  font = loadFont('/assets/led2.ttf');
}

function setup() {
  //crear el canvas principal del sketch y meterlo dentro del contenedor del html para que la plantilla lo centre correctamente
  let cnv = createCanvas(400, 400);
  cnv.parent('canvasContainer');//Pregunté a Claude cómo añadir el .parent y me dijo que en esta parte 
  pixelDensity(7);//Pregunté a Claude por qué el font se veía tan borroso, me explicó que por el pixel density

  //escribe tu nombre: este input permite que la persona escriba su nombre para luego mostrarlo en la placa del conductor. 
  entradaTexto = createInput(" ");
  entradaTexto.parent('canvasContainer');//Claude
  entradaTexto.position(120, 108.5);
  entradaTexto.size(48, 12);
  entradaTexto.style('font-size', '8px');
  entradaTexto.style('outline', 'none');
  entradaTexto.style('background-color', 'rgb(91,154,207)');
  entradaTexto.hide();

  //escribe la palabra: este input sirve para resumir el día en una sola palabra que aparecerá en el letrero del bus
  entradaPalabra = createInput(" ");
  entradaPalabra.parent('canvasContainer');//Claude
  entradaPalabra.position(86, 163);
  entradaPalabra.size(48, 12);
  entradaPalabra.style('outline', 'none');
  entradaPalabra.style('background-color', 'rgb(91,154,207)');
  entradaPalabra.style('font-size', '8px');
  entradaPalabra.hide();

  //slider: este control permite escoger el nivel de tranquilidad del día y después modifica la expresión de la cara del conductor
  sliderEj = createSlider(1, 3, 2, 1);
  sliderEj.parent('canvasContainer');//Claude
  sliderEj.position(86, 222);
  sliderEj.style('cursor', 'pointer');
  sliderEj.mouseOver(cambiarOpacidad);
  sliderEj.mouseOut(volverOpacidad);
  sliderEj.hide();

  //boton ver dia: este botón guarda la información escrita por la persona y cambia de la pantalla del formulario a la pantalla final
  botonDia = createButton('ver-mi-día');
  botonDia.parent('canvasContainer');//Claude
  botonDia.position(171.6, 327);
  botonDia.size(52, 17);
  botonDia.style('font-family', 'led2');
  botonDia.style('font-size', '7px');
  botonDia.style('background-color', 'white');
  botonDia.style('border', 'none');
  botonDia.style('color', 'black');
  botonDia.style('padding', '0px');
  botonDia.style('outline', 'none');
  botonDia.style('box-sizing', 'border-box');
  botonDia.style('cursor', 'pointer');
  botonDia.style('text-align', 'center');
  botonDia.style('line-height', '17px');
  botonDia.mouseOver(cambiarHover);
  botonDia.mouseOut(vuelveNormal);
  botonDia.mousePressed(verMiDia);
  botonDia.hide();

  //checkboxes de clima: estos tres checkboxes permiten elegir una  condición climática para personalizar el fondo de la escena final
  checkSoleado = createCheckbox('', false);
  checkSoleado.parent('canvasContainer');
  checkSoleado.position(303, 147);
  checkSoleado.style('transform', 'scale(0.75)');
  checkSoleado.changed(seleccionClima);
  checkSoleado.hide();

  checkNublado = createCheckbox('', false);
  checkNublado.parent('canvasContainer');
  checkNublado.position(303, 182);
  checkNublado.style('transform', 'scale(0.75)');
  checkNublado.changed(seleccionClima);
  checkNublado.hide();

  checkLluvioso = createCheckbox('', false);
  checkLluvioso.parent('canvasContainer');
  checkLluvioso.position(303, 217);
  checkLluvioso.style('transform', 'scale(0.75)');
  checkLluvioso.changed(seleccionClima);
  checkLluvioso.hide();

  //selector de color: permite elegir el color de la camiseta del conductor
  colorRadio = createRadio();
  colorRadio.parent('canvasContainer');
  colorRadio.position(86, 250);
  colorRadio.option('rojo');
  colorRadio.option('verde');
  colorRadio.option('azul');
  colorRadio.option('rosado');
  colorRadio.selected('azul');
  colorRadio.style('color', 'white');
  colorRadio.style('font-size', '8px');
  colorRadio.hide();

  //boton reiniciar: este botón aparece sobre el led en la pantalla del formulario y permite borrar los datos para empezar otra vez
  botonReiniciar = createButton('reiniciar');
  botonReiniciar.parent('canvasContainer');
  botonReiniciar.position(83, 42);
  botonReiniciar.size(231, 33);
  botonReiniciar.style('font-family', 'led2');
  botonReiniciar.style('font-size', '25px');
  botonReiniciar.style('background-color', 'black');
  botonReiniciar.style('border', 'none');
  botonReiniciar.style('color', 'rgb(250,229,165)');
  botonReiniciar.style('padding', '0px');
  botonReiniciar.style('outline', 'none');
  botonReiniciar.style('box-sizing', 'border-box');
  botonReiniciar.style('cursor', 'pointer');
  botonReiniciar.style('text-align', 'center');
  botonReiniciar.style('line-height', '33px');
  botonReiniciar.style('z-index', '10');
  botonReiniciar.mouseOver(hoverReiniciar);
  botonReiniciar.mouseOut(normalReiniciar);
  botonReiniciar.mousePressed(reiniciar);
  botonReiniciar.hide();

  //boton reiniciar de la placa: este botón aparece en la pantalla resultado y funciona como una segunda forma de volver a comenzar
  botonReiniciarPlaca = createButton('reiniciar');
  botonReiniciarPlaca.parent('canvasContainer');
  botonReiniciarPlaca.position(171.6, 327);
  botonReiniciarPlaca.size(52, 17);
  botonReiniciarPlaca.style('font-family', 'led2');
  botonReiniciarPlaca.style('font-size', '7px');
  botonReiniciarPlaca.style('background-color', 'white');
  botonReiniciarPlaca.style('border', 'none');
  botonReiniciarPlaca.style('color', 'black');
  botonReiniciarPlaca.style('padding', '0px');
  botonReiniciarPlaca.style('outline', 'none');
  botonReiniciarPlaca.style('box-sizing', 'border-box');
  botonReiniciarPlaca.style('cursor', 'pointer');
  botonReiniciarPlaca.style('text-align', 'center');
  botonReiniciarPlaca.style('line-height', '17px');
  botonReiniciarPlaca.style('z-index', '10');
  botonReiniciarPlaca.mousePressed(reiniciar);
  botonReiniciarPlaca.mouseOver(hoverReiniciarPlaca);
  botonReiniciarPlaca.mouseOut(normalReiniciarPlaca);
  botonReiniciarPlaca.hide();

  //boton iniciar: este botón se muestra en la primera pantalla y da paso al formulario donde la persona llena los datos del día
  botonInicio = createButton('iniciar');
  botonInicio.parent('canvasContainer');
  botonInicio.position(171.6, 327);
  botonInicio.size(52, 17);
  botonInicio.style('font-family', 'led2');
  botonInicio.style('font-size', '8px');
  botonInicio.style('background-color', 'white');
  botonInicio.style('border', 'none');
  botonInicio.style('color', 'black');
  botonInicio.style('padding', '0px');
  botonInicio.style('outline', 'none');
  botonInicio.style('box-sizing', 'border-box');
  botonInicio.style('cursor', 'pointer');
  botonInicio.style('text-align', 'center');
  botonInicio.style('line-height', '17px');
  botonInicio.mouseOver(hoverInicio);
  botonInicio.mouseOut(normalInicio);
  botonInicio.mousePressed(irAFormulario);
  botonInicio.hide();
}

function draw() {
  //según el estado de la variable pantalla, draw decide cuál de las tres pantallas debe dibujarse en cada momento
  if (pantalla === 'inicio') {
    dibujarInicio();
  } else if (pantalla === 'formulario') {
    dibujarFormulario();
  } else {
    dibujarResultado();
  }
}

// pantalla de inicio

function dibujarInicio() {
  //fondo general de la pantalla 
  background('rgb(88,173,209)');

  //espejos
  fill(0); stroke(0);
  beginShape();
  vertex(59.79,83.75);
  vertex(48.25,83.75);
  vertex(33.82,102.04);
  vertex(33.82,110.21);
  vertex(27.09,110.21);
  vertex(27.09,169.67);
  vertex(47.23,169.67);
  vertex(47.23,110.74);
  vertex(50.44,100.2);
  vertex(60.21,100.02);
  vertex(59.79,83.75);
  endShape(CLOSE);

  beginShape();
  vertex(340.21,78.82);
  vertex(351.75,78.82);
  vertex(366.18,97.1);
  vertex(366.18,105.28);
  vertex(372.91,105.28);
  vertex(372.91,165.04);
  vertex(352.77,165.04);
  vertex(352.77,105.8);
  vertex(349.56,95.26);
  vertex(339.79,95.26);
  vertex(340.21,78.82);
  endShape(CLOSE);

  //llantas
  noStroke(); fill(2,2,2);
  ellipse(305.5, 350, 70, 91);
  ellipse(95, 350, 70, 91);

  //parte roja
  noStroke(); fill(234,0,0);
  beginShape();
  vertex(61,34.44);
  vertex(47.23,224.2);
  vertex(53.13,345.36);
  vertex(346.6,345.36);
  vertex(352.5,224.2);
  vertex(338.72,34.44);
  vertex(199.86,28.2);
  vertex(61,34.44);
  endShape(CLOSE);

  beginShape();
  vertex(159.4,19.86);
  vertex(159.4,30);
  vertex(240.37,30);
  vertex(240.37,19.86);
  vertex(224.34,19.86);
  vertex(219.33,8.45);
  vertex(180.4,8.45);
  vertex(175.39,19.86);
  vertex(159.4,19.86);
  endShape(CLOSE);

  //ventana
  noStroke(); fill(0);
  beginShape();
  vertex(66.23,87.55);
  vertex(59.52,247.03);
  vertex(105.19,282.84);
  vertex(294.38,282.84);
  vertex(340.05,247.03);
  vertex(333.34,87.55);
  vertex(66.23,87.55);
  endShape(CLOSE);

  fill(32,190,239);
  beginShape();
  vertex(72,92.94);
  vertex(69.52,227);
  vertex(111.95,257.14);
  vertex(287.78,257.14);
  vertex(330.22,227);
  vertex(323.98,92.94);
  vertex(72,92.94);
  endShape(CLOSE);

  //led
  noStroke(); fill(51,51,51);
  rect(66.85, 38.11, 266, 42, 7);
  fill(0);
  rect(82.8, 42, 231, 33);

  //luces
  noStroke();
  fill(109,109,109);
  triangle(58.58,264.56, 58.58,324.82, 125,325);
  fill(244,255,204);
  triangle(64,281, 64,319, 112.7,319);
  noStroke();
  fill(109,109,109);
  triangle(341.15,264.56, 274.82,324.82, 341.15,324.82);
  fill(244,255,204);
  triangle(287,319, 335,319, 335,281);

  //rayas amarillas
  noStroke();
  fill(249,237,50);
  quad(94.95,283.84, 113.1,283.84, 154.03,325.82, 135.18,325.56);
  quad(130.86,283.71, 149.01,283.71, 189.94,325.69, 171.09,325.43);
  quad(241.75,283.65, 200.83,325.63, 219.67,325.37, 259.91,283.65);
  quad(277.66,283.78, 295.81,283.78, 255.58,325.5, 236.74,325.75);

  //fuente de todos los textos
  textFont(font);

  //placa
  noStroke(); fill(255);
  rect(171.6, 327, 52, 17);

  //parabrisas
  noStroke(); fill(0);
  triangle(178.25,185.2, 168.27,260.46, 164.95,260.46);
  triangle(218.58,184.47, 228.55,259.73, 231.88,259.73);

  //título en el led: mensaje principal que aparece en la pantalla de bienvenida
  textAlign(CENTER, CENTER);
  textSize(16);
  fill('rgb(250,229,165)');
  text('EL PARTE DEL DÍA!', 200, 58);

  //instrucciones en la ventana
  fill(255);
  textSize(14);
  text('Hoy vas a hacer tu parte del día.', 200, 100);
  text('Escribe tu nombre,', 200, 125);
  text('resume tu día en una palabra', 200, 150);
  text('y elige cómo estuvo el clima.', 200, 175);
  text('¡Da click al botón de iniciar!', 200, 200);

  textAlign(LEFT, BASELINE);

  //elementos visibles en inicio: aquí se define qué elementos html aparecen y cuáles se ocultan en esta primera pantalla
  botonInicio.show();
  entradaTexto.hide();
  entradaPalabra.hide();
  sliderEj.hide();
  botonDia.hide();
  checkSoleado.hide();
  checkNublado.hide();
  checkLluvioso.hide();
  colorRadio.hide();
  botonReiniciar.hide();
  botonReiniciarPlaca.hide();
}

// pantalla de formulario/input

function dibujarFormulario() {
  //fondo celeste
  background(153, 245, 255);

  //espejos: 
  fill(0); stroke(0);
  beginShape();
  vertex(59.79,83.75);
  vertex(48.25,83.75);
  vertex(33.82,102.04);
  vertex(33.82,110.21);
  vertex(27.09,110.21);
  vertex(27.09,169.67);
  vertex(47.23,169.67);
  vertex(47.23,110.74);
  vertex(50.44,100.2);
  vertex(60.21,100.02);
  vertex(59.79,83.75);
  endShape(CLOSE);

  beginShape();
  vertex(340.21,78.82);
  vertex(351.75,78.82);
  vertex(366.18,97.1);
  vertex(366.18,105.28);
  vertex(372.91,105.28);
  vertex(372.91,165.04);
  vertex(352.77,165.04);
  vertex(352.77,105.8);
  vertex(349.56,95.26);
  vertex(339.79,95.26);
  vertex(340.21,78.82);
  endShape(CLOSE);

  //llantas
  noStroke(); fill(2,2,2);
  ellipse(305.5, 350, 70, 91);
  ellipse(95, 350, 70, 91);

  //parte roja
  noStroke(); fill(234,0,0);
  beginShape();
  vertex(61,34.44);
  vertex(47.23,224.2);
  vertex(53.13,345.36);
  vertex(346.6,345.36);
  vertex(352.5,224.2);
  vertex(338.72,34.44);
  vertex(199.86,28.2);
  vertex(61,34.44);
  endShape(CLOSE);

  beginShape();
  vertex(159.4,19.86);
  vertex(159.4,30);
  vertex(240.37,30);
  vertex(240.37,19.86);
  vertex(224.34,19.86);
  vertex(219.33,8.45);
  vertex(180.4,8.45);
  vertex(175.39,19.86);
  vertex(159.4,19.86);
  endShape(CLOSE);

  //ventana
  noStroke(); fill(0);
  beginShape();
  vertex(66.23,87.55);
  vertex(59.52,247.03);
  vertex(105.19,282.84);
  vertex(294.38,282.84);
  vertex(340.05,247.03);
  vertex(333.34,87.55);
  vertex(66.23,87.55);
  endShape(CLOSE);

  fill(32,190,239);
  beginShape();
  vertex(72,92.94);
  vertex(69.52,227);
  vertex(111.95,257.14);
  vertex(287.78,257.14);
  vertex(330.22,227);
  vertex(323.98,92.94);
  vertex(72,92.94);
  endShape(CLOSE);

  //led
  noStroke(); fill(51,51,51);
  rect(66.85, 38.11, 266, 42, 7);
  fill(0);
  rect(82.8, 42, 231, 33);

  //luces
  noStroke();
  fill(109,109,109);
  triangle(58.58,264.56, 58.58,324.82, 125,325);
  fill(244,255,204);
  triangle(64,281, 64,319, 112.7,319);
  noStroke();
  fill(109,109,109);
  triangle(341.15,264.56, 274.82,324.82, 341.15,324.82);
  fill(244,255,204);
  triangle(287,319, 335,319, 335,281);

  //rayas amarillas
  noStroke();
  fill(249,237,50);
  quad(94.95,283.84, 113.1,283.84, 154.03,325.82, 135.18,325.56);
  quad(130.86,283.71, 149.01,283.71, 189.94,325.69, 171.09,325.43);
  quad(241.75,283.65, 200.83,325.63, 219.67,325.37, 259.91,283.65);
  quad(277.66,283.78, 295.81,283.78, 255.58,325.5, 236.74,325.75);

  //fuente de todos los textos
  textFont(font);

  //placa
  noStroke(); fill(255);
  rect(171.6, 327, 52, 17);

  //parabrisas
  noStroke(); fill(0);
  triangle(178.25,185.2, 168.27,260.46, 164.95,260.46);
  triangle(218.58,184.47, 228.55,259.73, 231.88,259.73);

  //texto del slider: preguntas que guían a la persona para llenar el formulario dentro de la composición gráfica del bus
  noStroke();
  textSize(8);
  fill(255);
  text('¿Qué tan tranquilo', 86, 196);
  text('estuvo tu día?', 86, 206);
  textSize(6);
  fill('rgb(252,252,39)');
  text('muy', 86, 222);
  text('poco', 146, 222);
  text('nada', 206, 222);

  //texto nombre: etiqueta que señala el input del nombre
  noStroke();
  textSize(8);
  fill(255);
  text('Nombre:', 86, 120);

  //texto de palabra: etiqueta que explica que el día debe resumirse en una sola palabra
  noStroke();
  textSize(8);
  fill(255);
  text('En una palabra,', 86, 145);
  text('describe tu día:', 86, 155);

  //texto de clima: indicaciones para seleccionar el clima que acompañó la jornada
  noStroke();
  textSize(8);
  fill(255);
  text('¿Cómo estuvo', 220, 120);
  text('el clima hoy?:', 220, 130);
  textSize(6);
  text('selecciona uno:', 220, 140);

  //texto del selector de color: esta instrucción indica que se puede escoger el color de la camiseta
  noStroke();
  textSize(8);
  fill(255);
  text('Elige un color:', 86, 247);

  //soleado
  stroke('#F9ED32'); strokeWeight(2); fill('#F9ED32');
  ellipse(243, 160, 13, 13); noFill();
  line(243,146,243,174); line(232,150,253,170);
  line(228,160,257,160); line(232,170,253,150);

  //nublado
  stroke('#F9ED32'); strokeWeight(2); fill('#F9ED32');
  ellipse(234, 193, 11.5, 11.5); noFill();
  line(234,183,234,203); line(226,186,241,200);
  line(223,193,244,193); line(226.3,200,241.5,185);
  noStroke(); fill('rgb(5,98,119)');
  ellipse(239,197,14,11); ellipse(246,192,14,11);
  ellipse(244,199,14,11); ellipse(253,193,14,11); ellipse(252,196,14,11);

  //lluvioso: nube con líneas diagonales para sugerir lluvia
  noStroke(); fill('rgb(5,98,119)');
  ellipse(237,228,18,14); ellipse(244,223,18,14);
  ellipse(242,230,18,14); ellipse(251,224,18,14); ellipse(250,227,18,14);
  stroke(255); strokeWeight(1);
  line(232,216,229,221); line(239,218,236,223);
  line(246,215,243,220); line(253,217,250,222);
  line(228,229,225,234); line(236,226,233,231);
  line(243,231,240,236); line(250,228,247,233); line(257,232,254,237);

  //texto seleccion clima
  noStroke(); textSize(8); fill(255);
  text('soleado:', 266, 160);
  text('nublado:', 266, 195);
  text('lluvioso:', 266, 230);

  //elementos visibles en formulario: se activa el formulario y se ocultan los botones de otras pantallas
  botonInicio.hide();
  entradaTexto.show();
  entradaPalabra.show();
  sliderEj.show();
  botonDia.show();
  checkSoleado.show();
  checkNublado.show();
  checkLluvioso.show();
  colorRadio.show();
  botonReiniciar.show();
  botonReiniciarPlaca.hide();
}

//pantalla 2: resultado/output

function dibujarResultado() {

  //fondo según clima: esta parte cambia la atmósfera general de la escena dependiendo de la opción que se eligió en el formulario
  if (climaGuardado === 'soleado') {
    background(153, 245, 255);
  } else if (climaGuardado === 'nublado') {
    background(180, 180, 180);
  } else if (climaGuardado === 'lluvioso') {
    background(90, 100, 110);
    
    //lluvia
    stroke(180, 210, 240); strokeWeight(1.5);
    for (let x = 20; x < 400; x += 25) {
      for (let y = 0; y < 400; y += 30) {
        line(x, y, x - 4, y + 10);
      }
    }
  } else {
    background(153, 245, 255);
  }

  //sol si soleado
  if (climaGuardado === 'soleado') {
    noStroke(); fill(255, 220, 50);
    ellipse(350, 50, 45, 45);
    stroke(255, 220, 50); strokeWeight(2);
    line(350,18,350,5); line(350,82,350,95);
    line(318,50,305,50); line(382,50,395,50);
    line(327,27,318,18); line(373,73,382,82);
    line(373,27,382,18); line(327,73,318,82);
  }

  //nubes si nublado o lluvioso
  if (climaGuardado === 'nublado' || climaGuardado === 'lluvioso') {
    noStroke(); fill(220,220,220);
    ellipse(60,40,50,30); ellipse(80,30,50,30);
    ellipse(100,40,50,30); ellipse(300,35,55,30);
    ellipse(325,25,55,30); ellipse(350,35,55,30);
  }

  //busde nuevo

  //espejos
  fill(0); stroke(0);
  beginShape();
  vertex(59.79,83.75);
  vertex(48.25,83.75);
  vertex(33.82,102.04);
  vertex(33.82,110.21);
  vertex(27.09,110.21);
  vertex(27.09,169.67);
  vertex(47.23,169.67);
  vertex(47.23,110.74);
  vertex(50.44,100.2);
  vertex(60.21,100.02);
  vertex(59.79,83.75);
  endShape(CLOSE);

  beginShape();
  vertex(340.21,78.82);
  vertex(351.75,78.82);
  vertex(366.18,97.1);
  vertex(366.18,105.28);
  vertex(372.91,105.28);
  vertex(372.91,165.04);
  vertex(352.77,165.04);
  vertex(352.77,105.8);
  vertex(349.56,95.26);
  vertex(339.79,95.26);
  vertex(340.21,78.82);
  endShape(CLOSE);

  //llantas
  noStroke(); fill(2,2,2);
  ellipse(305.5,350,70,91); ellipse(95,350,70,91);

  //parte roja
  noStroke(); fill(234,0,0);
  beginShape();
  vertex(61,34.44); vertex(47.23,224.2); vertex(53.13,345.36);
  vertex(346.6,345.36); vertex(352.5,224.2); vertex(338.72,34.44);
  vertex(199.86,28.2); vertex(61,34.44);
  endShape(CLOSE);
  beginShape();
  vertex(159.4,19.86); vertex(159.4,30); vertex(240.37,30);
  vertex(240.37,19.86); vertex(224.34,19.86); vertex(219.33,8.45);
  vertex(180.4,8.45); vertex(175.39,19.86); vertex(159.4,19.86);
  endShape(CLOSE);

  //ventana
  noStroke(); fill(0);
  beginShape();
  vertex(66.23,87.55); vertex(59.52,247.03); vertex(105.19,282.84);
  vertex(294.38,282.84); vertex(340.05,247.03); vertex(333.34,87.55);
  vertex(66.23,87.55);
  endShape(CLOSE);
  fill(32,190,239);
  beginShape();
  vertex(72,92.94); vertex(69.52,227); vertex(111.95,257.14);
  vertex(287.78,257.14); vertex(330.22,227); vertex(323.98,92.94);
  vertex(72,92.94);
  endShape(CLOSE);

  //led con la palabra del día: aquí se muestra la palabra elegida como si fuera el destino o mensaje del bus
  noStroke(); fill(51,51,51);
  rect(66.85, 38.11, 266, 42, 7);
  fill(0);
  rect(82.8, 42, 231, 33);
  textFont(font);
  textSize(30); fill('rgb(250,229,165)');
  textAlign(CENTER, CENTER);
  text(palabraGuardada, 198, 58.5);
  textAlign(LEFT, CENTER);

  //luces
  noStroke(); fill(109,109,109);
  triangle(58.58,264.56, 58.58,324.82, 125,325);
  fill(244,255,204);
  triangle(64,281, 64,319, 112.7,319);
  noStroke(); fill(109,109,109);
  triangle(341.15,264.56, 274.82,324.82, 341.15,324.82);
  fill(244,255,204);
  triangle(287,319, 335,319, 335,281);

  //rayas amarillas
  noStroke(); fill(249,237,50);
  quad(94.95,283.84, 113.1,283.84, 154.03,325.82, 135.18,325.56);
  quad(130.86,283.71, 149.01,283.71, 189.94,325.69, 171.09,325.43);
  quad(241.75,283.65, 200.83,325.63, 219.67,325.37, 259.91,283.65);
  quad(277.66,283.78, 295.81,283.78, 255.58,325.5, 236.74,325.75);

  //parabrisas
  noStroke(); fill(0);
  triangle(178.25,185.2, 168.27,260.46, 164.95,260.46);
  triangle(218.58,184.47, 228.55,259.73, 231.88,259.73);

  //color de la camiseta: la opción elegida se vuelve el color para el uniforme del conductor
  let camisaColor;
  if (colorCamisa === 'rojo') camisaColor = color(234, 0, 0);
  else if (colorCamisa === 'verde') camisaColor = color(60, 160, 90);
  else if (colorCamisa === 'rosado') camisaColor = color(240, 120, 180);
  else camisaColor = color(30, 60, 120);

  ///conductor

  //sombra suave detrás del cuerpo
  noStroke(); fill(0, 0, 0, 30);
  ellipse(290, 247, 38, 10);

  //cuello
  noStroke(); fill(255, 210, 170);
  rect(286, 183, 8, 12, 3);

  //cabeza
  noStroke(); fill(255, 210, 170);
  ellipse(290, 170, 38, 36);

  //orejas
  noStroke(); fill(255, 210, 170);
  ellipse(271, 170, 10, 12);
  ellipse(309, 170, 10, 12);

  //cara según tranquilidad
  if (tranquilidadGuardada === 1) {
    stroke(60); strokeWeight(1.5); noFill();
    arc(283, 168, 8, 6, PI, TWO_PI);
    arc(297, 168, 8, 6, PI, TWO_PI);
    arc(290, 177, 12, 8, 0, PI);
    noStroke(); fill(255, 180, 180, 160);
    ellipse(279, 175, 9, 6);
    ellipse(301, 175, 9, 6);
  } else if (tranquilidadGuardada === 2) {
    noStroke(); fill(60);
    ellipse(283, 168, 4, 4);
    ellipse(297, 168, 4, 4);
    stroke(60); strokeWeight(1.5);
    line(285, 177, 295, 177);
  } else {
    noStroke(); fill(60);
    ellipse(283, 168, 4, 4);
    ellipse(297, 168, 4, 4);
    stroke(60); strokeWeight(1.5); noFill();
    arc(290, 180, 12, 8, PI, TWO_PI);
  }

  //cuerpo
  noStroke(); fill(camisaColor);
  rect(272, 190, 36, 40, 8);

  //brazo izquierdo
  noStroke(); fill(camisaColor);
  beginShape();
  vertex(278, 193);
  vertex(270, 193);
  vertex(262, 215);
  vertex(263, 230);
  vertex(271, 230);
  vertex(278, 215);
  endShape(CLOSE);

  //brazo derecho
  noStroke(); fill(camisaColor);
  beginShape();
  vertex(302, 193);
  vertex(310, 193);
  vertex(318, 215);
  vertex(317, 230);
  vertex(309, 230);
  vertex(302, 215);
  endShape(CLOSE);

  //volante círculo exterior
  noStroke(); fill(40, 40, 40);
  ellipse(290, 237, 52, 52);
  noStroke(); fill(80, 80, 80);
  ellipse(290, 237, 44, 44);
  noStroke(); fill(40, 40, 40);
  ellipse(290, 237, 16, 16);

  //radios del volante
  stroke(40, 40, 40); strokeWeight(3);
  line(290, 229, 290, 221);
  line(282, 233, 274, 229);
  line(298, 233, 306, 229);

  //manos en el volante
  noStroke(); fill(255, 210, 170);
  ellipse(268, 230, 10, 10);
  ellipse(312, 230, 10, 10);

  //placa con nombre
  noStroke(); fill(255);
  rect(275, 205, 30, 10, 2);
  textFont(font); textSize(5.5); fill(0);
  textAlign(CENTER, CENTER);
  text(nombreGuardado, 290, 211);
  textAlign(LEFT, BASELINE);

  //letrero led: input palabra repetido en la placa inferior del bus como un segundo eco visual del día
  noStroke(); fill(255);
  rect(171.6, 327, 52, 17);
  textFont(font); textSize(8); fill(0);
  textAlign(CENTER, CENTER);
  text(palabraGuardada, 197.6, 336);
  textAlign(LEFT, BASELINE);

  //elementos visibles en resultado: en esta pantalla solo queda activo el reinicio pequeño de la placa
  botonInicio.hide();
  entradaTexto.hide();
  entradaPalabra.hide();
  sliderEj.hide();
  botonDia.hide();
  checkSoleado.hide();
  checkNublado.hide();
  checkLluvioso.hide();
  colorRadio.hide();
  botonReiniciar.hide();
  botonReiniciarPlaca.show();
}

//funcion de transición: lleva al usuario desde la pantalla de inicio hacia el formulario
function irAFormulario() {
  pantalla = 'formulario';
}

function verMiDia() {
  
  //guardar en variables finales 
  nombreGuardado = entradaTexto.value().trim(); // le dije a Claude que me ayude a guardar lo que escribió la persona en el nombre, la palabra y el nivel de tranquilidad para usarlo después en la pantalla final y me explicó el trim, que limpia los espacios 
  palabraGuardada = entradaPalabra.value().trim();
  tranquilidadGuardada = sliderEj.value();

  //detectar clima seleccionado
  if (checkSoleado.checked()) climaGuardado = 'soleado';
  else if (checkNublado.checked()) climaGuardado = 'nublado';
  else if (checkLluvioso.checked()) climaGuardado = 'lluvioso';
  else climaGuardado = 'soleado'; // default

  //guardar color de camiseta
  colorCamisa = colorRadio.value();

  //ocultar todos los elementos HTML: al pasar al resultado ya no hace falta mostrar el formulario
  entradaTexto.hide();
  entradaPalabra.hide();
  sliderEj.hide();
  botonDia.hide();
  checkSoleado.hide();
  checkNublado.hide();
  checkLluvioso.hide();
  colorRadio.hide();
  botonReiniciar.hide();
  botonReiniciarPlaca.show();
  botonInicio.hide();

  //cambiar al estado final para que draw dibuje la pantalla personalizada
  pantalla = 'resultado';
}

function reiniciar() {
  //limpiar inputs: se borran los campos y se devuelve el slider a su valor inicial
  entradaTexto.value('');
  entradaPalabra.value('');
  sliderEj.value(2);
  checkSoleado.checked(false);
  checkNublado.checked(false);
  checkLluvioso.checked(false);

  //reiniciar selector de color
  colorRadio.selected('azul');

  //limpiar variables guardadas
  nombreGuardado = '';
  palabraGuardada = '';
  tranquilidadGuardada = 2;
  climaGuardado = '';
  colorCamisa = 'azul';

  //volver al formulario 
  entradaTexto.show();
  entradaPalabra.show();
  sliderEj.show();
  botonDia.show();
  checkSoleado.show();
  checkNublado.show();
  checkLluvioso.show();
  colorRadio.show();
  botonReiniciar.show();
  botonReiniciarPlaca.hide();
  botonInicio.hide();

  pantalla = 'formulario';
}

//funciones de opacidad, hover y mostrar seleccion de checkbox: estas funciones pequeñas controlan interacciones visuales y comportamiento de selección

function cambiarOpacidad() {
  sliderEj.style("opacity", '0.6');
}

function volverOpacidad() {
  sliderEj.style("opacity", '1');
}

function cambiarHover() {
  botonDia.style('background-color', 'yellow');
}

function vuelveNormal() {
  botonDia.style('background-color', 'white');
}

function hoverReiniciar() {
  botonReiniciar.style('background-color', 'red');
}

function normalReiniciar() {
  botonReiniciar.style('background-color', 'black');
}

function hoverReiniciarPlaca() {
  botonReiniciarPlaca.style('background-color', 'yellow');
}

function normalReiniciarPlaca() {
  botonReiniciarPlaca.style('background-color', 'white');
}

function hoverInicio() {
  botonInicio.style('background-color', 'yellow');
}

function normalInicio() {
  botonInicio.style('background-color', 'white');
}

function seleccionClima() {
  //permitir una sola selección a la vez: si se activa un clima, los otros dos se desmarcan automáticamente
  if (this === checkSoleado && checkSoleado.checked()) {
    checkNublado.checked(false); checkLluvioso.checked(false);
  }
  if (this === checkNublado && checkNublado.checked()) {
    checkSoleado.checked(false); checkLluvioso.checked(false);
  }
  if (this === checkLluvioso && checkLluvioso.checked()) {
    checkSoleado.checked(false); checkNublado.checked(false);
  }
}