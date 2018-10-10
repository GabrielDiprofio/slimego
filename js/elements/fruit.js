var fruit = {
  list: {},
  create: function(id, x, y) {
    fruit.list[id] = {
      class: 'fruit',
      id: id,
      x: x,
      y: y,
      width: 15,
      height: 15,
      image: new Image(),
      init: function() {
        this.image.src = 'img/sprite/fruit.png';
      },
      update: function() { },
      die: function() {
        var index = game.elements.indexOf(this);
        var id = this.id;
        game.elements.splice(index, 1);
        fruit.list[id] = undefined;
        delete fruit.list[id];
      },
      render: function() {
        game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    };
  }
};
