//ENTREGA FINAL

//SARA TIBADUIZA
//DIARIO SENSORIAL
//DIARIO SENROIAL BUSCA: Diario Sensorial es una herramienta de rápida respuesta, diseñada para el cuidado emocional en la cotidianidad,bajo el mensaje: "un beat es igual a cuidarte". El proyecto utiliza la musicoterapia para regular niveles de cortisol y dopamina en segundos.De esta forma,está pensado para personas con largas jornadas que no disponen de tiempo para pausas largas, permitiéndoles transformar o mantener una emoción. Así pues, se logra cuando se toma el lenguaje escrito y  se transforma en otro lenguaje, el sonoro

//REFERENCIAS 
 //https://p5js.org/reference/
 //https://www.wordreference.com/sinonimos/ansiedad
 //https://coolors.co
 //Busqué pero decidí no usar ninguna - https://fonts.google.com
 //Ejercicios en clase y tareas
  //https://editor.p5js.org/Sara_Tibaduiza/full/HoOl3xsaw
  //https://editor.p5js.org/Sara_Tibaduiza/full/YRjq1_dqv
  //https://editor.p5js.org/Sara_Tibaduiza/full/nJYkUhU4r
  //https://editor.p5js.org/Sara_Tibaduiza/full/XMHUGphDW
  //https://editor.p5js.org/Sara_Tibaduiza/full/6JYkgCCTL
  //https://editor.p5js.org/Sara_Tibaduiza/full/6JYkgCCTL
  //https://editor.p5js.org/Sara_Tibaduiza/full/b-XKaOw4y
  //https://editor.p5js.org/Sara_Tibaduiza/full/FR8iGkRQC
  //https://editor.p5js.org/Sara_Tibaduiza/full/p4SYL_A2N
  //https://editor.p5js.org/Sara_Tibaduiza/full/W_k3IXPEe
  //https://editor.p5js.org/Sara_Tibaduiza/full/zGLGDg2tm
  //https://editor.p5js.org/Sara_Tibaduiza/sketches/HQ3Mi_U_i
  //https://editor.p5js.org/Sara_Tibaduiza/full/vcKfECCNa
  //https://editor.p5js.org/Sara_Tibaduiza/full/s1FeqnWrR
  //https://editor.p5js.org/Sara_Tibaduiza/full/qrC9erYp4
  //https://editor.p5js.org/Sara_Tibaduiza/full/k8L4lrzCo
  //https://editor.p5js.org/Sara_Tibaduiza/full/WqtsgosNL
  //https://editor.p5js.org/Sara_Tibaduiza/full/0IPzxW2Pvp
//202421044


// VARIABLES GLOBALES 

  //Para empezar desde la pantalla 0
    let pantalla = 0; 

  //Donde se escribe la emoción
    let inputTexto; 

  //Para entrar y generar diferentes pantallas
    let botonComenzar; 

  //Para transformar el estado de ánimo
    let botonProcesar; 

  //Para seguir con el mismo estado de ánimo
    let botonMantener; 

  //Para seguir y terminar con el proceso desde la pantalla 3
    let botonSeguir; 

  //Para terminar y resetear TODO
    let botonSatisfecho; 

  //Para volver a las opciones de música 
    let botonRegresar; 

  //Para generar los botones que almacenan la música
    let botonesMusica = []; 

  //Para que el color base (crema) cambie según la emoción
    let colorActual; 

  //Para que el color base de las letras cambie para contrastar
    let colorLetra; 

  //Para medir el volumen del audio - circulo y particulas
    let amplitud; 

  //Para medir la intensidad inicial de la emoción
    let slider; 
  
  //Para medir la emoción después de la música
    let sliderDos; 

  // Para combinar triste y feliz por medio de las canciones y los botones de mantener y transformar
    let quieroTransformar = false; 

// Variables para el audio 

  //Para las canciones tristes 
    let cancionesTristes = []; 

  //Para las canciones felices
    let cancionesFelices = []; 

  //Para la canción que se est reproduciendo en el momento según la elección
    let cancionActual; 

  //Para identificar el sentimiento y si no hay ninguno se mantiene neutro
    let modoActual = ""; 

  //Para las particulas que acompañan a la música (lo hice en la entrega de sonido)
    let particulas = []; 

