// Nombre: Daniela Lucía Rodríguez Rojas

// Proyecto: MoodBloom

// Descripción: MoodBloom es una herramienta interactiva donde el usuario visualiza sus emociones a través de flores generativas. Cada emoción modifica el comportamiento y apariencia de las flores, creando una metáfora visual del estado emocional.

// Este proyecto busca representar emociones a través de flores generativas.
//La idea nació del journaling y de cómo escribir pensamientos puede ayudar a entender mejor lo que sentimos.

// Decisiones de diseño:
// - Uso de color para representar emociones (amarillo = felicidad, azul = tristeza, rojo = enojo, rosado = enamorad_ gris = cansancio)
// - Movimiento para expresar estados (vibración = enojo, caída = tristeza) // - Interacción simple (click y selección) para hacerlo intuitivo



// Cada emoción cambia:
// - el color del fondo
// - la forma de la flor
// - el movimiento de la flor

// También se puede escribir un pensamiento corto antes de plantar cada flor, haciendo que cada una funcione como un pequeño recuerdo emocional.

// No usé imágenes ni audios externos.
// Todo está hecho con formas básicas de p5.js.



// emoción actual del usuario
let emocion = "feliz";

// aquí se guardan todas las flores
let flores = [];

// cuadro donde la persona escribe
let inputSentimiento;



function setup() {

  // crea el canvas ocupando toda la pantalla
  createCanvas(windowWidth, windowHeight)
    .parent("canvasContainer");

  //Cuadro tipo diario

  // createElement permite crear elementos HTML
  // en este caso un textarea para escribir
  inputSentimiento = createElement("textarea");

  // posición del cuadro
  inputSentimiento.position(30, 30);

  // tamaño del cuadro
  inputSentimiento.size(220, 90);

  // estilos visuales para que parezca
  // una pequeña hoja de diario
  inputSentimiento.style("padding", "15px");

  inputSentimiento.style(
    "border",
    "2px solid #d8cfc4"
  );

  inputSentimiento.style(
    "border-radius",
    "8px"
  );

  inputSentimiento.style(
    "background",
    "#fffdf8"
  );

  inputSentimiento.style(
    "font-size",
    "15px"
  );

  inputSentimiento.style(
    "font-family",
    "Georgia"
  );

  inputSentimiento.style(
    "color",
    "#5c4b51"
  );

  inputSentimiento.style(
    "outline",
    "none"
  );

  // evita que el usuario pueda agrandar el cuadro manualmente
  inputSentimiento.style(
    "resize",
    "none"
  );

  inputSentimiento.style(
    "box-shadow",
    "2px 2px 10px rgba(0,0,0,0.08)"
  );

  // texto guía dentro del cuadro
  inputSentimiento.attribute(
    "placeholder",
    "querido diario..."
  );
}



function draw() {

  // el fondo cambia dependiendo
  // de la emoción seleccionada

  // la felicidad tiene tonos cálidos
  if (emocion === "feliz") {

    background(255, 232, 150);

  }

  // la tristeza usa tonos fríos
  else if (emocion === "triste") {

    background(190, 210, 255);

  }

  // el enojo usa tonos rojizos
  else if (emocion === "enojada") {

    background(255, 190, 190);

  }

  // enamorada usa colores rosados
  else if (emocion === "enamorada") {

    background(255, 220, 235);

  }

  // cansancio usa colores más apagados
  else if (emocion === "cansada") {

    background(210, 210, 210);
  }

  // suelo del jardín
  noStroke();

  fill(120, 200, 120);

  rect(
    0,
    height * 0.7,
    width,
    height * 0.3
  );

  // recorrer todas las flores para actualizarlas y dibujarlas
  for (let f of flores) {

    f.actualizar();

    f.mostrar();
  }

  dibujarUI();
}



// clase principal de las flores
class Flor {

  constructor(
    x,
    y,
    c,
    tamaño,
    emocion,
    texto
  ) {

    //posición de la flor
    this.x = x;
    this.y = y;

    // color
    this.c = c;

    // tamaño
    this.tamaño = tamaño;

    // emoción guardada
    this.emocion = emocion;

    // texto escrito por la persona
    this.texto = texto;

    // número aleatorio para que
    // cada flor se mueva diferente
    this.offset = random(1000);
  }



  actualizar() {

    let t =
      frameCount * 0.05 +
      this.offset;

    //feliz

    // las flores felices "respiran" creciendo y encogiéndose
    if (this.emocion === "feliz") {

      this.tamaño += sin(t) * 0.3;
    }

    //triste

    // las flores tristes bajan lentamente
    // como si estuvieran cayendo
    else if (
      this.emocion === "triste"
    ) {

      this.y += 0.2;
    }

    //enojada

    // el movimiento brusco representa
    // ansiedad o rabia
    else if (
      this.emocion === "enojada"
    ) {

      this.x += random(-2, 2);

      this.y += random(-2, 2);
    }

    //enamorada

    // las flores enamoradas
    // tienen movimiento suave
    else if (
      this.emocion === "enamorada"
    ) {

      this.tamaño += sin(t) * 0.5;
    }

    //cansada

    // poco a poco se hacen más pequeñas
    else if (
      this.emocion === "cansada"
    ) {

      this.tamaño *= 0.999;
    }
  }



