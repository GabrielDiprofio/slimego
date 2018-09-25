var game = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  backgroundColor: '#222',
  context: null,
  state: null,
  lastStateChange: 30,
  elements: [],
  start: function(canvas) {
    this.x = canvas.x;
    this.y = canvas.y;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.context;
    this.state = gameStatesEnum.playing;
    wall.create('top', 0, -980, game.width, 1000);
    wall.create('bottom', 0, game.height-20, game.width, 1000);
    wall.create('left', -980, 0, 1000, game.height);
    wall.create('right', game.width-20, 0, 1000, game.height);
    this.elements.push(wall.list.top);
    this.elements.push(wall.list.bottom);
    this.elements.push(wall.list.left);
    this.elements.push(wall.list.right);
    this.elements.push(player);
    for (var i = 0; i < game.elements.length; i++) {
      this.elements[i].init();
    }
    setInterval(game.update.bind(this), 1000/60);
  },
  pause: function() {
    if (this.state === gameStatesEnum.pause) {
      this.state = gameStatesEnum.playing;
    } else if (this.state === gameStatesEnum.playing) {
      this.state = gameStatesEnum.pause;
    }
    this.lastStateChange = 0;
  },
  win: function() {},
  over: function() {},
  update: function() {
    ++this.lastStateChange;
    if (this.state === gameStatesEnum.playing) {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].update();
      }
    }
    if (keyboard.p && this.lastStateChange > 30) {
      this.pause();
    }
    game.render();
  },
  render: function() {
    if(this.state === gameStatesEnum.playing) {
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(this.x, this.y, this.width, this.height);
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].render();
      }
    } else {
      this.context.fillStyle = 'rgba(50, 50, 50, 0.01)';
      this.context.fillRect(this.x, this.y, this.width, this.height);
      switch(this.state) {
        case gameStatesEnum.pause:
          text.draw('Pausa', '#fe0');
          break;
      }
    }
  }
};

var gameStatesEnum = {
  playing: 'playing',
  pause: 'pause',
  win: 'w',
  over: 'o'
};
