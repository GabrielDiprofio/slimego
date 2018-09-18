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
      game.elements[i].init();
    }
    setInterval(game.update, 1000/60);
  },
  pause: function() {
    if (game.state === gameStatesEnum.pause) {
      game.state = gameStatesEnum.playing;
    } else if (game.state === gameStatesEnum.playing) {
      game.state = gameStatesEnum.pause;
    }
    game.lastStateChange = 0;
  },
  win: function() {},
  over: function() {},
  update: function() {
    ++game.lastStateChange;
    if (game.state === gameStatesEnum.playing) {
      for (var i = 0; i < game.elements.length; i++) {
        game.elements[i].update();
      }
    }
    if (keyboard.p && game.lastStateChange > 30) {
      game.pause();
    }
    game.render();
  },
  render: function() {
    if(game.state === gameStatesEnum.playing) {
      game.context.fillStyle = game.backgroundColor;
      game.context.fillRect(game.x, game.y, game.width, game.height);
      for (var i = 0; i < game.elements.length; i++) {
        game.elements[i].render();
      }
    } else {
      game.context.fillStyle = 'rgba(50, 50, 50, 0.01)';
      game.context.fillRect(game.x, game.y, game.width, game.height);
      switch(game.state) {
        case gameStatesEnum.pause:
          text.draw('Pausa', '#00f');
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