  mostrar() {

    push();

    // mueve el sistema de coordenadas
    // a la posición de la flor
    translate(this.x, this.y);

    noStroke();



    //flor feliz

    // usa muchos pétalos redondos inspirados en girasoles
    if (this.emocion === "feliz") {

      fill(240, 178, 10);

      for (let i = 0; i < 10; i++) {

        rotate(TWO_PI / 10);

        ellipse(
          0,
          this.tamaño / 2,
          this.tamaño / 2,
          this.tamaño
        );
      }

      fill(255, 230, 100);

      ellipse(
        0,
        0,
        this.tamaño / 2
      );
    }



    //flor triste

    // pétalos largos que caen
    else if (
      this.emocion === "triste"
    ) {

      fill(this.c);

      for (let i = 0; i < 6; i++) {

        rotate(TWO_PI / 6);

        ellipse(
          0,
          this.tamaño / 2,
          this.tamaño / 3,
          this.tamaño * 1.5
        );
      }

      fill(200);

      ellipse(
        0,
        0,
        this.tamaño / 3
      );
    }



    // lor enojada

    // usa triángulos para verse más agresiva y puntiaguda
    else if (
      this.emocion === "enojada"
    ) {

      fill(this.c);

      for (let i = 0; i < 8; i++) {

        rotate(TWO_PI / 8);

        triangle(
          0,
          0,
          -this.tamaño / 3,
          this.tamaño,
          this.tamaño / 3,
          this.tamaño
        );
      }

      fill(50);

      ellipse(
        0,
        0,
        this.tamaño / 3
      );
    }



    //flor enamorada

    // usa curvas para crear pétalos más suaves y orgánicos
    else if (
      this.emocion === "enamorada"
    ) {

      fill(this.c);

      for (let i = 0; i < 6; i++) {

        rotate(TWO_PI / 6);

        beginShape();

        vertex(0, 0);

        bezierVertex(
          -this.tamaño / 2,
          -this.tamaño / 2,
          -this.tamaño,
          this.tamaño / 3,
          0,
          this.tamaño
        );

        bezierVertex(
          this.tamaño,
          this.tamaño / 3,
          this.tamaño / 2,
          -this.tamaño / 2,
          0,
          0
        );

        endShape(CLOSE);
      }

      fill(255);

      ellipse(
        0,
        0,
        this.tamaño / 2
      );
    }



    //flor cansada

    // pétalos pequeños y caídos
    else if (
      this.emocion === "cansada"
    ) {

      fill(this.c);

      for (let i = 0; i < 5; i++) {

        rotate(TWO_PI / 5);

        ellipse(
          0,
          this.tamaño / 3,
          this.tamaño / 4,
          this.tamaño / 2
        );
      }

      fill(150);

      ellipse(
        0,
        0,
        this.tamaño / 4
      );
    }



    //mostrar texto del diario

    // el texto aparece encima de la flor como si fuera un pensamiento
    fill(70);

    textSize(11);

    textAlign(LEFT);

    text(
      this.texto,
      -70,
      -this.tamaño - 40,
      140,
      80
    );

    pop();
  }
}



function mousePressed() {

  let c;

  let tamaño = 30;

  // cada emoción tiene un color diferente
  if (emocion === "feliz") {

    c = color(255, 200, 0);

  }

  else if (
    emocion === "triste"
  ) {

    c = color(100, 150, 255);

  }

  else if (
    emocion === "enojada"
  ) {

    c = color(255, 80, 80);

  }

  else if (
    emocion === "enamorada"
  ) {

    c = color(255, 150, 200);

  }

  else {

    c = color(180);
  }

  // crear nueva flor usando la emoción y texto actual
  flores.push(

    new Flor(
      mouseX,
      mouseY,
      c,
      tamaño,
      emocion,
      inputSentimiento.value()
    )
  );

}



function dibujarUI() {

  // título
  fill(70);

  textAlign(LEFT);

  textSize(22);

  text(
    "MoodBloom 🌷",
    30,
    170
  );

  //subtítulo
  textSize(13);

  fill(110);

  text(
    "un jardín emocional",
    30,
    190
  );

  // instrucciones simples
  textSize(14);

  fill(60);

  text(
    "1 feliz   2 triste   3 enojada   4 enamorada   5 cansada   S guardar",
    30, height - 20);
}



function keyPressed() {

  //cambiar emociones usando números

  if (key === "1") {

    emocion = "feliz";
  }

  if (key === "2") {

    emocion = "triste";
  }

  if (key === "3") {

    emocion = "enojada";
  }

  if (key === "4") {

    emocion = "enamorada";
  }

  if (key === "5") {

    emocion = "cansada";
  }

  //guardar screenshot

  // solo funciona si la persona no está escribiendo
  if (
    (key === "s" || key === "S") &&
    document.activeElement !== inputSentimiento.elt
  ) {

    saveCanvas(
      "moodbloom-journal",
      "png"
    );
  }
}



// ajusta el canvas cuando cambia el tamaño de la ventana
function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );
}