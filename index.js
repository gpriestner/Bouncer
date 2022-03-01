console.log("Starting. . . ");
var canvas = document.querySelector("canvas");
var view = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
view.fillStyle = "white";
view.strokeStyle = "white";
addEventListener("resize", resize);

function resize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  view.fillStyle = "white";
}

class Ball {
  x = 0;
  y = 0;
  dx = 4;
  dy = 4;
  dmax = 4;
  width = 5;
  height = 10;
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.dx = Math.random() * this.dmax - 2;
    this.dy = Math.random() * this.dmax - 2;
  }
  update() {
    // detect edge for bounce
    if (this.x < 0 || this.x > canvas.width) this.dx = -this.dx;
    if (this.y < 0 || this.y > canvas.height) this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
  draw() {
    // draw square 'ball'
    view.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );

    // draw round ball (takes longer than square)
    view.beginPath();
    view.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    view.fill();
  }
}

var balls = [];
for (let i = 0; i < 100; ++i) {
  balls.push(new Ball());
}

function animate(timestamp) {
  console.log("animating. . . ");
  view.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.update();
  });

  for (let i = 0; i < balls.length; ++i) {
    for (let j = i + 1; j < balls.length; ++j) {
      const x = (balls[i].x - balls[j].x) ** 2;
      const y = (balls[i].y - balls[j].y) ** 2;
      const dist = 200 - Math.sqrt(x + y);
      if (dist < 200) {
        const strokeStyle = `rgba(255, 255, 255, ${dist / 80})`;
        view.strokeStyle = strokeStyle;

        view.beginPath();
        view.moveTo(balls[i].x, balls[i].y);
        view.lineTo(balls[j].x, balls[j].y);
        view.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
