var player = {
  x: 100,
  y: 0,
  width: 40,
  height: 25,
  backgroundColor: '#303',
  speed: 3,
  score: 0,
  move: function () {
    if (keyboard.left) {
      this.x -= this.speed;
    } else if (keyboard.right) {
      this.x += this.speed;
    }
  },
  update: function() {
    this.move();
  },
  init: function() {
    this.y = wall.list['bottom'].y - this.height;
  },
  render: function () {
    game.context.fillStyle = this.backgroundColor;
    game.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
