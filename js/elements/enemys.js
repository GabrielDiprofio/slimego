var enemys = {
  list: {},
   create: function(id, x, y) {
     enemys.list[id] = {
       class: 'enemys',
       id: id,
       x: x,
       y: y,
       width: 40,
       height: 40,
       image: new Image(),
       speed: 1,
       jumpForce: null,
       maxJumpForce: 6,
       direction: 'right',
       checkCollision: function() {
         var i, collisionSide, hasCollisionBottom = false;
         for (i = 0; i < game.elements.length; i++) {
           collisionSide = collision.boxesSide(enemys.list[id], game.elements[i]);
           if(collisionSide) {
             if(collisionSide === 'left' && this.direction == 'left') {
               this.direction = 'right';
             } else if(collisionSide === 'right' && this.direction == 'right') {
               this.direction = 'left';
             } else if(collisionSide === 'top') {
               if(this.jumpForce >= 0) {
                 this.jumpForce = -0.2;
               }
             } else if(collisionSide === 'bottom') {
               this.jumpForce = null;
               this.y = game.elements[i].y - this.height;
               hasCollisionBottom = true;
             }
           }
         }
         if(!hasCollisionBottom && this.jumpForce === null) {
           this.jumpForce = -0.2;
         }
       },
       move: function() {
         if(this.direction == 'left') {
           this.x -= this.speed;
         } else if(this.direction == 'right') {
           this.x += this.speed;
         }
         if(typeof this.jumpForce === 'number') {
           this.y -= this.jumpForce;
           if(this.jumpForce >= -this.maxJumpForce) {
             this.jumpForce -= 0.2;
           }
         }
       },
       checkJump: function() {
         if(this.jumpForce === null && Math.random() < 0.01) {
           this.jumpForce = this.maxJumpForce;
         }
       },
       fixNumbers: function() {
         if(typeof this.x === 'number') this.x = Math.round(this.x * 100) / 100;
         if(typeof this.y === 'number') this.y = Math.round(this.y * 100) / 100;
         if(typeof this.jumpForce === 'number') this.jumpForce = Math.round(this.jumpForce * 100) / 100;
       },
       init: function() {
         this.image.src = 'img/sprite/zombie.png';
       },
       update: function() {
         this.fixNumbers();
         this.checkJump();
         this.move();
         this.checkCollision();
       },
       render: function() {
         game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
       }
     }
   }
}
