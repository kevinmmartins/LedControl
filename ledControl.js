const robot = require('johnny-five');
let board = new robot.Board();
 
board.on('ready', function() {
  let  led = new robot.Led(13);
  led.blink(500);
});