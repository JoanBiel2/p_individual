addEventListener('load', function() {
    document.getElementById('aplicar').addEventListener('click', function(){
        sessionStorage.mode = document.getElementById('mode').value;
        var nickname = document.getElementById('nickname').value.trim();
        if (nickname ==="") alert ("Insereix el teu nom d'usuari");
        else window.location.assign("../html/phasergame.html");
    });
});