// Palabras clave (base de las emociones)
 //Busqué en internet sinonimos de cada palabra para tener el "banco de palabras" lo más completo posible. 
    //https://www.wordreference.com/sinonimos/ansiedad

    //TRISTE
let palabrasTristeza = ["triste", "cansada", "agotada", "sueño", "tristeza", "sin energía", "cansado", "agotado", "pena", "desconsolado", "desconsolada", "desconsuelo","aflicción", "amargura", "amargado","amargada","melancolía","melancolico", "melancolica", "pesadumbre","pesar","quebranto","tribulación", "desdicha", "desdichado", "desdichada","nostalgia","nostalgica", "nostalgico", "mal"];

    //FELIZ
let palabrasFelicidad = ["feliz", "bien", "alegre", "contenta", "emocionada", "tranquila","contento", "dicha", "dichoso", "dichosa", "binestar", "suerte", "suertudo", "suertuda", "properidad", "prospero", "ventura", "fortuna", "afortunado", "afortunada", "alegría", "bonanza", "satisfacción", "satisfecho", "satisfecha", "parchada", "parchado"];


// FUNCTION PRELOAD

// Asegura que la música esté lista antes de abrir el canva
  function preload() {
    
   // Carga el archivo de sonido desde la carpeta assets.
    
      //Tristes
     cancionesTristes[0] = loadSound("assets/tristeuno.mp3");
     cancionesTristes[1] = loadSound("assets/tristedos.mp3");
     cancionesTristes[2] = loadSound("assets/tristetres.mp3");
      //Felices
     cancionesFelices[0] = loadSound("assets/felizuno.mp3");
     cancionesFelices[1] = loadSound("assets/felizdos.mp3");
     cancionesFelices[2] = loadSound("assets/feliztres.mp3");
}


