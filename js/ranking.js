addEventListener('load', function() {
    var divList = document.getElementById('list_ranking');
    var nom = (JSON.parse(localStorage.getItem("nickname"))).ranking;
    var punts = 0;

    listRank.sort(function(a, b) {
        return b[1] - a[1];
    });
    
    for (let i = 0; i < nom.length; i++) {
        var newP = document.createElement('p');
        newP.innerText = i+1 + " - Nom: " + nom + " Puntos: " + punts
        divList.appendChild(newP);
    }    
});