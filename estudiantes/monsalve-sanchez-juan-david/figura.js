class Figura {
  constructor(x, y, tam, c, forma, objetivo = false) {
    this.x = x;
    this.y = y;

    this.tam = tam;

    this.color = c;

    this.forma = forma;

    this.objetivo = objetivo;

    this.velY = random(0.2, 0.6);
  }

  mostrar() {
    fill(this.color);

    // figura especial

    if (this.objetivo) {
      let oscuro = color(
        red(this.color) * 0.5,
        green(this.color) * 0.5,
        blue(this.color) * 0.5
      );

      stroke(oscuro);
      strokeWeight(3);
    } else {
      noStroke();
    }

    // circulo

    if (this.forma === "circulo") {
      circle(this.x, this.y, this.tam);
    }

    // cuadrado

    if (this.forma === "cuadrado") {
      rectMode(CENTER);

      rect(this.x, this.y, this.tam, this.tam);
    }

    // triangulo

    if (this.forma === "triangulo") {
      triangle(
        this.x,
        this.y - this.tam / 2,

        this.x - this.tam / 2,
        this.y + this.tam / 2,

        this.x + this.tam / 2,
        this.y + this.tam / 2
      );
    }
  }

  moverInfinito() {
    if (this !== figuraAgarrada) {
      this.y += this.velY;
    }
  }

  hover() {
    let d = dist(mouseX, mouseY, this.x, this.y);

    if (d < this.tam) {
      let dx = this.x - mouseX;
      let dy = this.y - mouseY;

      this.x += dx * 0.03;
      this.y += dy * 0.03;
    }
  }
}