// FUNCTION SETUP 

  function setup() {
  
     createCanvas(windowWidth, windowHeight).parent("canvasContainer");
  //sigue como siempre
  background(255, 255, 255);
     
  
  //Color crema - para no intervenir en con la emoción de la persona
     colorActual = color(255, 251, 231); 
  
  //Color inicial de la letra (café)
     colorLetra = color(128, 64, 0); 
    
  // Comienza a medir la amplitud y volumen
     amplitud = new p5.Amplitude(); 

  // Crea 100 partículas para acompañar la música (lo hice en la entrega de sonido)
     for (let i = 0; i < 100; i++) {
     particulas.push(new Particula());
 }
    
//Crear los botones iniciales

 // Botón entrar al diario -  Pantalla 0
  
   //crear
     botonComenzar = createButton("ENTRAR AL DIARIO");  
   //Posición
     botonComenzar.position(width / 2 - 100, height / 2 + 100); 
   //Estilo
     botonComenzar.style("background-color", "#F6FCFF");
     botonComenzar.style("border", "2px dashed #804000");
     botonComenzar.style("border-radius","20px");
     botonComenzar.style("font-size", "20px");
     botonComenzar.style("cursor", "pointer");
    //Para pasar de pantalla de la 0 a la 1
     botonComenzar.mousePressed(() => { pantalla = 1; }); 

 // Para escribir la emoción en la pantalla 1 
    
   //Cuadro blanco donde las personas pueden escribir la emoción
     inputTexto = createInput(''); 
   //Posición dentro del canva
     inputTexto.position(width / 2 - 150, height / 2 - 10);
   //Tamaño del cuadro de texto
     inputTexto.size(300, 35);

 // Slider 1
    
     slider = createSlider(10, 50, 25, 5);
    //Estilo
     slider.position(width / 2 - 125, height / 2 + 120);
     slider.style("width", "250px");
     slider.style("cursor", "pointer");
   //sobre el botón
     slider.mouseOver(cambiarOpacidad); 
   //fuera del boton
     slider.mouseOut(volverOpacidad);   

 // Slider 2
    
     sliderDos = createSlider(10, 50, 25, 5);
    //Estilo
     sliderDos.position(width / 2 - 125, height / 2 + 40); 
     sliderDos.style("width", "250px");
     sliderDos.style("cursor", "pointer");
    //sobre el botón
     sliderDos.mouseOver(cambiarOpacidadDos); 
    //fuera del boton
     sliderDos.mouseOut(volverOpacidadDos); 

 // Botón para transformar el ánimo
    
    //crear
     botonProcesar = createButton("TRANSFORMAR ÁNIMO");
     //Posición
     botonProcesar.position(width / 2 - 160, height / 2 + 200);
    //Estilo
     botonProcesar.style("background-color", "#F6FCFF");
     botonProcesar.style("border", "2px dashed #804000");
     botonProcesar.style("border-radius","15px");
     botonProcesar.style("font-size", "15px");
     botonProcesar.style("cursor", "pointer");
     botonProcesar.mousePressed(() => { 
    // Se llama a la lógica de combinación entre las emociones
     quieroTransformar = true; 
    // Se busca las palabras que representa a cada emoción
     analizarSentimiento(); 
    //Para pasar a la pantalla 2
     pantalla = 2; 
     });

 // Botón para mantener el ánimo 
    
    //crear
     botonMantener = createButton("MANTENER ÁNIMO");
     //Posición
     botonMantener.position(width / 2 + 30, height / 2 + 200);
    //Estilo
     botonMantener.style("background-color", "#F6FCFF");
     botonMantener.style("border", "2px dashed #804000");
     botonMantener.style("border-radius","15px");
     botonMantener.style("font-size", "15px");
     botonMantener.style("cursor", "pointer");
     botonMantener.mousePressed(() => { 
    // Se llama a la lógica de mantener el estado de ánimo por medio de la palabra clave
     quieroTransformar = false; 
    // Se busca las palabras que representa a cada emoción   
     analizarSentimiento(); 
    //Para pasar a la pantalla 2
     pantalla = 2; 
     });

 // Crear botones para elegir entre las canciones dependiendo de la opción que se escogió. Según la lista de las canciones que se crearon al inicio
    
   //Para el beat 1
     botonesMusica[0] = createButton("Beat 1");
   //Posición
     botonesMusica[0].position(width / 2 - 25, 240);
   //Para que sirva al tocar el botón
     botonesMusica[0].mousePressed(tocarBeatUno); 
   //Se oculta
     botonesMusica[0].hide(); 

    //Para el beat 2
     botonesMusica[1] = createButton("Beat 2");
    //Posición
     botonesMusica[1].position(width / 2 - 25, 290); 
    //Para que sirva al tocar el botón
     botonesMusica[1].mousePressed(tocarBeatDos); 
    //Se oculta
     botonesMusica[1].hide();

    //Para el beat 3
     botonesMusica[2] = createButton("Beat 3");
    //Posición
     botonesMusica[2].position(width / 2 - 25, 340); 
    //Para que sirva al tocar el botón
     botonesMusica[2].mousePressed(tocarBeatTres); 
    //Se oculta
     botonesMusica[2].hide();
  
 // Botón para retroceder desde la parte donde se escoge la música
    
    //crear
     botonRegresar = createButton("REGRESAR");
    //Posición
     botonRegresar.position(width / 2 - 40, 400); 
    //Estilo
     botonRegresar.style("background-color", "#F6FCFF");
     botonRegresar.style("border", "2px dashed #804000");
     botonRegresar.style("border-radius","15px");
     botonRegresar.style("font-size", "15px");
     botonRegresar.style("cursor", "pointer");
   //Para regresar a la pantalla
     botonRegresar.mousePressed(() => { pantalla = 1; });

 // Botón para pasar de pantalla. De la música a la última pantalla
    
    //crear
     botonSeguir = createButton("SIGUIENTE");
    //Posición
     botonSeguir.position(width / 2 - 45, height / 2 + 200);
    //Estilo
     botonSeguir.style("background-color", "#F6FCFF");
     botonSeguir.style("border", "2px dashed #804000");
     botonSeguir.style("border-radius","15px");
     botonSeguir.style("font-size", "15px");
     botonSeguir.style("cursor", "pointer");
     botonSeguir.mousePressed(() => { 
    //Cambiar de pantalla
     if (pantalla === 3) {
    // Detiene música al cambiar
     if(cancionActual) cancionActual.stop(); 
    // Va a la última pantalla
     pantalla = 4; 
     } else if (pantalla === 4) {
    // Se devuelve a la pantalla 2 
     pantalla = 2; 
     }
     });
  
 // Botón para terminar y resetear todo
    
    //crear
     botonSatisfecho = createButton("ESTOY SATISFECHO");
    //Posición
     botonSatisfecho.position(width / 2 + 30, height / 2 + 100);
    //Estilo
     botonSatisfecho.style("background-color", "#F6FCFF");
     botonSatisfecho.style("border", "2px dashed #804000");
     botonSatisfecho.style("border-radius","15px");
     botonSatisfecho.style("font-size", "15px");
     botonSatisfecho.style("cursor", "pointer");
     botonSatisfecho.mousePressed(resetTodo); 
    
     ocultarTodo(); 
     }


