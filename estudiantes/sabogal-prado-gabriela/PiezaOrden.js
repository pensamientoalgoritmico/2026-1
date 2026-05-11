// Clase PiezaOrden
// Esta clase crea las piezas que se arrastran en la escena Ordenar.

class PiezaOrden {
  constructor(x, y, ancho, alto, tipo, r, g, b, a, hitbox) {
    this.x = x;
    this.y = y;

    this.inicioX = x;
    this.inicioY = y;

    this.ancho = ancho;
    this.alto = alto;
    this.tipo = tipo;

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    this.hitbox = hitbox;
  }

  dibujar() {
    noStroke();

    if (this.estaEnZona() === true) {
      fill(this.r, this.g, this.b, 80);
      circle(this.x, this.y, this.ancho + 70);
    }

    fill(this.r, this.g, this.b, this.a);

    if (this.tipo === "circulo") {
      this.dibujarCirculo();
    }

    if (this.tipo === "estrella") {
      this.dibujarEstrellaOrden();
    }

    if (this.tipo === "orbita") {
      this.dibujarOrbita();
    }

    if (this.tipo === "flor") {
      this.dibujarFlor();
    }

    if (this.estaEnZona() === true) {
      this.dibujarBrillito();
    }
  }

  dibujarCirculo() {
    fill(this.r, this.g, this.b, this.a / 2);
    circle(this.x, this.y, this.ancho + 45);

    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.ancho);

    fill(255, 255, 255, 90);
    circle(this.x - this.ancho / 6, this.y - this.ancho / 6, this.ancho / 3);
  }

  dibujarEstrellaOrden() {
    push();
    translate(this.x, this.y);

    fill(this.r, this.g, this.b, this.a / 2);
    circle(0, 0, this.ancho + 35);

    fill(this.r, this.g, this.b, this.a);

    beginShape();
    vertex(0, -this.ancho / 2);
    bezierVertex(
      this.ancho / 12,
      -this.ancho / 6,
      this.ancho / 6,
      -this.ancho / 12,
      this.ancho / 2,
      0
    );
    bezierVertex(
      this.ancho / 6,
      this.ancho / 12,
      this.ancho / 12,
      this.ancho / 6,
      0,
      this.ancho / 2
    );
    bezierVertex(
      -this.ancho / 12,
      this.ancho / 6,
      -this.ancho / 6,
      this.ancho / 12,
      -this.ancho / 2,
      0
    );
    bezierVertex(
      -this.ancho / 6,
      -this.ancho / 12,
      -this.ancho / 12,
      -this.ancho / 6,
      0,
      -this.ancho / 2
    );
    endShape();

    pop();
  }

  dibujarOrbita() {
    push();
    translate(this.x, this.y);

    fill(this.r, this.g, this.b, this.a / 2);
    circle(0, 0, this.ancho + 40);

    noFill();
    stroke(this.r, this.g, this.b, this.a);
    strokeWeight(2);

    ellipse(0, 0, this.ancho, this.alto / 2);
    rotate(45);
    ellipse(0, 0, this.ancho, this.alto / 2);
    rotate(45);
    ellipse(0, 0, this.ancho, this.alto / 2);

    noStroke();
    fill(255, 255, 255, 160);
    circle(0, 0, this.ancho / 4);

    pop();
  }

  dibujarFlor() {
    push();
    translate(this.x, this.y);

    fill(this.r, this.g, this.b, this.a / 2);
    circle(0, 0, this.ancho + 45);

    fill(this.r, this.g, this.b, this.a);

    for (let i = 0; i < 6; i = i + 1) {
      push();
      rotate(i * 60);
      ellipse(0, -this.ancho / 4, this.ancho / 2, this.alto / 2);
      pop();
    }

    fill(255, 255, 255, 150);
    circle(0, 0, this.ancho / 3);

    pop();
  }

  dibujarBrillito() {
    push();
    translate(this.x + this.ancho / 2, this.y - this.alto / 2);
    scale(0.35);

    fill(255, 255, 255, 170);

    beginShape();
    vertex(0, -42);
    bezierVertex(6, -10, 10, -6, 42, 0);
    bezierVertex(10, 6, 6, 10, 0, 42);
    bezierVertex(-6, 10, -10, 6, -42, 0);
    bezierVertex(-10, -6, -6, -10, 0, -42);
    endShape();

    pop();
  }

  estaEnZona() {
    if (
      this.x > 400 &&
      this.x < 800 &&
      this.y > 140 &&
      this.y < 540
    ) {
      return true;
    } else {
      return false;
    }
  }

  estaEncima() {
    if (
      mouseX > this.x - this.hitbox / 2 &&
      mouseX < this.x + this.hitbox / 2 &&
      mouseY > this.y - this.hitbox / 2 &&
      mouseY < this.y + this.hitbox / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  mover() {
    this.x = mouseX;
    this.y = mouseY;
  }

  reiniciar() {
    this.x = this.inicioX;
    this.y = this.inicioY;
  }
}