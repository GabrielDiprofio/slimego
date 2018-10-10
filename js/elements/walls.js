var wall = {
  list: {},
  create: function(id, x, y, width, height) {
    wall.list[id] = {
      id: id,
      x: x,
      y: y,
      width: width,
      height: height,
      init: function() {},
      update: function() {},
      render: function() {
        var image = new Image();
        image.src = 'img/sprite/block.png';
        var pattern = game.context.createPattern(image, 'repeat');
        game.context.fillStyle = pattern;
        game.context.fillRect(this.x, this.y, this.width, this.height);
      }
    };
  }
};
