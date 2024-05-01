addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', 
    function(){
        sessionStorage.removeItem("save");
        window.location.assign("./html/mode.html");
    });

    document.getElementById('saves').addEventListener('click', 
    function(){
        sessionStorage.save = localStorage.save
        window.location.assign("./html/phasergame.html");
    });

    document.getElementById('options').addEventListener('click', 
    function(){
        window.location.assign("./html/options.html");
    });

    document.getElementById('ranking').addEventListener('click', 
    function(){
        window.location.assign("./html/puntuacions.html");
    });

    document.getElementById('exit').addEventListener('click', 
    function(){
        console.warn("No es pot sortir!");
    });
});