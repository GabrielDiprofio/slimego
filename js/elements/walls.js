var wall = {
  list: {},
  create: function(id, x, y, width, height) {
    wall.list[id] = {
      id: id,
      x: x,
      y: yx
      width: width,
      height: height,
      background: '#333',
      init: function() {},
      update: function() {},
      render: function() {
        game.context.fillStyle = this.backgroundColor;
        game.context.fillRect(this.x, this.y, this.width, this.height);
      }
    };
  }
};
