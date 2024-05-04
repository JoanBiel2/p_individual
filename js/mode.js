addEventListener('load', function() {
    document.getElementById('aplicar').addEventListener('click', function(){
        sessionStorage.mode = document.getElementById('mode').value;
        sessionStorage.nickname = document.getElementById('nickname').value.trim()
        if (sessionStorage.nickname ==="") alert ("Insereix el teu nom d'usuari");
        else window.location.assign("../html/phasergame.html");
    });
});