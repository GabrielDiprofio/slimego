var game = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  backgroundColor: '#94ddd5',
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
    wall.create('i1', this.width*0.3, this.height*0.4, this.width*0.2, this.height*0.15);
    wall.create('i2', this.width*0, this.height*0.5, this.width*0.7, this.height*0.05);
    wall.create('i5', this.width*0.8, this.height*0.5, this.width*0.2, this.height*0.05);    
    wall.create('i3', this.width*0.7, this.height*0.7, this.width*0.1, this.height*0.95);
    wall.create('i4', this.width*0.3, this.height*0.9, this.width*0.5, this.height*0.08);
    for (var key in wall.list) {
      if (wall.list.hasOwnProperty(key)) {
        this.elements.push(wall.list[key]);
      }
    }
    this.elements.push(player);
    this.elements.push(enemy);
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].init();
    }
    setInterval(this.update.bind(this), 1000/60);
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
  over: function() {
    this.state = gameStatesEnum.over;
  },
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
    this.render();
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
        case gameStatesEnum.over:
          text.draw('Perdiste', '#f00');
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
