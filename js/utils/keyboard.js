var keyboard = {
  up: false,
  left: false,
  right: false,
  p: false,
  e: false,
  press: function(evt) {
    console.log(evt.code);
    var key = keyboardEnum[evt.code];
    if (key) {
      keyboard[key] = true;
    }
  },
  release: function(evt) {
    var key = keyboardEnum[evt.code];
    if (key) {
      keyboard[key] = false;
    }
  }
};

var keyboardEnum = {
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyP: 'p',
  KeyE: 'e',
  KeyC: 'e',
  KeyW: 'up',
  KeyA: 'left',
  KeyD: 'right',
/*  KeyZ:
  KeyX:
  Space:
  Enter:*/
};
