var options = (function(){
    const default_options = {
        pairs: 2,
        difficulty: 'normal',
        dif2: 1,
        pointRanking: 0
    };
    
    var pairs = $('#pairs');
    var difficulty = $('#difficulty');
    var dif2 = $('#dif2');

    var options = JSON.parse(localStorage.options || JSON.stringify(default_options));
    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    dif2.val(options.dif2);
    
    pairs.on('change', function() {
        options.pairs = parseInt(pairs.val()); // Actualizar el valor de pares en opciones
    });

    difficulty.on('change', function() {
        options.difficulty = difficulty.val(); // Actualizar la dificultad en opciones
    });

    dif2.on('change', function() {
        options.dif2 = parseInt(dif2.val()); // Actualizar dif2 en opciones
    });
   
    return { 
        applyChanges: function(){
            options.pointRanking = 0;
            if (!localStorage.ranking) {
                options.ranking = []; // Inicializar ranking si no existe en localStorage
            }
            localStorage.options = JSON.stringify(options);
        },
        defaultValues: function(){
            options.pairs = default_options.pairs;
            options.difficulty = default_options.difficulty;
            options.dif2 = default_options.dif2;
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
            dif2.val(options.dif2);
        }
    }
})();

$('#default').on('click', function(){
    options.defaultValues();
});

$('#apply').on('click', function(){
    options.applyChanges(); 
    sessionStorage.mode = document.getElementById('mode').value;
});