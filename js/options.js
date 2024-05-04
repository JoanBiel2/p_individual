var options = (function(){
    const default_options = {
        pairs: 2,
        difficulty: 'normal',
        dif2: 1
    };
    
    var pairs = $('#pairs');
    var difficulty = $('#dif');
    var dif2 = $('#dif2');

    var options = JSON.parse(localStorage.options || JSON.stringify(default_options));
    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    dif2.val(options.dif2);
    pairs.on('change', () => options.pairs = (pairs.val()));
    difficulty.on('change', () => options.difficulty = difficulty.val());
    dif2.on('change', () => options.dif2 = (dif2.val()));

    return { 
        applyChanges: function(){
            if (localStorage.ranking === null){
                options.ranking = [];
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
    };
})();

$('#default').on('click', function(){
    options.defaultValues();
});

$('#apply').on('click', function(){
    options.applyChanges(); 
    window.location.assign("../index.html");
});