// FUNCTION DRAW 

  function draw() {
    // Dibuja el fondo según el ánimo 

     background(colorActual); 
     textAlign(CENTER); 
    //Para cambiar la tipografía
     fill(colorLetra); 
    //Para el estilo de tipografía
     textFont('Serif'); 

 // Títulos 
     textSize(32);
     text("DIARIO SENSORIAL", width / 2, 60);
     textSize(16);
     text("Un beat es igual a cuidarte.", width / 2, 90);
    
//Para las pantallas

    //Primera pantalla
     if (pantalla === 0) { 
     botonComenzar.show();
     text("A PARCHARTE UN RATICO", width / 2, height / 2 - 20);
     } else if (pantalla === 1) { 
     ocultarTodo();
     inputTexto.show();
     slider.show();
     botonProcesar.show();
     botonMantener.show();
     text("¿QUÉ ESTÁS SINTIENDO AHORA?", width / 2, height / 2 - 60);
     text("¿Cuál es el nivel de tú emoción?", width / 2, height / 2 + 100);
    //Pantalla 2
     } else if (pantalla === 2) { 
     ocultarTodo();
     let textoModo = modoActual;
     if(quieroTransformar) {
     textoModo = (modoActual === "triste") ? "para animarte" : "para equilibrarte";
     }
     text("Elige un beat " + textoModo, width / 2, 190); 
     for (let b of botonesMusica) b.show(); 
     botonRegresar.show();
    //Pantalla 3
     } else if (pantalla === 3) { 
     ocultarTodo();
    // Volumen que va de 0 a 1
     let nivel = amplitud.getLevel(); 

// Dibuja y mueve las partículas según la amplitud (lo hice en la entrega de sonido) - bolitas que se mueven 
     for (let p of particulas) {
     p.actualizar(nivel);
     p.mostrar();
     }
   

// Circulo que funciona según la amplitud de la canción
  
     let diametro = map(nivel, 0, 0.5, 100, 450); 
     fill(255, 255, 255, 200); 
     stroke(colorLetra); 
     strokeWeight(2); 
     ellipse(width / 2, height / 2, diametro, diametro); 
     noStroke();
     fill(colorLetra);
     textSize(14);
     text("click para play/pasa", width / 2, height - 50);

// Si la canción termina, muestra el botón para seguir
       
     if (cancionActual && !cancionActual.isPlaying()) {
     botonSeguir.position(width / 2 - 45, height / 2 + 200); 
     botonSeguir.html("SIGUIENTE"); 
     botonSeguir.show();
     } else {
     botonSeguir.hide();
     }
     } else if (pantalla === 4) { 
     ocultarTodo();
     botonSeguir.position(width / 2 - 160, height / 2 + 100);
     botonSeguir.html("SEGUIR ESCUCHANDO"); 
     botonSeguir.show();
     botonSatisfecho.show();
     sliderDos.show(); 
     fill(colorLetra); 
     noStroke();  
     textSize(25); 
     text("¿Cómo te sientes después de este beat?", width / 2, height / 2 - 20);
     }
      }


// FUNCIONES PERSONALIZADAS

//Para identificar e sentimiento que se escribió

  function analizarSentimiento() {
    
   // Pasa el texto a minusculas para identificar la palabra del banco de palabras (lo hice en la entrega 1 de olos botones)
    
     let frase = inputTexto.value().toLowerCase(); 
     modoActual = "neutral"; 

 // Busca sinonimos en el banco de palabras de tristeza
    
     for (let p of palabrasTristeza) {
     if (frase.includes(p)) {
    // Azul oscuro para tristeza
     colorActual = color(30, 60, 120); 
    // Letra blanca para contraste
     colorLetra = color(255); 
     modoActual = "triste"; 
     }
     }
  
 // Si no encontró tristeza, busca en el banco de palabras de felicidad
    
     if (modoActual === "neutral") {
     for (let p of palabrasFelicidad) {
     if (frase.includes(p)) {
       // Amarillo para felicidad
       colorActual = color(255, 255, 0); 
       // Letra negra para contraste
       colorLetra = color(0); 
       modoActual = "feliz"; 
     }
     }
     }
      }

