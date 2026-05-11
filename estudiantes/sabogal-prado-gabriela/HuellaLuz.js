// Clase HuellaLuz
// Esta clase crea las ondas de luz que aparecen en Contemplar.

class HuellaLuz {
  constructor(x, y) {
    this.x = x + random(-10, 10);
    this.y = y + random(-10, 10);
    this.tam = random(20, 45);
    this.vida = 120;
  }

  actualizar() {
    this.tam = this.tam + 1.3;
    this.vida = this.vida - 2.5;
  }

  dibujar() {
    noFill();
    stroke(255, 255, 255, this.vida);
    strokeWeight(1);

    circle(this.x, this.y, this.tam);
    circle(this.x, this.y, this.tam + 18);

    noStroke();
    fill(255, 255, 255, this.vida / 5);
    circle(this.x, this.y, this.tam / 2);
  }
}