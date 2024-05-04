addEventListener('load', function() {
    var taula = document.getElementById('ranking');
    var nom = (JSON.parse(localStorage.getItem("mode")));
    var punts = 0;

    nom.sort(function(a, b) {
        return b[1] - a[1];
    });
    
    for (let i = 0; i < nom.length; i++) {
        var newP = document.createElement('p');
        newP.innerText = i+1 + " - Nom: " + nom[i][0] + " Puntos: " + punts[i][1]
        taula.appendChild(newP);
    }    
});