// Opacidad en los sliders - visto en las últimas clases

    function cambiarOpacidad() { slider.style("opacity", "0.5"); }
    function volverOpacidad() { slider.style("opacity", "1"); }
    function cambiarOpacidadDos() { sliderDos.style("opacity", "0.5"); }
    function volverOpacidadDos() { sliderDos.style("opacity", "1"); }

// LÓGICA DE SELECCIÓN DE CANCIONES (CRUZADA)

  // Si la palabra es triste y NO quiere transformar, pone música triste.
  // Si la palabra es triste y SÍ quiere transformar, pone música feliz.

  function tocarBeatUno() {
    
    // Detiene la canción si hay una previa sonando 
      if (cancionActual) { cancionActual.stop(); } 
      if ((modoActual === "triste" && !quieroTransformar) || (modoActual === "feliz"       && quieroTransformar)) { 
      cancionActual = cancionesTristes[0]; 
       } else { 
      cancionActual = cancionesFelices[0]; 
       }
       if (cancionActual) { cancionActual.play(); pantalla = 3; }
       }

    //Misma lógica que el beat 1
  function tocarBeatDos() {
      if (cancionActual) { cancionActual.stop(); }
      if ((modoActual === "triste" && !quieroTransformar) || (modoActual ===              "feliz" && quieroTransformar)) { 
       cancionActual = cancionesTristes[1]; 
      } else { 
      cancionActual = cancionesFelices[1]; 
      }
     if (cancionActual) { cancionActual.play(); pantalla = 3; }
     }

    //Misma lógica que el beat 1

  function tocarBeatTres() {
     if (cancionActual) { cancionActual.stop(); }
     if ((modoActual === "triste" && !quieroTransformar) || (modoActual === "feliz"      && quieroTransformar)) { 
     cancionActual = cancionesTristes[2]; 
     } else { 
     cancionActual = cancionesFelices[2]; 
     }
     if (cancionActual) { cancionActual.play(); pantalla = 3; }
     }

//REINICIAR A LA PANTALLA 0

  function ocultarTodo() {
    
   //Se ocultan todos los elementos 
     botonComenzar.hide();
     inputTexto.hide();
     slider.hide();
     sliderDos.hide();
     botonProcesar.hide();
     botonMantener.hide();
     botonSeguir.hide();
     botonSatisfecho.hide();
     botonRegresar.hide();
     for (let b of botonesMusica) b.hide();
      }

     function resetTodo() {
     if (cancionActual) cancionActual.stop(); 
     pantalla = 0; 
     colorActual = color(255, 251, 231); 
     colorLetra = color(128, 64, 0);     
     inputTexto.value(''); 
     slider.value(25); 
     sliderDos.value(25); 
     quieroTransformar = false; 
     ocultarTodo(); 
     }


// EVENTOS DEL MOUSE Y TECLADO 

//Ajustar el tamaño cuando cambia el tamaño de la pantalla
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Para poder parar y poner la música otra vez

  function mousePressed() {
    
 // haciendo click en la pantalla 3
    
     if (pantalla === 3 && cancionActual) {
     if (cancionActual.isPlaying()) {
     cancionActual.pause();
     } else {
     cancionActual.play();
     }
     }
      }


// CLASS PARTÍCULA 

// últimas cositas de las particulas (lo hice en la entrega de sonido)
 //Utilicé lo que aprendimos en clase de "class" para mejorar y que fuera más fácil 

     class Particula {
     constructor() {
    // Posición horizontal aleatoria
     this.x = random(width); 
    // Posición vertical aleatoria
     this.y = random(height); 
    // Velocidad 
     this.vel = random(1, 3); 
    // Tamaño aleatorio de cada bolita - particula
     this.tam = random(5, 15); 
     }
     actualizar(n) {
       
  // Mueve la partícula hacia arriba. La velocidad aumenta con el volumen de la  canción
       
     this.y -= this.vel * (n * 10); 
  // Si sale por arriba, reaparece abajo
     if (this.y < 0) this.y = height; 
     }
     mostrar() {
       
  // Dibuja la partícula en el canva
     fill(colorLetra); 
     noStroke();
     circle(this.x, this.y, this.tam);
     }
    }