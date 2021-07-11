var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var pos = { x: 0, y: 0 };

document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

// new position from mouse event
function setPosition(event) {


  var bounds = canvas.getBoundingClientRect();
  // get the mouse coordinates, subtract the canvas top left and any scrolling
  pos.x = event.pageX - bounds.left - scrollX;
  pos.y = event.pageY - bounds.top - scrollY;

}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return;
  
  
  ctx.beginPath(); // begin

  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000000';
  ctx.moveTo(pos.x, pos.y ); // from
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!

}