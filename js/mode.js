addEventListener('load', function() {
    document.getElementById('aplicar').addEventListener('click', 
    function(){
        sessionStorage.removeItem("save");
        window.location.assign("./html/options.html");
    });
});