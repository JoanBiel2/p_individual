var start = $('#play');
var options = $('#options');
var saves = $('#saves');
var exit = $('#exit');

start.on('click',function() {
    window.location.assign("./html/game.html");
  });

options.on('click',function() {
     window.location.assign("./html/options.html");
  });

saves.on('click',function() {
        console.error("Opció no implementada");
    });

exit.on('click',function() {
        console.warn("No es pot sortir!");
    });